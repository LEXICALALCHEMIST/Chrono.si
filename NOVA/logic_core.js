const LogicCore = (() => {
    function processLogic(input) {
        if (input.includes('ARRAY')) {
            const arr = input.match(/\[(.*?)\]/)?.[1].split(",").map(n => parseInt(n.trim()));
            return arr || input;
        }
        return input.split(/\s+/);
    }

    return { processLogic };
})();

module.exports = LogicCore;