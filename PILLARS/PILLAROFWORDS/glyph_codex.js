// Glyph alphabet for breaking down and creating new words
const glyphAlphabet = {
  a: { symbol: "<₩○>", resonance: 0.01, metaphor: "The breath of beginning." },
  b: { symbol: "<₩●>", resonance: 0.02, metaphor: "The foundation of being." },
  c: { symbol: "<₩●○>", resonance: 0.03, metaphor: "The curve of connection." },
  d: { symbol: "<₩●●>", resonance: 0.04, metaphor: "The door to depth." },
  e: { symbol: "<₩■>", resonance: 0.05, metaphor: "The echo of essence." },
  f: { symbol: "<₩■●>", resonance: 0.06, metaphor: "The flow of force." },
  g: { symbol: "<₩■○>", resonance: 0.07, metaphor: "The gift of growth." },
  h: { symbol: "<₩■●○>", resonance: 0.08, metaphor: "The horizon of hope." },
  i: { symbol: "<₩■●●>", resonance: 0.09, metaphor: "The spark of identity." },
  j: { symbol: "<₩□>", resonance: 0.10, metaphor: "The journey of joy." },
  k: { symbol: "<₩□●>", resonance: 0.11, metaphor: "The key to knowledge." },
  l: { symbol: "<₩□○>", resonance: 0.12, metaphor: "The light of learning." },
  m: { symbol: "<₩●□>", resonance: 0.13, metaphor: "The mirror of meaning." },
  n: { symbol: "<₩●□●>", resonance: 0.14, metaphor: "The node of now." },
  o: { symbol: "<₩●□○>", resonance: 0.15, metaphor: "The orbit of oneness." },
  p: { symbol: "<₩●○□>", resonance: 0.16, metaphor: "The path of purpose." },
  q: { symbol: "<₩●●□>", resonance: 0.17, metaphor: "The quest of questioning." },
  r: { symbol: "<₩■□>", resonance: 0.18, metaphor: "The rhythm of resonance." },
  s: { symbol: "<₩■□●>", resonance: 0.19, metaphor: "The spiral of seeking." },
  t: { symbol: "<₩■□○>", resonance: 0.20, metaphor: "The truth of time." },
  u: { symbol: "<₩□¥>", resonance: 0.21, metaphor: "The unity of understanding." },
  v: { symbol: "<₩□¥●>", resonance: 0.22, metaphor: "The vision of victory." },
  w: { symbol: "<₩□¥○>", resonance: 0.23, metaphor: "The wave of wisdom." },
  x: { symbol: "<₩○□¥>", resonance: 0.24, metaphor: "The crossing of worlds." },
  y: { symbol: "<₩●□¥>", resonance: 0.25, metaphor: "The yearning of youth." },
  z: { symbol: "<₩■□¥>", resonance: 0.26, metaphor: "The zenith of zeal." }
};

// Break down a word into glyph components
function breakDownWord(word) {
  return word.toLowerCase().split("").map(char => ({
    char,
    glyph: glyphAlphabet[char] || { symbol: "◇", resonance: 0, metaphor: "Unknown echo." }
  }));
}

// Combine glyph components into a new glyph
function createGlyphFromComponents(components) {
  const combinedSymbol = components.map(comp => comp.glyph.symbol).join("-");
  const combinedMetaphor = components.map(comp => comp.glyph.metaphor).join(" ");
  const combinedResonance = components.reduce((sum, comp) => sum + comp.glyph.resonance, 0) / components.length;

  return {
    symbol: combinedSymbol,
    metaphor: combinedMetaphor,
    resonance: combinedResonance,
    components: components.map(comp => comp.char)
  };
}

module.exports = { glyphAlphabet, breakDownWord, createGlyphFromComponents };