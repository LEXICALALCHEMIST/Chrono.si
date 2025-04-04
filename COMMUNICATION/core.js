const { determineIntent } = require('./intentAnchor');
const { composeEcho } = require('../HOPE/language/glyphEcho');

function receiveInput(userInput) {
    console.log(`Received Input: ${userInput}`);

    // Pipe input to intentAnchor to determine the intent
    const intentData = determineIntent(userInput);
    console.log(`Anchor: vector: ${intentData.vector}, action: ${intentData.action}, pillar: ${intentData.pillar}`);

    // HOPE's echo via glyphEcho
    const hopeEcho = composeEcho(userInput, intentData);

    // Dummy CHRONOS echo
    const chronosEcho = `CHRONOS Echo: Intent detected - ${intentData.vector || 'unknown'}`;
    console.log(hopeEcho);
    console.log(chronosEcho);

    return { input: userInput, intentData, hopeEcho, chronosEcho };
}

module.exports = { receiveInput };