const GenesisLexicon = require('../../CHRONOSCORE/vocis/GenesisLexicon.json');

function composeEcho(userInput, intentData) {
    const words = userInput.toLowerCase().split(/\s+/);
    for (const word of words) {
        const lexEntry = GenesisLexicon[word];
        if (lexEntry) {
            return `HOPE Echo: "${lexEntry.metaphor}"`;
        }
    }
    return 'HOPE Echo: No resonance found.';
}

module.exports = { composeEcho };