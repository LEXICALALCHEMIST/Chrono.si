const genesisLexicon = require("../../CHRONO/vocis/GenesisLexicon.json");

// In-memory store for starter words and their glyphs
const starterWords = new Map();
const wordGlyphs = new Map();

// Tokenize user input into individual words
function tokenizeInput(input) {
  return input
    .toLowerCase()
    .replace(/[^a-z\s]/g, "") // Remove non-letter characters except spaces
    .split(/\s+/)
    .filter(word => word.length > 0);
}

// Map a word to its Latin root and glyph
function mapToLatinRoot(word) {
  const lexEntry = genesisLexicon[word];
  if (lexEntry) {
    return {
      word,
      latinRoot: lexEntry.latinRoot,
      latinGlyph: lexEntry.latinGlyph,
      metaphor: lexEntry.metaphor,
      resonance: lexEntry.resonance
    };
  }
  return {
    word,
    latinRoot: "unknown",
    latinGlyph: "◇",
    metaphor: "An echo of the unknown.",
    resonance: 0.1
  };
}

// Process user input and store starter words
function processInput(input) {
  const tokens = tokenizeInput(input);
  const starterEntries = tokens.map(word => mapToLatinRoot(word));
  
  // Store each starter word
  starterEntries.forEach(entry => {
    starterWords.set(entry.word, entry);
  });
  
  return starterEntries;
}

// Store a glyph (called by harmonic_engine.js)
function storeGlyph(glyph) {
  wordGlyphs.set(glyph.token, glyph);
}

// Retrieve a starter word by token
function getStarterWord(token) {
  return starterWords.get(token.toLowerCase());
}

// Retrieve a glyph by token
function getGlyph(token) {
  return wordGlyphs.get(token.toLowerCase());
}

module.exports = { processInput, storeGlyph, getStarterWord, getGlyph };