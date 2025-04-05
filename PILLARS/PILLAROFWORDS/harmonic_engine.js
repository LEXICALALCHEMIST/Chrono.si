const { interpretWord } = require("../../HOPE/language/glyphSpeech.js");
const genesisLexicon = require("../../vocis/genesislexicon.json");
const { storeGlyph } = require("./scroll_of_meaning.js");
const { breakDownWord, createGlyphFromComponents } = require("./glyph_codex.js");

function combineGlyphs(glyphA, glyphB) {
  // Check resonance compatibility
  const resonanceDiff = Math.abs(glyphA.resonance - glyphB.resonance);
  if (resonanceDiff > 0.3) {
    return { status: "unstable", reason: "Resonance mismatch." };
  }

  // Break down the tokens into glyph components
  const componentsA = breakDownWord(glyphA.token);
  const componentsB = breakDownWord(glyphB.token);
  const allComponents = [...componentsA, ...componentsB];

  // Create a new glyph from the combined components
  const newGlyph = createGlyphFromComponents(allComponents);

  // Store the new glyph
  storeGlyph(newGlyph);

  return { status: "stable", glyph: newGlyph };
}

function alignGlyphs(inputWords) {
  const glyphs = inputWords.map(word => {
    const lexEntry = genesisLexicon[word.toLowerCase()];
    if (lexEntry) {
      return {
        token: word,
        symbol: lexEntry.symbol || "◇",
        metaphor: lexEntry.metaphor,
        resonance: lexEntry.resonance
      };
    }
    return interpretWord(word);
  });

  // Combine glyphs pairwise
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