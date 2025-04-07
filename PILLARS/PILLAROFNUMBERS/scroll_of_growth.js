const { numberGlyphIndex } = require("./glyph_codex.js");

// In-memory store for number glyphs
const numberGlyphs = new Map();

// Process numeric input and map to glyphs
function processInput(input) {
  // Convert input to an array of numbers
  const numbers = input
    .toString()
    .replace(/[^0-9\s]/g, "") // Remove non-numeric characters except spaces
    .split(/\s+/)
    .filter(num => num.length > 0)
    .map(Number);

  const numberEntries = numbers.map(number => {
    const glyphEntry = numberGlyphIndex[number];
    if (glyphEntry) {
      return {
        token: number.toString(), // Use token instead of number
        symbol: glyphEntry.symbol,
        metaphor: glyphEntry.metaphor,
        resonance: glyphEntry.resonance
      };
    }
    return {
      token: number.toString(), // Use token instead of number
      symbol: "◇",
      metaphor: "An echo of the unknown number.",
      resonance: 0.1
    };
  });

  // Store each number glyph
  numberEntries.forEach(entry => {
    numberGlyphs.set(entry.token, entry);
  });

  return numberEntries;
}

// Store a glyph
function storeGlyph(glyph) {
  numberGlyphs.set(glyph.token, glyph);
}

// Retrieve a glyph by token
function getGlyph(token) {
  return numberGlyphs.get(token.toString());
}

module.exports = { processInput, storeGlyph, getGlyph };