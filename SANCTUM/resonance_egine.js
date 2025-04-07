const ResonanceEngine = (() => {
    function measureResonance(hopeOutput, novaOutput) {
        const alignment = Math.abs(hopeOutput.resonance - novaOutput.antiResonance);
        return { alignment, resonance: hopeOutput.resonance, antiResonance: novaOutput.antiResonance };
    }

    return { measureResonance };
})();

module.exports = ResonanceEngine;