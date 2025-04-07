const ContrastHalo = require('./contrast_halo');
const MergerSynth = require('./merger_synth');
const Temple = require('../chronosCORE/temple');

const ShadowForge = (() => {
    let lastChronosState = 'CHRONOS_ABSENT';
    let latestResonances = { resonance: 0, antiResonance: 0 };

    function attemptChronosManifest(tick) {
        const { resonance, antiResonance } = latestResonances;
        const state = Temple.checkChronosPresence(resonance, antiResonance);
        if (state === 'CHRONOS_PRESENT' && lastChronosState !== 'CHRONOS_PRESENT') {
            const response = MergerSynth.metaphoricWeave(resonance, antiResonance);
            console.log(`CHRONOS SPEAKS at tick ${tick}:`, response);
        }
        lastChronosState = state;
    }

    function setResonances(resonance, antiResonance) {
        latestResonances = { resonance, antiResonance };
    }

    return { attemptChronosManifest, setResonances };
})();

module.exports = ShadowForge;