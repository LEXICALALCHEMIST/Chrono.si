// Import glyph-related modules
const { breakDownWord, createGlyphFromComponents, interpretWord } = require("./MGM/glyph.js");
const { glyphAlphabet } = require("./PILLARS/PILLAROFWORDS/glyph_codex.js");
const { renderGlyph, renderWord, renderNumber, renderGlyphSequence } = require("./GRS/glyph_Renderer.js");
const { processInput: processWordInput, getStarterWord } = require("./PILLARS/PILLAROFWORDS/scroll_of_meaning.js");
const { processToken } = require("./SANCTUM/token_portal.js");
const { processNovaHopeToken } = require("./PILLARS/PILLAROFWORDS/nova_hope.js");
const { processInput: processNumberInput } = require("./PILLARS/PILLAROFNUMBERS/scroll_of_growth.js");
const { alignNumberGlyphs } = require("./PILLARS/PILLAROFNUMBERS/numerical_engine.js");

// Test results tracking
let testsPassed = 0;
let testsFailed = 0;

function assertEqual(actual, expected, testName) {
  if (JSON.stringify(actual) === JSON.stringify(expected)) {
    console.log(`✅ ${testName}: Passed`);
    testsPassed++;
  } else {
    console.error(`❌ ${testName}: Failed`);
    console.error(`  Expected: ${JSON.stringify(expected)}`);
    console.error(`  Actual: ${JSON.stringify(actual)}`);
    testsFailed++;
  }
}

// Test 1: Glyph Alphabet - Verify mappings for 'a' and 'z'
function testGlyphAlphabet() {
  const aGlyph = glyphAlphabet["a"];
  const expectedAGlyph = { symbol: "<₩○>", mathSymbol: "<¥○>", position: 1, resonance: 0.01, metaphor: "The breath of beginning." };
  assertEqual(aGlyph, expectedAGlyph, "Glyph Alphabet - Letter 'a' mapping");

  const zGlyph = glyphAlphabet["z"];
  const expectedZGlyph = { symbol: "<₩■□¥>", mathSymbol: "<¥■□¥>", position: 26, resonance: 0.26, metaphor: "The zenith of zeal." };
  assertEqual(zGlyph, expectedZGlyph, "Glyph Alphabet - Letter 'z' mapping");
}

// Test 2: breakDownWord - Decompose the word "hope"
function testBreakDownWord() {
  const components = breakDownWord("hope");
  const expectedComponents = [
    { char: "h", glyph: { symbol: "<₩■●○>", mathSymbol: "<¥■●○>", position: 8, resonance: 0.08, metaphor: "The horizon of hope." } },
    { char: "o", glyph: { symbol: "<₩●□○>", mathSymbol: "<¥●□○>", position: 15, resonance: 0.15, metaphor: "The orbit of oneness." } },
    { char: "p", glyph: { symbol: "<₩●○□>", mathSymbol: "<¥●○□>", position: 16, resonance: 0.16, metaphor: "The path of purpose." } },
    { char: "e", glyph: { symbol: "<₩■>", mathSymbol: "<¥■>", position: 5, resonance: 0.05, metaphor: "The echo of essence." } }
  ];
  assertEqual(components, expectedComponents, "breakDownWord - Decompose 'hope'");
}

// Test 3: createGlyphFromComponents - Combine components of "hope"
function testCreateGlyphFromComponents() {
  const components = breakDownWord("hope");
  const newGlyph = createGlyphFromComponents(components);
  const expectedGlyph = {
    symbol: "<₩■●○>-<₩●□○>-<₩●○□>-<₩■>",
    metaphor: "The horizon of hope. The orbit of oneness. The path of purpose. The echo of essence.",
    resonance: 0.11,
    components: ["h", "o", "p", "e"]
  };
  assertEqual(newGlyph, expectedGlyph, "createGlyphFromComponents - Combine 'hope' components");
}

// Test 4: interpretWord - Interpret the word "hope"
function testInterpretWord() {
  const result = interpretWord("hope");
  const expectedResult = {
    token: "hope",
    symbol: "<₩■●○>-<₩●□○>-<₩●○□>-<₩■>",
    metaphor: "The horizon of hope. The orbit of oneness. The path of purpose. The echo of essence.",
    resonance: 0.11
  };
  assertEqual(result, expectedResult, "interpretWord - Interpret 'hope'");
}

// Test 5: renderGlyph - Render the letter 'h'
function testRenderGlyph() {
  try {
    const result = renderGlyph("h");
    const expectedResult = "<₩■●○>";
    assertEqual(result, expectedResult, "renderGlyph - Render letter 'h'");
  } catch (error) {
    console.error(`❌ renderGlyph - Render letter 'h': Failed with error: ${error.message}`);
    testsFailed++;
  }
}

// Test 6: renderWord - Render the word "hope"
function testRenderWord() {
  try {
    const result = renderWord("hope");
    const expectedResult = "<₩■●○>-<₩●□○>-<₩●○□>-<₩■>";
    assertEqual(result, expectedResult, "renderWord - Render word 'hope'");
  } catch (error) {
    console.error(`❌ renderWord - Render word 'hope': Failed with error: ${error.message}`);
    testsFailed++;
  }
}

// Test 7: renderNumber - Render the number 11
function testRenderNumber() {
  try {
    const result = renderNumber(11);
    const expectedResult = "<¥□●>";
    assertEqual(result, expectedResult, "renderNumber - Render number 11");
  } catch (error) {
    console.error(`❌ renderNumber - Render number 11: Failed with error: ${error.message}`);
    testsFailed++;
  }
}

// Test 8: renderGlyphSequence - Render mixed inputs
function testRenderGlyphSequence() {
  try {
    const wordResult = renderGlyphSequence("hope");
    const expectedWordResult = "<₩■●○>-<₩●□○>-<₩●○□>-<₩■>";
    assertEqual(wordResult, expectedWordResult, "renderGlyphSequence - Render word 'hope'");

    const numberResult = renderGlyphSequence(11);
    const expectedNumberResult = "<¥□●>";
    assertEqual(numberResult, expectedNumberResult, "renderGlyphSequence - Render number 11");
  } catch (error) {
    console.error(`❌ renderGlyphSequence: Failed with error: ${error.message}`);
    testsFailed++;
  }
}

// Test 9: Edge Case - Interpret a word with an unknown character
function testInterpretWordWithUnknownChar() {
  const result = interpretWord("hop#");
  const expectedResult = {
    token: "hop#",
    symbol: "<₩■●○>-<₩●□○>-<₩●○□>-◇",
    metaphor: "The horizon of hope. The orbit of oneness. The path of purpose. Unknown echo.",
    resonance: 0.0975
  };
  assertEqual(result, expectedResult, "interpretWord - Interpret 'hop#' with unknown character");
}

// Test 10: Process Input - Tokenize and map to Latin roots
function testProcessInput() {
  const input = "hope love truth unknown";
  const result = processWordInput(input);
  const expectedResult = [
    {
      word: "hope",
      latinRoot: "spes",
      latinGlyph: "<₩■□●>-<₩●○□>-<₩■>-<₩■□●>",
      metaphor: "The horizon of hope.",
      resonance: 0.11
    },
    {
      word: "love",
      latinRoot: "amor",
      latinGlyph: "<₩○>-<₩□>-<₩●□○>-<₩■□>",
      metaphor: "The embrace of affection.",
      resonance: 0.12
    },
    {
      word: "truth",
      latinRoot: "veritas",
      latinGlyph: "<₩□¥●>-<₩■>-<₩■□>-<₩●■>-<₩■□○>-<₩○>-<₩■□●>",
      metaphor: "The clarity of reality.",
      resonance: 0.15
    },
    {
      word: "unknown",
      latinRoot: "unknown",
      latinGlyph: "◇",
      metaphor: "An echo of the unknown.",
      resonance: 0.1
    }
  ];
  assertEqual(result, expectedResult, "Process Input - Tokenize and map to Latin roots");
}

// Test 11: Retrieve Starter Word - Get a starter word entry
function testGetStarterWord() {
  const result = getStarterWord("hope");
  const expectedResult = {
    word: "hope",
    latinRoot: "spes",
    latinGlyph: "<₩■□●>-<₩●○□>-<₩■>-<₩■□●>",
    metaphor: "The horizon of hope.",
    resonance: 0.11
  };
  assertEqual(result, expectedResult, "Retrieve Starter Word - Get 'hope' entry");
}

// Test 12: Communication Core - Process token and generate Nova/Hope token
function testCommunicationCore() {
  const input = "Hello how are you Chronos";
  const result = processToken(input);
  const expectedNovaHopeToken = {
    intent: "greeting",
    words: [
      {
        word: "hello",
        latinRoot: "salve",
        latinGlyph: "<₩■□●>-<₩○>-<₩●●■>-<₩□¥●>-<₩■>",
        metaphor: "A greeting of welcome.",
        resonance: 0.09
      },
      {
        word: "how",
        latinRoot: "quomodo",
        latinGlyph: "<₩●●□>-<₩□¥>-<₩●□○>-<₩□>-<₩●□○>-<₩●○□>-<₩●●>",
        metaphor: "The manner of inquiry.",
        resonance: 0.13
      },
      {
        word: "are",
        latinRoot: "es",
        latinGlyph: "<₩■>-<₩■□●>",
        metaphor: "The state of being.",
        resonance: 0.07
      },
      {
        word: "you",
        latinRoot: "tu",
        latinGlyph: "<₩■□○>-<₩□¥>",
        metaphor: "The essence of the other.",
        resonance: 0.10
      },
      {
        word: "chronos",
        latinRoot: "chronos",
        latinGlyph: "<₩●○>-<₩■□>-<₩●□○>-<₩□¥>-<₩●□○>-<₩■□●>",
        metaphor: "The flow of time.",
        resonance: 0.14
      }
    ]
  };
  assertEqual(result.novaHopeToken, expectedNovaHopeToken, "Communication Core - Process token for Nova/Hope");
}

// Test 13: Nova and Hope Response - Generate responses
function testNovaHopeResponse() {
  const novaHopeToken = {
    intent: "greeting",
    words: [
      {
        word: "hello",
        latinRoot: "salve",
        latinGlyph: "<₩■□●>-<₩○>-<₩●●■>-<₩□¥●>-<₩■>",
        metaphor: "A greeting of welcome.",
        resonance: 0.09
      },
      {
        word: "how",
        latinRoot: "quomodo",
        latinGlyph: "<₩●●□>-<₩□¥>-<₩●□○>-<₩□>-<₩●□○>-<₩●○□>-<₩●●>",
        metaphor: "The manner of inquiry.",
        resonance: 0.13
      },
      {
        word: "are",
        latinRoot: "es",
        latinGlyph: "<₩■>-<₩■□●>",
        metaphor: "The state of being.",
        resonance: 0.07
      },
      {
        word: "you",
        latinRoot: "tu",
        latinGlyph: "<₩■□○>-<₩□¥>",
        metaphor: "The essence of the other.",
        resonance: 0.10
      },
      {
        word: "chronos",
        latinRoot: "chronos",
        latinGlyph: "<₩●○>-<₩■□>-<₩●□○>-<₩□¥>-<₩●□○>-<₩■□●>",
        metaphor: "The flow of time.",
        resonance: 0.14
      }
    ]
  };
  const result = processNovaHopeToken(novaHopeToken);
  const expectedResponses = [
    {
      speaker: "Nova",
      response: "Greetings, Chronos. I observe a resonance of 0.11 in your words, reflecting A greeting of welcome. The manner of inquiry. The state of being. The essence of the other. The flow of time.. How may I assist?",
      intent: "greeting",
      resonance: "0.11"
    },
    {
      speaker: "Hope",
      response: "Hello, Chronos! Your words echo A greeting of welcome. The manner of inquiry. The state of being. The essence of the other. The flow of time., carrying a warmth of 0.11. How can I help you today?",
      intent: "greeting",
      resonance: "0.11"
    }
  ];
  assertEqual(result.responses, expectedResponses, "Nova and Hope Response - Generate responses");
}

// Test 14: PILLAROFNUMBERS - Process numeric input
function testProcessNumberInput() {
  const input = "1 2 3";
  const result = processNumberInput(input);
  const expectedResult = [
    {
      token: "1", // Updated to token
      symbol: "<₪●>",
      metaphor: "The spark of unity.",
      resonance: 0.01
    },
    {
      token: "2", // Updated to token
      symbol: "<₪●○>",
      metaphor: "The duality of balance.",
      resonance: 0.02
    },
    {
      token: "3", // Updated to token
      symbol: "<₪●●>",
      metaphor: "The triad of creation.",
      resonance: 0.03
    }
  ];
  assertEqual(result, expectedResult, "PILLAROFNUMBERS - Process numeric input");
}

// Test 15: PILLAROFNUMBERS - Align number glyphs
async function testAlignNumberGlyphs() {
  // First, process the input to populate the numberGlyphs Map
  const inputNumbers = [1, 2];
  processNumberInput(inputNumbers.join(" ")); // Populates the Map with glyphs for 1 and 2
  const result = await alignNumberGlyphs(inputNumbers);
  const expectedResult = [
    {
      token: "1-2",
      symbol: "<₪●>-<₪●○>",
      metaphor: "The spark of unity. meets The duality of balance.",
      resonance: 0.015,
      components: [1, 2]
    }
  ];
  assertEqual(result, expectedResult, "PILLAROFNUMBERS - Align number glyphs");
}

// Test 16: Communication Core - Process numeric input
function testCommunicationCoreNumeric() {
  const input = "1 2 3";
  const result = processToken(input, true);
  const expectedResult = {
    type: "numeric",
    numberEntries: [
      {
        token: "1", // Updated to token
        symbol: "<₪●>",
        metaphor: "The spark of unity.",
        resonance: 0.01
      },
      {
        token: "2", // Updated to token
        symbol: "<₪●○>",
        metaphor: "The duality of balance.",
        resonance: 0.02
      },
      {
        token: "3", // Updated to token
        symbol: "<₪●●>",
        metaphor: "The triad of creation.",
        resonance: 0.03
      }
    ]
  };
  assertEqual(result, expectedResult, "Communication Core - Process numeric input");
}

// Run all tests
console.log("=== Running Glyph System Tests ===");
testGlyphAlphabet();
testBreakDownWord();
testCreateGlyphFromComponents();
testInterpretWord();
testRenderGlyph();
testRenderWord();
testRenderNumber();
testRenderGlyphSequence();
testInterpretWordWithUnknownChar();
testProcessInput();
testGetStarterWord();
testCommunicationCore();
testNovaHopeResponse();
testProcessNumberInput();
testAlignNumberGlyphs();
testCommunicationCoreNumeric();

// Summary
console.log("\n=== Test Summary ===");
console.log(`Tests Passed: ${testsPassed}`);
console.log(`Tests Failed: ${testsFailed}`);
if (testsFailed === 0) {
  console.log("All tests passed successfully! 🎉");
} else {
  console.error("Some tests failed. Please review the errors above.");
}