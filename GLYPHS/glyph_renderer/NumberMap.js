const numberGlyphIndex = {
    // Placeholder: Will be populated once PILLAROFNUMBERS is built
    "1": { symbol: "<¥○>", position: 1 },
    "2": { symbol: "<¥●>", position: 2 },
    "3": { symbol: "<¥●○>", position: 3 },
    // ... (to be completed up to 26 and beyond)
  };
  
  // Map a number to its visual glyph representation
  function renderNumber(number) {
    const glyph = numberGlyphIndex[number.toString()];
    if (!glyph) {
      return "◇"; // Default symbol for unknown numbers
    }
    return glyph.symbol;
  }
  
  module.exports = { renderNumber };