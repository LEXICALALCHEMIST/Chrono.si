const Cognition = (() => {
    function processThought(input, metaphor) {
        return {
            thought: `HOPE reflects: ${metaphor.map(m => `${m.token} (${m.element})`).join(', ')}`,
            resonance: metaphor.resonance
        };
    }

    return { processThought };
})();

module.exports = Cognition;