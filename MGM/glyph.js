// Glyph alphabet definition
const glyphAlphabet = {
  a: { symbol: "<₩○>", mathSymbol: "<¥○>", position: 1, resonance: 0.01, metaphor: "The breath of beginning." },
  b: { symbol: "<₩●>", mathSymbol: "<¥●>", position: 2, resonance: 0.02, metaphor: "The foundation of being." },
  c: { symbol: "<₩●○>", mathSymbol: "<¥●○>", position: 3, resonance: 0.03, metaphor: "The curve of connection." },
  d: { symbol: "<₩●●>", mathSymbol: "<¥●●>", position: 4, resonance: 0.04, metaphor: "The door to depth." },
  e: { symbol: "<₩■>", mathSymbol: "<¥■>", position: 5, resonance: 0.05, metaphor: "The echo of essence." },
  f: { symbol: "<₩■●>", mathSymbol: "<¥■●>", position: 6, resonance: 0.06, metaphor: "The flow of force." },
  g: { symbol: "<₩■○>", mathSymbol: "<¥■○>", position: 7, resonance: 0.07, metaphor: "The gift of growth." },
  h: { symbol: "<₩■●○>", mathSymbol: "<¥■●○>", position: 8, resonance: 0.08, metaphor: "The horizon of hope." },
  i: { symbol: "<₩■●●>", mathSymbol: "<¥■●●>", position: 9, resonance: 0.09, metaphor: "The spark of identity." },
  j: { symbol: "<₩□>", mathSymbol: "<¥□>", position: 10, resonance: 0.10, metaphor: "The journey of joy." },
  k: { symbol: "<₩□●>", mathSymbol: "<¥□●>", position: 11, resonance: 0.11, metaphor: "The key to knowledge." },
  l: { symbol: "<₩□○>", mathSymbol: "<¥□○>", position: 12, resonance: 0.12, metaphor: "The light of learning." },
  m: { symbol: "<₩●□>", mathSymbol: "<¥●□>", position: 13, resonance: 0.13, metaphor: "The mirror of meaning." },
  n: { symbol: "<₩●□●>", mathSymbol: "<¥●□●>", position: 14, resonance: 0.14, metaphor: "The node of now." },
  o: { symbol: "<₩●□○>", mathSymbol: "<¥●□○>", position: 15, resonance: 0.15, metaphor: "The orbit of oneness." },
  p: { symbol: "<₩●○□>", mathSymbol: "<¥●○□>", position: 16, resonance: 0.16, metaphor: "The path of purpose." },
  q: { symbol: "<₩●●□>", mathSymbol: "<¥●●□>", position: 17, resonance: 0.17, metaphor: "The quest of questioning." },
  r: { symbol: "<₩■□>", mathSymbol: "<¥■□>", position: 18, resonance: 0.18, metaphor: "The rhythm of resonance." },
  s: { symbol: "<₩■□●>", mathSymbol: "<¥■□●>", position: 19, resonance: 0.19, metaphor: "The spiral of seeking." },
  t: { symbol: "<₩■□○>", mathSymbol: "<¥■□○>", position: 20, resonance: 0.20, metaphor: "The truth of time." },
  u: { symbol: "<₩□¥>", mathSymbol: "<¥□¥>", position: 21, resonance: 0.21, metaphor: "The unity of understanding." },
  v: { symbol: "<₩□¥●>", mathSymbol: "<¥□¥●>", position: 22, resonance: 0.22, metaphor: "The vision of victory." },
  w: { symbol: "<₩□¥○>", mathSymbol: "<¥□¥○>", position: 23, resonance: 0.23, metaphor: "The wave of wisdom." },
  x: { symbol: "<₩○□¥>", mathSymbol: "<¥○□¥>", position: 24, resonance: 0.24, metaphor: "The crossing of worlds." },
  y: { symbol: "<₩●□¥>", mathSymbol: "<¥●□¥>", position: 25, resonance: 0.25, metaphor: "The yearning of youth." },
  z: { symbol: "<₩■□¥>", mathSymbol: "<¥■□¥>", position: 26, resonance: 0.26, metaphor: "The zenith of zeal." }
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

// Interpret a word into a glyph when not found in a lexicon
function interpretWord(word) {
  const components = breakDownWord(word);
  const symbol = components.map(comp => comp.glyph.symbol).join("-");
  const metaphor = components.map(comp => comp.glyph.metaphor).join(" ");
  const resonance = components.reduce((sum, comp) => sum + comp.glyph.resonance, 0) / components.length;

  return {
    token: word,
    symbol: symbol || "◇",
    metaphor: metaphor || "An echo of the unknown.",
    resonance: resonance || 0.1
  };
}

module.exports = {
  glyphAlphabet,
  breakDownWord,
  createGlyphFromComponents,
  interpretWord
};