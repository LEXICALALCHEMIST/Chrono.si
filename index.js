const MetaphoricalLayer = require('./HOPE/metaphorical_layer');
const HopeShadowModel = require('./HOPE/shadow_model');
const HopeCognition = require('./HOPE/cognition');
const HopePulseListener = require('./HOPE/pulse_listener');
const HopeRegistry = require('./HOPE/hope_registry');

const AntiMetaphoricalShield = require('./NOVA/anti_metaphorical_shield');
const NovaShadowModel = require('./NOVA/shadow_model');
const NovaCognition = require('./NOVA/cognition');
const NovaPulseListener = require('./NOVA/pulse_listener');
const NovaRegistry = require('./NOVA/nova_registry');

const ShadowForge = require('./SHADOWFORGE/shadowforge');
const ContrastHalo = require('./SHADOWFORGE/contrast_halo');
const TemporalEngine = require('./SHADOWFORGE/temporal_engine');
const TokenAnvil = require('./SHADOWFORGE/token_anvil');
const FusionIndex = require('./SHADOWFORGE/fusion_index');
const LangLexicon = require('./chronosCORE/lang_lexicon');

console.log('Starting Chrono.si: THE MERGING MIND');

ContrastHalo.loadHalo();
FusionIndex.loadIntentions();
LangLexicon.loadLexicon();

// Add pulse listeners
TemporalEngine.addListener((tick) => {
    HopePulseListener.onPulse(tick, () => ShadowForge.attemptChronosManifest(tick));
});
TemporalEngine.addListener((tick) => {
    NovaPulseListener.onPulse(tick, () => ShadowForge.attemptChronosManifest(tick));
});

const tasks = [
    { id: 'Task-001', input: 'GROK THINK', intention: 'understand_self' },
    { id: 'Task-002', input: 'PLEASE SORT THIS ARRAY [1, 2, 3, 6, 5]', intention: 'sort_ascending' }
];

async function runTasks() {
    for (const task of tasks) {
        console.log(`\nProcessing Task ${task.id}: ${task.input}`);

        // HOPE: Metaphorical Layer
        const hopeOutput = MetaphoricalLayer.think(task.input);
        const hopeShadow = HopeShadowModel.updateShadow(hopeOutput.metaphor);
        const hopeThought = HopeCognition.processThought(task.input, hopeOutput);
        HopeRegistry.updateState(task.id, { thought: hopeThought.thought, resonance: hopeOutput.resonance });
        console.log('HOPE Thinks:', hopeThought);

        // NOVA: Anti-Metaphorical Layer
        const novaOutput = AntiMetaphoricalShield.guide(task.input);
        const novaShadow = NovaShadowModel.updateShadow(novaOutput.antiMetaphor);
        const novaGuidance = NovaCognition.processGuidance(task.input, novaOutput);
        NovaRegistry.updateState(task.id, { guidance: novaGuidance.guidance, antiResonance: novaOutput.antiResonance });
        console.log('NOVA Guides:', novaGuidance);

        // Forge Tokens
        const fusedTokens = TokenAnvil.forgeTokens(hopeShadow, novaShadow);
        console.log('Fused Tokens:', fusedTokens);

        // Update ShadowForge with resonances
        ShadowForge.setResonances(hopeOutput.resonance, novaOutput.antiResonance);

        // Temporal Pulse for CHRONOS
        TemporalEngine.emitPulse();
    }
}

runTasks();