const ShadowModel = (() => {
    let shadowState = [];

    function updateShadow(metaphor) {
        shadowState = metaphor.map(m => ({
            token: m.token,
            shadowElement: m.element === 'self' ? 'mirror' : m.element,
            shadowMode: m.mode === 'reflect' ? 'observe' : m.mode
        }));
        return shadowState;
    }

    function getShadow() {
        return shadowState;
    }

    return { updateShadow, getShadow };
})();

module.exports = ShadowModel;