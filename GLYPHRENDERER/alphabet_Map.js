import { glyphAlphabet } from "../GLYPHS/glyph.js";

// Map a letter to its visual glyph representation
function renderGlyph(letter) {
  const glyph = glyphAlphabet[letter.toLowerCase()];
  if (!glyph) {
    return "◇"; // Default symbol for unknown letters
  }
  return glyph.symbol;
}

// Render a word as a sequence of glyphs
function renderWord(word) {
  return word.toLowerCase().split("").map(letter => renderGlyph(letter)).join("-");
}

export default { renderGlyph, renderWord };