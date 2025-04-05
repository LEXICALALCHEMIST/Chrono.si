const glyphIndex = require("../glyph_codex/alphabet/glyphs.json");

// Map a letter to its visual glyph representation
function renderGlyph(letter) {
  const glyph = glyphIndex[letter.toLowerCase()];
  if (!glyph) {
    return "◇"; // Default symbol for unknown letters
  }
  return glyph.symbol;
}

// Render a word as a sequence of glyphs
function renderWord(word) {
  return word.toLowerCase().split("").map(letter => renderGlyph(letter)).join("-");
}

module.exports = { renderGlyph, renderWord };