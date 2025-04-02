const Cognition = (() => {
    function processThought(input, metaphor, resonance) { // Add resonance parameter
        return {
            thought: `HOPE reflects: ${metaphor.map(m => `${m.token} (${m.element})`).join(', ')}`,
            input,
            resonance // Include resonance in the output
        };
    }

    return { processThought };
})();

module.exports = Cognition;