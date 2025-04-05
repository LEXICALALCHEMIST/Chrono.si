const numberGlyphIndex = {
  // Placeholder: Will be populated once PILLAROFNUMBERS is built
  "1": { symbol: "<¥○>", position: 1 },
  "2": { symbol: "<¥●>", position: 2 },
  "3": { symbol: "<¥●○>", position: 3 },
  "4": { symbol: "<¥●●>", position: 4 },
  "5": { symbol: "<¥■>", position: 5 },
  "6": { symbol: "<¥■●>", position: 6 },
  "7": { symbol: "<¥■○>", position: 7 },
  "8": { symbol: "<¥■●○>", position: 8 },
  "9": { symbol: "<¥■●●>", position: 9 },
  "10": { symbol: "<¥□>", position: 10 },
  "11": { symbol: "<¥□●>", position: 11 },
  "12": { symbol: "<¥□○>", position: 12 },
  "13": { symbol: "<¥●□>", position: 13 },
  "14": { symbol: "<¥●□●>", position: 14 },
  "15": { symbol: "<¥●□○>", position: 15 },
  "16": { symbol: "<¥●○□>", position: 16 },
  "17": { symbol: "<¥●●□>", position: 17 },
  "18": { symbol: "<¥■□>", position: 18 },
  "19": { symbol: "<¥■□●>", position: 19 },
  "20": { symbol: "<¥■□○>", position: 20 },
  "21": { symbol: "<¥□¥>", position: 21 },
  "22": { symbol: "<¥□¥●>", position: 22 },
  "23": { symbol: "<¥□¥○>", position: 23 },
  "24": { symbol: "<¥○□¥>", position: 24 },
  "25": { symbol: "<¥●□¥>", position: 25 },
  "26": { symbol: "<¥■□¥>", position: 26 }
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