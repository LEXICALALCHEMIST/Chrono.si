const ContrastHalo = require('../SHADOWFORGE/contrast_halo');

const MetaphoricalLayer = (() => {
    function generateMetaphor(input) {
        const tokens = input.split(/\s+/);
        const metaphor = tokens.map(t => {
            if (t.match(/\d+/)) return { token: t, element: 'quantity', mode: 'order' };
            if (t.toUpperCase() === 'GROK') return { token: t, element: 'self', mode: 'reflect' };
            return { token: t, element: 'unknown', mode: 'observe' };
        });
        const resonance = metaphor.reduce((acc, m) => acc + (m.mode === 'order' || m.mode === 'reflect' ? 0.2 : 0.1), 0) / metaphor.length;
        if (resonance < 0.3) {
            ContrastHalo.logFailure(input, 'low resonance metaphor', 'Insufficient symbolic depth');
        }
        return { metaphor, resonance };
    }

    return { generateMetaphor };
})();

console.log('Exporting MetaphoricalLayer:', MetaphoricalLayer); // Debug log
module.exports = MetaphoricalLayer;