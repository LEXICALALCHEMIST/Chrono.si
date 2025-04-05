let glyphRepository = [];

function storeGlyph(glyph) {
  glyphRepository.push(glyph);
}

function retrieveGlyphs() {
  return glyphRepository;
}

function clearGlyphRepository() {
  glyphRepository = [];
}

function findGlyphByToken(token) {
  return glyphRepository.find(glyph => glyph.components.includes(token.toLowerCase()));
}

module.exports = { storeGlyph, retrieveGlyphs, clearGlyphRepository, findGlyphByToken };