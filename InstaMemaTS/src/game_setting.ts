/** High level game settings 
 * @property {number} StartDifficulty The difficulty for the initial round, can be any whole number between 4 - 10.
 * @property {number} MaxRound Determines how many rounds the game will last, can be any whole number between 6 - 10.
*/
class ImtGameSetting{
    /** What number sets to use */
    NumberSet : NumberSets = NumberSets.Full;
    /** How the circles appear */
    PositionSet : PositionSets = PositionSets.Everywhere;
    /** Px:Grid density on the screen */
    PixelsPerGrid : number = 20;

    
    private maxRound : number = 10;
    public get MaxRound() : number {
        return this.maxRound;
    }
    public set MaxRound(v : number) {
        if(v < 6 || v > 10) return;

        this.maxRound = v | 0;
        var sp = document.querySelector("span#maxRoundTx");
        if(sp === null) return;
        sp.textContent = "" + this.maxRound;
    }
    

    private startDifficulty : number = 4;
    public get StartDifficulty() : number {
        return this.startDifficulty;
    }
    public set StartDifficulty(v : number) {
        if(v < 4 || v > 10) return;

        this.startDifficulty = v | 0;
        var sp = document.querySelector("span#startDiffTx");
        if(sp === null) return;
        sp.textContent = "" + this.startDifficulty;
    }
    

}

/** Represents what number sets are used.*/
enum NumberSets {
    /**Full number sets, 0-9 */
    Full = 1,
    /**Must have Numbers with a circle inside: 0, 6, 8, 9*/
    Circles = 2
}
/** Represents where these nums appear. */
enum PositionSets {
    /** Everywhere */
    Everywhere = 1,
    /** Edges Only */
    Edges = 2
}