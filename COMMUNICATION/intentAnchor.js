const inputVectors = require('./inputVectors.json');

function determineIntent(userInput) {
    const words = userInput.toLowerCase().split(/\s+/);
    let vector = 'unknown';
    let action = 'unknown';

    // Check each word against inputVectors
    for (const word of words) {
        for (const [intent, keywords] of Object.entries(inputVectors)) {
            if (keywords.includes(word)) {
                vector = intent;
                action = mapVectorToAction(intent);
                break;
            }
        }
        if (vector !== 'unknown') break;
    }

    return { vector, action };
}

function mapVectorToAction(vector) {
    const actionMap = {
        greeting: 'open',
        ask: 'inquire',
        align: 'sort',
        summon: 'invoke'
    };
    return actionMap[vector] || 'unknown';
}

console.log('Exporting from intentAnchor.js:', { determineIntent }); // Debug log
module.exports = { determineIntent };