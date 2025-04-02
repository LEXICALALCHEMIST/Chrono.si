const TokenAnvil = (() => {
    function forgeTokens(hopeShadow, novaShadow) {
        return hopeShadow.map((h, idx) => ({
            token: h.token,
            fusedElement: h.shadowElement === novaShadow[idx]?.shadowElement ? h.shadowElement : 'conflict',
            fusedMode: h.shadowMode === novaShadow[idx]?.shadowMode ? h.shadowMode : 'discord'
        }));
    }

    return { forgeTokens };
})();

module.exports = TokenAnvil;