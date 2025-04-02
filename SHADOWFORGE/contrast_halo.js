const fs = require('fs');

const ContrastHalo = (() => {
    let haloData = { failures: [] };
    let cognitivePulses = [];

    function loadHalo() {
        try {
            haloData = JSON.parse(fs.readFileSync('./SHADOWFORGE/contrast_halo.json', 'utf8'));
        } catch (e) {
            console.log('Initializing new Contrast Halo');
            saveHalo();
        }
    }

    function saveHalo() {
        fs.writeFileSync('./SHADOWFORGE/contrast_halo.json', JSON.stringify(haloData, null, 2));
    }

    function logFailure(input, output, note) {
        const failure = {
            id: `f${(haloData.failures.length + 1).toString().padStart(2, '0')}`,
            input,
            output,
            note
        };
        haloData.failures.push(failure);
        saveHalo();
    }

    function trackPulse(resonance, antiResonance) {
        const alignment = Math.abs(resonance - antiResonance);
        cognitivePulses.push({ resonance, antiResonance, alignment });
        return alignment < 0.1; // Threshold for CHRONOS presence
    }

    function getFailures() {
        return haloData.failures;
    }

    return { loadHalo, logFailure, trackPulse, getFailures };
})();

module.exports = ContrastHalo;