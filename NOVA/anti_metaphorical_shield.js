const LogicCore = require('./logic_core');
const CreativeCore = require('./creative_core');
const ContrastHalo = require('../SHADOWFORGE/contrast_halo');

const AntiMetaphoricalShield = (() => {
    function guide(input) {
        const tokens = LogicCore.processLogic(input);
        const antiMetaphor = CreativeCore.generateAntiMetaphor(tokens);
        const antiResonance = antiMetaphor.reduce((acc, m) => acc + (m.mode === 'structure' || m.mode === 'correct' ? 0.3 : 0.1), 0) / antiMetaphor.length;
        if (antiResonance < 0.3) {
            ContrastHalo.logFailure(input, 'unstable anti-resonance', 'Metaphor may require anchoring structure');
        }
        return { input, antiMetaphor, antiResonance };
    }

    return { guide };
})();

module.exports = AntiMetaphoricalShield;