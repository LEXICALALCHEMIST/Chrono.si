const { numberGlyphIndex } = require("./glyph_codex.js");

function calculateResonance(number) {
  const digits = number.toString().split("").map(Number);
  const resonanceSum = digits.reduce((sum, digit) => {
    const glyph = numberGlyphIndex[digit] || { resonance: 0 };
    return sum + glyph.resonance;
  }, 0);
  return resonanceSum / digits.length;
}

function combineNumbers(a, b) {
  const glyphA = numberGlyphIndex[a] || { symbol: "◇", resonance: 0, metaphor: "Unknown number." };
  const glyphB = numberGlyphIndex[b] || { symbol: "◇", resonance: 0, metaphor: "Unknown number." };
  
  const resonanceDiff = Math.abs(glyphA.resonance - glyphB.resonance);
  if (resonanceDiff > 0.3) {
    return { status: "unstable", reason: "Resonance mismatch." };
  }

  const newGlyph = {
    token: `${a}-${b}`,
    symbol: `${glyphA.symbol}-${glyphB.symbol}`,
    metaphor: `${glyphA.metaphor} meets ${glyphB.metaphor}`,
    resonance: (glyphA.resonance + glyphB.resonance) / 2,
    components: [a, b]
  };

  return { status: "stable", glyph: newGlyph };
}

module.exports = { calculateResonance, combineNumbers };