const GameModule = require('../src/Game.js');


for(let i = 4; i <= 9; i++)
{
    test('Game.initRound with difficulty:= ' + i, () => {
    
        let g = new GameModule.Game(9);
        g.initRound(i);
        expect(g.currentRound).toBe(1);
        expect(g.maxRound).toBe(9);
        expect(g.difficulty).toBe(i);
        expect(g.GuessNumbers.length).toBe(i);
        console.log(g.GuessNumbers);
    });
}
