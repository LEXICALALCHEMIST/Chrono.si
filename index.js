const { generateMetaphor } = require('./HOPE/metaphorical_layer');
const AntiMetaphoricalShield = require('./NOVA/anti_metaphorical_shield'); // Use non-destructured import
const Cognition = require('./HOPE/cognition');
const NovaCognition = require('./NOVA/cognition');
const ShadowForge = require('./SHADOWFORGE/shadowforge');
const TemporalEngine = require('./SHADOWFORGE/temporal_engine');
const ContrastHalo = require('./SHADOWFORGE/contrast_halo');

console.log('Starting Chrono.si: THE MERGING MIND');

ContrastHalo.loadHalo();

const tasks = [
    { id: 'Task-001', input: 'GROK THINK', intention: 'understand_self' },
    { id: 'Task-002', input: 'PLEASE SORT THIS ARRAY [1, 2, 3, 6, 5]', intention: 'sort_ascending' }
];

async function runTasks() {
    for (const task of tasks) {
        console.log(`\nProcessing Task ${task.id}: ${task.input}`);

        // HOPE: Metaphorical Layer
        const hopeOutput = generateMetaphor(task.input);
        const hopeThought = Cognition.processThought(task.input, hopeOutput.metaphor, hopeOutput.resonance);
        console.log('HOPE Thinks:', hopeThought);

        // NOVA: Anti-Metaphorical Layer
        const novaOutput = AntiMetaphoricalShield.evaluateContrast(hopeOutput); // Use the module explicitly
        const novaThought = NovaCognition.processThought(task.input, hopeOutput.metaphor);
        console.log('NOVA Guides:', { thought: novaThought.thought, evaluation: novaOutput });

        // Update ShadowForge with resonances
        ShadowForge.setResonances(hopeOutput.resonance, novaOutput.antiResonance);

        // Temporal Pulse for CHRONOS
        TemporalEngine.emitPulse();
    }
}

runTasks();