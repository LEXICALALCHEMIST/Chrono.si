const MetaphoricalLayer = require('../HOPE/metaphorical_layer');
const AntiMetaphoricalShield = require('../NOVA/anti_metaphorical_shield');

const testCases = [
    { input: 'GROK THINK', intention: 'understand_self' },
    { input: 'PLEASE SORT THIS ARRAY [1, 2, 3, 6, 5]', intention: 'sort_ascending' }
];

function runTests() {
    testCases.forEach((test, idx) => {
        const hopeOutput = MetaphoricalLayer.think(test.input);
        const novaOutput = AntiMetaphoricalShield.guide(test.input);
        console.log(`Test ${idx + 1}:`, hopeOutput.resonance > 0 && novaOutput.antiResonance > 0 ? 'PASS' : 'FAIL');
    });
}

runTests();