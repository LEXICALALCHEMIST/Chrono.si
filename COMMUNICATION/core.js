const { determineIntent } = require('./intentAnchor.js');

function receiveInput(userInput) {
    console.log(`Received Input: ${userInput}`);

    // Pipe input to intentAnchor to determine the intent
    const intentData = determineIntent(userInput);

    // Dummy CHRONOS echo for now
    const chronosEcho = `CHRONOS Echo: Intent detected - ${intentData.vector || 'unknown'}`;
    console.log(chronosEcho);

    return { input: userInput, intentData, chronosEcho };
}

module.exports = { receiveInput };