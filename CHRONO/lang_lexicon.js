const fs = require('fs');

const LangLexicon = (() => {
    let lexicon = { tokens: [] };

    function loadLexicon() {
        try {
            lexicon = JSON.parse(fs.readFileSync('./chronosCORE/GenesisLexicon.json', 'utf8'));
        } catch (e) {
            console.log('Initializing new Genesis Lexicon');
            saveLexicon();
        }
    }

    function saveLexicon() {
        fs.writeFileSync('./chronosCORE/GenesisLexicon.json', JSON.stringify(lexicon, null, 2));
    }

    function parseToken(word) {
        const token = lexicon.tokens.find(t => t.word === word.toUpperCase());
        return token || { word, latinRoot: 'unknown', elementType: 'unknown', atomicResonanceScore: 0.1 };
    }

    return { loadLexicon, parseToken };
})();

module.exports = LangLexicon;