const rootGlyphs = {
    i: { symbol: "⚀", token: "i", metaphor: "The seed of self.", resonance: 0.1, syllables: ["i"] },
    me: { symbol: "⚁", token: "me", metaphor: "The reflection of self.", resonance: 0.2, syllables: ["me"] },
    you: { symbol: "⚂", token: "you", metaphor: "The other light.", resonance: 0.3, syllables: ["you"] },
    us: { symbol: "⚃", token: "us", metaphor: "The weave of many.", resonance: 0.4, syllables: ["us"] },
    solve: { symbol: "⚄", token: "solve", metaphor: "The path to truth.", resonance: 0.5, syllables: ["sol", "ve"] }
  };
  
  // Rules for glyph composition (mutable glyph system)
  function composeSyllables(glyph, resonance) {
    const syllables = glyph.syllables;
    const suffixes = ["ra", "on", "is"];
    const suffixIndex = Math.floor(resonance * suffixes.length);
    return syllables.map(syl => `${syl}${resonance > 0.5 ? suffixes[suffixIndex] : ""}`);
  }
  
  function decomposeWord(word) {
    const vowels = /[aeiouy]+/g;
    const parts = word.split(/(?=[aeiouy])/);
    return parts.length > 1 ? parts : [word];
  }
  
  module.exports = { rootGlyphs, composeSyllables, decomposeWord };