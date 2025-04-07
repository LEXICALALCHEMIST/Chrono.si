const { processToken } = require("./SANCTUM/token_portal.js");

// Simulate UI input - Textual
console.log("=== Simulating Textual Input ===");
const textInput = "Hello how are you Chronos";
const textResult = processToken(textInput);
console.log("Textual Result:", textResult);

// Simulate UI input - Numeric
console.log("\n=== Simulating Numeric Input ===");
const numberInput = "1 2 3";
const numberResult = processToken(numberInput, true);
console.log("Numeric Result:", numberResult);