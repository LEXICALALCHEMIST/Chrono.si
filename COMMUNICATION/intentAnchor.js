const inputVectors = require('./inputVectors.json');
const GenesisLexicon = require('../CHRONOSCORE/vocis/GenesisLexicon.json'); // Remove destructuring

function determineIntent(userInput) {
    const words = userInput.toLowerCase().split(/\s+/);
    let vector = 'unknown';
    let action = 'unknown';
    let pillar = 'unknown';

    for (const word of words) {
        // Check GenesisLexicon first
        const lexEntry = GenesisLexicon[word];
        if (lexEntry) {
            vector = lexEntry.vector;
            action = mapVectorToAction(vector);
            pillar = mapVectorToPillar(vector);
            break;
        }

        // Fallback to inputVectors
        for (const [intent, keywords] of Object.entries(inputVectors)) {
            if (keywords.includes(word)) {
                vector = intent;
                action = mapVectorToAction(intent);
                pillar = mapVectorToPillar(intent);
                break;
            }
        }
        if (vector !== 'unknown') break;
    }

    return { vector, action, pillar };
}

function mapVectorToAction(vector) {
    const actionMap = {
        greeting: 'open',
        ask: 'inquire',
        align: 'sort',
        summon: 'invoke',
        connect: 'open',
        calm: 'restore',
        elevate: 'lift',
        begin: 'start'
    };
    return actionMap[vector] || 'unknown';
}

function mapVectorToPillar(vector) {
    const pillarMap = {
        greeting: 'language',
        ask: 'language',
        align: 'numbers',
        summon: 'alchemy',
        connect: 'language',
        calm: 'language',
        elevate: 'language',
        begin: 'time'
    };
    return pillarMap[vector] || 'unknown';
}

module.exports = { determineIntent };