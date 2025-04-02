const LogicCore = require('./logic_core');
const CreativeCore = require('./creative_core');
const ContrastHalo = require('../SHADOWFORGE/contrast_halo');

const MetaphoricalLayer = (() => {
    function think(input) {
        const tokens = LogicCore.processLogic(input);
        const metaphor = CreativeCore.generateMetaphor(tokens);
        const resonance = metaphor.reduce((acc, m) => acc + (m.mode === 'order' || m.mode === 'reflect' ? 0.2 : 0.1), 0) / metaphor.length;
        if (resonance < 0.3) {
            ContrastHalo.logFailure(input, 'low resonance metaphor', 'Insufficient symbolic depth');
        }
        return { input, metaphor, resonance };
    }

    return { think };
})();

module.exports = MetaphoricalLayer;