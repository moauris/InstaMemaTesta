const GameModule = require('../src/Game.js');

test('Test if Game Object can be initialized', () => {
    
    let g = new GameModule.Game(9);
    expect(g.currentRound).toBe(1);
    expect(g.maxRound).toBe(9);
    expect(g.difficulty).toBe(4);
    expect(g.GuessNumbers.length).toBe(0);
});