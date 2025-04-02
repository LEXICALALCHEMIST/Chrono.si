const Cognition = (() => {
    function processThought(input, metaphor) {
        return {
            thought: `NOVA guides: ${metaphor.map(m => `${m.token} (${m.element})`).join(', ')}`,
            input
        };
    }

    return { processThought };
})();

console.log('Exporting NovaCognition:', Cognition); // Debug log
module.exports = Cognition;