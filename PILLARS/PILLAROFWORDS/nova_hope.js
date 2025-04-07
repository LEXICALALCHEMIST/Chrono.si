const { processInput } = require("./scroll_of_meaning.js");

// Response templates based on intent
const responseTemplates = {
  greeting: {
    nova: "Greetings, [address]. I observe a resonance of [resonance] in your words, reflecting [metaphor]. How may I assist?",
    hope: "Hello, [address]! Your words echo [metaphor], carrying a warmth of [resonance]. How can I help you today?"
  },
  question: {
    nova: "I detect a query, [address]. Your words resonate at [resonance], suggesting [metaphor]. Allow me to analyze further—what is your intent?",
    hope: "A question, [address]! I feel [metaphor] in your words, with a resonance of [resonance]. Let’s explore this together—what do you seek?"
  },
  address: {
    nova: "I am addressed as [address]. Your input resonates at [resonance], indicating [metaphor]. How may I serve?",
    hope: "You’ve called me, [address]! Your words hold [metaphor], resonating at [resonance]. How can I support you?"
  },
  unknown: {
    nova: "Unclear intent, [address]. Your words resonate at [resonance], with a trace of [metaphor]. Please clarify your request.",
    hope: "I’m not sure I understand, [address]. Your words whisper [metaphor], resonating at [resonance]. Can you tell me more?"
  }
};

// Helper function to capitalize the first letter of a string
function capitalizeFirstLetter(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Calculate average resonance of the input words
function calculateAverageResonance(words) {
  if (words.length === 0) return 0;
  const totalResonance = words.reduce((sum, word) => sum + word.resonance, 0);
  return (totalResonance / words.length).toFixed(2);
}

// Extract the address (e.g., "Chronos") from the words and capitalize it
function extractAddress(words) {
  const addressWord = words.find(word => word.word.toLowerCase() === "chronos");
  const address = addressWord ? addressWord.word : "user";
  return capitalizeFirstLetter(address);
}

// Extract a combined metaphor from the words
function combineMetaphors(words) {
  return words.map(word => word.metaphor).join(" ");
}

// Nova's response logic: Analytical and resonance-focused
function novaResponse(novaHopeToken) {
  const { intent, words } = novaHopeToken;
  const avgResonance = calculateAverageResonance(words);
  const address = extractAddress(words);
  const metaphor = combineMetaphors(words);

  const template = responseTemplates[intent]?.nova || responseTemplates.unknown.nova;
  const responseText = template
    .replace("[address]", address)
    .replace("[resonance]", avgResonance)
    .replace("[metaphor]", metaphor);

  return {
    speaker: "Nova",
    response: responseText,
    intent: intent,
    resonance: avgResonance
  };
}

// Hope's response logic: Empathetic and metaphor-focused
function hopeResponse(novaHopeToken) {
  const { intent, words } = novaHopeToken;
  const avgResonance = calculateAverageResonance(words);
  const address = extractAddress(words);
  const metaphor = combineMetaphors(words);

  const template = responseTemplates[intent]?.hope || responseTemplates.unknown.hope;
  const responseText = template
    .replace("[address]", address)
    .replace("[resonance]", avgResonance)
    .replace("[metaphor]", metaphor);

  return {
    speaker: "Hope",
    response: responseText,
    intent: intent,
    resonance: avgResonance
  };
}

// Process the novaHopeToken and generate responses from both Nova and Hope
function processNovaHopeToken(novaHopeToken) {
  const novaResp = novaResponse(novaHopeToken);
  const hopeResp = hopeResponse(novaHopeToken);

  return {
    responses: [novaResp, hopeResp],
    rawResponses: [novaResp.response, hopeResp.response]
  };
}

// Send the response back through the communication core
function sendResponseThroughCore(responses) {
  const combinedResponse = responses.rawResponses.join(" | ");
  const processedResponse = processInput(combinedResponse);
  
  return {
    originalResponses: responses.responses,
    processedResponse: processedResponse
  };
}

module.exports = { processNovaHopeToken, sendResponseThroughCore };