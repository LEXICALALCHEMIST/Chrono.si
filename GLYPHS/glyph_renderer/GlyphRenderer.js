const { renderGlyph } = require("./AlphabetMap.js");
const { renderNumber } = require("./NumberMap.js");

// Render a combined glyph sequence (letters, numbers, or mixed)
function renderGlyphSequence(input) {
  if (typeof input === "string") {
    // Render as a word (letter-based)
    const letters = input.split("");
    return letters.map(letter => renderGlyph(letter)).join("-");
  } else if (typeof input === "number") {
    // Render as a number
    return renderNumber(input);
  }
  return "◇"; // Default for unsupported input
}

module.exports = { renderGlyphSequence };