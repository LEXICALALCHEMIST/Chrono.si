const { rootGlyphs, composeSyllables, decomposeWord } = require("./sound_codex.js");
const { receiveSignal, sendSignal } = require("./signal.js");

let knowledgeBase = Object.values(rootGlyphs);

function trainHermese(inputWords, resonance) {
  // Receive input words via signal
  const newGlyphs = receiveSignal(inputWords);

  // Decompose and compose new glyphs
  newGlyphs.forEach(glyph => {
    const syllables = decomposeWord(glyph.token || glyph.components.join("-"));
    const mutatedSyllables = composeSyllables({ syllables }, resonance);
    glyph.syllables = mutatedSyllables;
    knowledgeBase.push(glyph);
  });

  return knowledgeBase;
}

function interpretGlyph(glyph) {
  return {
    symbol: glyph.symbol,
    metaphor: glyph.metaphor,
    resonance: glyph.resonance,
    syllables: glyph.syllables
  };
}

function speak(inputWords, resonance = 0.8) {
  // Train on input words if not already in knowledge base
  trainHermese(inputWords, resonance);

  // Find the most resonant glyph for the input
  const glyphs = sendSignal();
  const relevantGlyph = glyphs.find(g => inputWords.every(word => g.components.includes(word.toLowerCase())));
  
  if (relevantGlyph) {
    return relevantGlyph.metaphor;
  }

  return "I seek resonance but find only silence.";
}

module.exports = { trainHermese, interpretGlyph, speak };