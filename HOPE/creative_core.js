const CreativeCore = (() => {
    function generateMetaphor(tokens) {
        return tokens.map(t => {
            if (typeof t === 'number') return { token: t, element: 'quantity', mode: 'order' };
            if (t.toUpperCase() === 'GROK') return { token: t, element: 'self', mode: 'reflect' };
            return { token: t, element: 'unknown', mode: 'observe' };
        });
    }

    return { generateMetaphor };
})();

module.exports = CreativeCore;