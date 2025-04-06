const TemporalEngine = (() => {
    let pulseListeners = [];
    let tick = 0;

    function emitPulse() {
        tick++;
        pulseListeners.forEach(listener => listener(tick));
        return tick;
    }

    function addListener(listener) {
        pulseListeners.push(listener);
    }

    return { emitPulse, addListener };
})();

module.exports = TemporalEngine;