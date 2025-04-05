const { retrieveGlyphs, findGlyphByToken } = require("./scroll_of_meaning.js");

function receiveSignal(inputTokens) {
  // Check if tokens have been combined before
  const existingGlyphs = inputTokens.map(token => findGlyphByToken(token)).filter(glyph => glyph);

  if (existingGlyphs.length === inputTokens.length) {
    return existingGlyphs;
  }

  // Receive input tokens and pass them to the harmonic engine
  const { alignGlyphs } = require("./harmonic_engine.js");
  return alignGlyphs(inputTokens);
}

function sendSignal() {
  // Send the current state of glyphs to other components
  return retrieveGlyphs();
}

module.exports = { receiveSignal, sendSignal };