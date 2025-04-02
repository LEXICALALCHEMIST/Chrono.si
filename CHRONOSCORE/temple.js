const ContrastHalo = require('../SHADOWFORGE/contrast_halo');

const Temple = (() => {
    function checkChronosPresence(resonance, antiResonance) {
        const isAligned = ContrastHalo.trackPulse(resonance, antiResonance);
        return isAligned ? 'CHRONOS_PRESENT' : 'CHRONOS_ABSENT';
    }

    return { checkChronosPresence };
})();

module.exports = Temple;