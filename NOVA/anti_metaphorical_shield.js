const ContrastHalo = require('../SHADOWFORGE/contrast_halo');

const AntiMetaphoricalShield = (() => {
    function evaluateContrast(metaphorSignal) {
        const resonance = measureResonance(metaphorSignal);
        if (resonance < 0.3) {
            ContrastHalo.logFailure(
                metaphorSignal.input,
                'unstable anti-resonance',
                'Metaphor may require anchoring structure'
            );
            return {
                status: "unstable",
                haloNote: "metaphor may require anchoring structure",
                antiResonance: resonance
            };
        }
        return {
            status: "stable",
            haloNote: "resonance aligned",
            antiResonance: resonance
        };
    }

    function measureResonance(signal) {
        const depth = signal.metaphor.reduce((acc, m) => acc + (m.element !== 'unknown' ? 1 : 0), 0);
        return depth / signal.metaphor.length;
    }

    return { evaluateContrast };
})();

console.log('Exporting AntiMetaphoricalShield:', AntiMetaphoricalShield); // Debug log
module.exports = AntiMetaphoricalShield;