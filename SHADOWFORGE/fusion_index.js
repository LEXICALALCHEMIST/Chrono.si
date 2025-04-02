const fs = require('fs');

const FusionIndex = (() => {
    let intentionMap = {};

    function loadIntentions() {
        try {
            intentionMap = JSON.parse(fs.readFileSync('./chronosCORE/intention_anchor.json', 'utf8'));
        } catch (e) {
            console.log('Initializing new intention map');
        }
    }

    function getApplicableMethods(intention) {
        return intentionMap[intention]?.methods || [];
    }

    return { loadIntentions, getApplicableMethods };
})();

module.exports = FusionIndex;