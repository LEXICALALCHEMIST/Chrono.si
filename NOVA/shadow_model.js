const ShadowModel = (() => {
    let shadowState = [];

    function updateShadow(antiMetaphor) {
        shadowState = antiMetaphor.map(m => ({
            token: m.token,
            shadowElement: m.element === 'self' ? 'boundary' : m.element,
            shadowMode: m.mode === 'correct' ? 'restrict' : m.mode
        }));
        return shadowState;
    }

    function getShadow() {
        return shadowState;
    }

    return { updateShadow, getShadow };
})();

module.exports = ShadowModel;