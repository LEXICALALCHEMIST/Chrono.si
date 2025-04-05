const { renderGlyph, renderWord } = require("./alphabet_Map.js");
const { renderNumber } = require("./number_Map.js");

// Render a combined glyph sequence (letters, numbers, or mixed)
function renderGlyphSequence(input) {
  if (typeof input === "string") {
    // Render as a word (letter-based)
    return renderWord(input);
  } else if (typeof input === "number") {
    // Render as a number
    return renderNumber(input);
  }
  return "◇"; // Default for unsupported input
}

module.exports = { renderGlyphSequence };