const { interpretWord } = require("../../MGM/glyph.js");
const { storeGlyph, getStarterWord, getGlyph } = require("./scroll_of_meaning.js");

function combineGlyphs(glyphA, glyphB) {
  const resonanceDiff = Math.abs(glyphA.resonance - glyphB.resonance);
  if (resonanceDiff > 0.3) {
    return { status: "unstable", reason: "Resonance mismatch." };
  }

  const newGlyph = {
    token: `${glyphA.token}-${glyphB.token}`,
    symbol: `${glyphA.symbol}-${glyphB.symbol}`,
    metaphor: `${glyphA.metaphor} ${glyphB.metaphor}`,
    resonance: (glyphA.resonance + glyphB.resonance) / 2,
    components: [glyphA.token, glyphB.token]
  };

  storeGlyph(newGlyph);
  return { status: "stable", glyph: newGlyph };
}

async function alignGlyphs(inputWords) {
  const glyphs = await Promise.all(
    inputWords.map(async (word) => {
      // Check if the glyph already exists
      const storedGlyph = getGlyph(word.toLowerCase());
      if (storedGlyph) {
        return storedGlyph;
      }

      // Check if the word has a starter entry
      const starterEntry = getStarterWord(word.toLowerCase());
      if (starterEntry && starterEntry.latinRoot !== "unknown") {
        return {
          token: word,
          symbol: starterEntry.latinGlyph,
          metaphor: starterEntry.metaphor,
          resonance: starterEntry.resonance
        };
      }

      // If not found, interpret the word and store it
      const newGlyph = interpretWord(word);
      storeGlyph(newGlyph);
      return newGlyph;
    })
  );

  const combinedGlyphs = [];
  for (let i = 0; i < glyphs.length - 1; i++) {
    const result = combineGlyphs(glyphs[i], glyphs[i + 1]);
    if (result.status === "stable") {
      combinedGlyphs.push(result.glyph);
    }
  }

  return combinedGlyphs;
}

module.exports = { combineGlyphs, alignGlyphs };