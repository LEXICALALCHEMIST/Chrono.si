const CreativeCore = (() => {
    function generateAntiMetaphor(tokens) {
        return tokens.map(t => {
            if (typeof t === 'number') return { token: t, element: 'quantity', mode: 'structure' };
            if (t.toUpperCase() === 'GROK') return { token: t, element: 'self', mode: 'correct' };
            return { token: t, element: 'unknown', mode: 'restrict' };
        });
    }

    return { generateAntiMetaphor };
})();

module.exports = CreativeCore;