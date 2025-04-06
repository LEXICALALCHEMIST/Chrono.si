const { glyphAlphabet } = require("../PILLARS/PILLAROFWORDS/glyph_codex.js");
const { numberGlyphIndex } = require("../PILLARS/PILLAROFNUMBERS/glyph_codex.js"); // Added

// Letter-based glyph rendering
function renderGlyph(letter) {
  const glyph = glyphAlphabet[letter.toLowerCase()];
  if (!glyph) {
    return "◇"; // Default symbol for unknown letters
  }
  return glyph.symbol;
}

function renderWord(word) {
  return word.toLowerCase().split("").map(letter => renderGlyph(letter)).join("-");
}

// Number-based glyph rendering
function renderNumber(number) {
  const glyph = numberGlyphIndex[number.toString()];
  if (!glyph) {
    return "◇"; // Default symbol for unknown numbers
  }
  return glyph.symbol;
}

// Combined glyph sequence rendering
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

module.exports = { renderGlyph, renderWord, renderNumber, renderGlyphSequence };