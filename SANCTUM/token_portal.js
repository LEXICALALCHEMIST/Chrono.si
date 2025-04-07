const intentVectors = require("../CHRONO/vocis/intentvectors.json");
const { processInput: processWordInput } = require("../PILLARS/PILLAROFWORDS/scroll_of_meaning.js");
const { processNovaHopeToken, sendResponseThroughCore } = require("../PILLARS/PILLAROFWORDS/nova_hope.js");
const { processInput: processNumberInput } = require("../PILLARS/PILLAROFNUMBERS/scroll_of_growth.js");

// Simple intent detection for words (placeholder)
function detectIntent(input) {
  const words = input.toLowerCase().split(/\s+/);
  
  for (const word of words) {
    if (intentVectors[word]) {
      return intentVectors[word].intent || "unknown";
    }
  }
  
  return "greeting";
}

// Check if the input is numeric
function isNumericInput(input) {
  return /^\d+(\s+\d+)*$/.test(input.trim());
}

// Process the raw input token from the UI
function processToken(input, isNumeric = false) {
  console.log(`Received input token: ${input}`);

  if (isNumeric || isNumericInput(input)) {
    // Handle numeric input with PILLAROFNUMBERS
    console.log("Processing as numeric input...");
    const numberEntries = processNumberInput(input);
    console.log("Number entries:", numberEntries);

    // For now, return the number entries (we'll add Nova/Hope-like processing for numbers later)
    return {
      type: "numeric",
      numberEntries: numberEntries
    };
  } else {
    // Handle textual input with PILLAROFWORDS
    console.log("Processing as textual input...");
    
    // Step 1: Detect intent
    const intent = detectIntent(input);
    console.log(`Detected intent: ${intent}`);
    
    // Step 2: Send to PILLAROFWORDS for tokenization and Latin root mapping
    const starterEntries = processWordInput(input);
    console.log("Starter entries:", starterEntries);
    
    // Step 3: Create a token for Nova and Hope
    const novaHopeToken = {
      intent: intent,
      words: starterEntries.map(entry => ({
        word: entry.word,
        latinRoot: entry.latinRoot,
        latinGlyph: entry.latinGlyph,
        metaphor: entry.metaphor,
        resonance: entry.resonance
      }))
    };
    
    console.log("Generated Nova/Hope token:", novaHopeToken);
    
    // Step 4: Send the token to Nova and Hope for processing
    const responseData = processNovaHopeToken(novaHopeToken);
    console.log("Nova and Hope responses:", responseData.responses);
    
    // Step 5: Send the response back through the communication core
    const finalResponse = sendResponseThroughCore(responseData);
    console.log("Processed response for UI:", finalResponse.processedResponse);
    
    return {
      type: "textual",
      novaHopeToken: novaHopeToken,
      responses: finalResponse.originalResponses,
      processedResponse: finalResponse.processedResponse
    };
  }
}

module.exports = { processToken };