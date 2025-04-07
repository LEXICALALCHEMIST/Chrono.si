const { combineNumbers } = require("./quandrix_cube.js");
const { storeGlyph, getGlyph } = require("./scroll_of_growth.js");
const { numberGlyphIndex } = require("./glyph_codex.js");

// Process and align numerical glyphs
async function alignNumberGlyphs(inputNumbers) {
  const glyphs = await Promise.all(
    inputNumbers.map(async (number) => {
      // Check if the glyph already exists in storage
      const storedGlyph = getGlyph(number.toString());
      if (storedGlyph) {
        return storedGlyph;
      }

      // If not found, look up the number in numberGlyphIndex
      const glyph = numberGlyphIndex[number];
      if (glyph) {
        const newGlyph = {
          token: number.toString(),
          symbol: glyph.symbol,
          metaphor: glyph.metaphor,
          resonance: glyph.resonance
        };
        storeGlyph(newGlyph);
        return newGlyph;
      }

      // Fallback for numbers not in numberGlyphIndex
      const newGlyph = {
        token: number.toString(),
        symbol: "◇",
        metaphor: "An echo of the unknown number.",
        resonance: 0.1
      };
      storeGlyph(newGlyph);
      return newGlyph;
    })
  );

  const combinedGlyphs = [];
  for (let i = 0; i < glyphs.length - 1; i++) {
    // Handle both token and number fields for compatibility
    const tokenA = glyphs[i].token || (glyphs[i].number ? glyphs[i].number.toString() : null);
    const tokenB = glyphs[i + 1].token || (glyphs[i + 1].number ? glyphs[i + 1].number.toString() : null);
    const numA = tokenA ? parseInt(tokenA) : NaN;
    const numB = tokenB ? parseInt(tokenB) : NaN;
    if (isNaN(numA) || isNaN(numB)) {
      console.log(`Skipping combination due to invalid numbers: ${numA}, ${numB}`);
      continue;
    }
    const result = combineNumbers(numA, numB);
    console.log(`combineNumbers(${numA}, ${numB}) result:`, result); // Debugging
    if (result.status === "stable") {
      combinedGlyphs.push(result.glyph);
    } else {
      console.log(`Combination unstable: ${result.reason}`); // Debugging
    }
  }

  console.log("Combined glyphs:", combinedGlyphs); // Debugging
  return combinedGlyphs;
}

module.exports = { alignNumberGlyphs };