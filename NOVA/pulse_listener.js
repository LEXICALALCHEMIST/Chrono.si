const PulseListener = (() => {
    let lastPulse = 0;

    function onPulse(tick, callback) {
        lastPulse = tick;
        callback(tick);
    }

    return { onPulse };
})();

module.exports = PulseListener;