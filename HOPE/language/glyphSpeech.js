const { breakDownWord } = require("../../PILLARS/PILLAROFWORDS/glyph_codex.js");

// Interpret a word into a glyph when not found in genesislexicon.json
function interpretWord(word) {
  // Break down the word into glyph components using the glyph alphabet
  const components = breakDownWord(word);

  // Generate a symbol by combining the glyph symbols
  const symbol = components.map(comp => comp.glyph.symbol).join("-");

  // Generate a metaphor by combining the glyph metaphors
  const metaphor = components.map(comp => comp.glyph.metaphor).join(" ");

  // Calculate resonance as the average of the components' resonance values
  const resonance = components.reduce((sum, comp) => sum + comp.glyph.resonance, 0) / components.length;

  // Return the interpreted glyph
  return {
    token: word,
    symbol: symbol || "◇",
    metaphor: metaphor || "An echo of the unknown.",
    resonance: resonance || 0.1
  };
}

module.exports = { interpretWord };