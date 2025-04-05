const { interpretWord } = require("../../GLYPHS/glyph.js");
const lexicon = require("../../vocis/genesislexicon.json");

// Combine glyphs into new symbolic structures
function combineGlyphs(word) {
  // Check if the word exists in the genesis lexicon
  const existingGlyph = lexicon[word.toLowerCase()];
  if (existingGlyph) {
    return existingGlyph;
  }

  // If not found, interpret the word into a new glyph
  return interpretWord(word);
}

module.exports = { combineGlyphs };