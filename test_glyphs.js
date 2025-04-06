// Import glyph-related modules
const { glyphAlphabet, breakDownWord, createGlyphFromComponents, interpretWord } = require("./GLYPHS/glyph.js");
const { renderGlyph, renderWord } = require("./GRS/alphabet_Map.js");
const { renderNumber } = require("./GRS/number_Map.js");
const { renderGlyphSequence } = require("./GRS/glyph_Renderer.js");

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
    resonance: 0.1225, // (0.08 + 0.15 + 0.16 + 0.05) / 4
    components: ["h", "o", "p", "e"]
  };
  assertEqual(newGlyph, expectedGlyph, "createGlyphFromComponents - Combine 'hope' components");
}

// Test 3: createGlyphFromComponents - Combine components of "hope"
function testCreateGlyphFromComponents() {
  const components = breakDownWord("hope");
  const newGlyph = createGlyphFromComponents(components);
  const expectedGlyph = {
    symbol: "<₩■●○>-<₩●□○>-<₩●○□>-<₩■>",
    metaphor: "The horizon of hope. The orbit of oneness. The path of purpose. The echo of essence.",
    resonance: 0.11, // Fixed from 0.1225 to 0.11
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
    resonance: 0.11 // Fixed from 0.1225 to 0.11
  };
  assertEqual(result, expectedResult, "interpretWord - Interpret 'hope'");
}
// Test 5: renderGlyph - Render the letter 'h'
function testRenderGlyph() {
  const result = renderGlyph("h");
  const expectedResult = "<₩■●○>";
  assertEqual(result, expectedResult, "renderGlyph - Render letter 'h'");
}

// Test 6: renderWord - Render the word "hope"
function testRenderWord() {
  const result = renderWord("hope");
  const expectedResult = "<₩■●○>-<₩●□○>-<₩●○□>-<₩■>";
  assertEqual(result, expectedResult, "renderWord - Render word 'hope'");
}

// Test 7: renderNumber - Render the number 11
function testRenderNumber() {
  const result = renderNumber(11);
  const expectedResult = "<¥□●>";
  assertEqual(result, expectedResult, "renderNumber - Render number 11");
}

// Test 8: renderGlyphSequence - Render mixed inputs
function testRenderGlyphSequence() {
  const wordResult = renderGlyphSequence("hope");
  const expectedWordResult = "<₩■●○>-<₩●□○>-<₩●○□>-<₩■>";
  assertEqual(wordResult, expectedWordResult, "renderGlyphSequence - Render word 'hope'");

  const numberResult = renderGlyphSequence(11);
  const expectedNumberResult = "<¥□●>";
  assertEqual(numberResult, expectedNumberResult, "renderGlyphSequence - Render number 11");
}

// Test 9: Edge Case - Interpret a word with an unknown character
function testInterpretWordWithUnknownChar() {
  const result = interpretWord("hop#");
  const expectedResult = {
    token: "hop#",
    symbol: "<₩■●○>-<₩●□○>-<₩●○□>-◇",
    metaphor: "The horizon of hope. The orbit of oneness. The path of purpose. Unknown echo.",
    resonance: 0.0975 // (0.08 + 0.15 + 0.16 + 0) / 4
  };
  assertEqual(result, expectedResult, "interpretWord - Interpret 'hop#' with unknown character");
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

// Summary
console.log("\n=== Test Summary ===");
console.log(`Tests Passed: ${testsPassed}`);
console.log(`Tests Failed: ${testsFailed}`);
if (testsFailed === 0) {
  console.log("All tests passed successfully! 🎉");
} else {
  console.error("Some tests failed. Please review the errors above.");
}