const HopeRegistry = (() => {
    let registry = new Map();

    function updateState(taskId, state) {
        registry.set(taskId, state);
    }

    function getState(taskId) {
        return registry.get(taskId) || {};
    }

    return { updateState, getState };
})();

module.exports = HopeRegistry;