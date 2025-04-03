const { determineIntent } = require('./intentAnchor');
const GenesisLexicon = require('../CHRONOSCORE/vocis/GenesisLexicon.json'); // Remove destructuring

function receiveInput(userInput) {
    console.log(`Received Input: ${userInput}`);

    // Pipe input to intentAnchor to determine the intent
    const intentData = determineIntent(userInput);
    console.log(`Anchor: vector: ${intentData.vector}, action: ${intentData.action}, pillar: ${intentData.pillar}`);

    // HOPE's echo based on the Lexicon
    const words = userInput.toLowerCase().split(/\s+/);
    let hopeEcho = 'HOPE Echo: No resonance found.';
    for (const word of words) {
        const lexEntry = GenesisLexicon[word];
        if (lexEntry) {
            hopeEcho = `HOPE Echo: "${lexEntry.metaphor}"`;
            break;
        }
    }

    // Dummy CHRONOS echo
    const chronosEcho = `CHRONOS Echo: Intent detected - ${intentData.vector || 'unknown'}`;
    console.log(hopeEcho);
    console.log(chronosEcho);

    return { input: userInput, intentData, hopeEcho, chronosEcho };
}

module.exports = { receiveInput };