declare class Imt_Game {
    /**
     *
     */
    maxRound: number;
    currentRound: number;
    difficulty: number;
    GuessNumbers: Array<number>;
    constructor(maxRound: number);
    initRound(difficulty?: number): void;
    private getNumArrFromBinary;
    private randomRollTable;
    private GetRandom;
}
