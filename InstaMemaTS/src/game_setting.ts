/** High level game settings 
 * @property {number} StartDifficulty The difficulty for the initial round, can be any whole number between 4 - 10.
 * @property {number} MaxRound Determines how many rounds the game will last, can be any whole number between 6 - 10.
 * @property {NumberSets} Numberset Determines which numbers to draw every round.
*/
class ImtGameSetting{
    constructor() {
        this.NumberSet = NumberSets.Full;
        this.MaxRound = 10;
        this.StartDifficulty = 4;
    }
    /** How the circles appear */
    PositionSet : PositionSets = PositionSets.Everywhere;
    /** Px:Grid density on the screen */
    PixelsPerGrid : number = 20;

    
    private numberSet : NumberSets = NumberSets.Full;
    public get NumberSet() : NumberSets {
        return this.numberSet;
    }
    public set NumberSet(v : NumberSets) {
        
        this.numberSet = v;

        var tx = document.querySelector("span#numSetTx");
        if(tx === null) return;

        var dv = document.querySelector("div.OptionCard.Selected");
        if(dv !== null) dv.classList.remove("Selected");
        switch (v) {
            case NumberSets.Full:
                    var ns = document.querySelector("div#numset1");
                    if(ns !== null) ns.classList.add("Selected");
                    tx.textContent = "全盘随机";
                break;
            case NumberSets.Circles:
                    var ns = document.querySelector("div#numset2");
                    if(ns !== null) ns.classList.add("Selected");
                    tx.textContent = "圈圈数字";
                break;
                       
            default:
                break;
        }

        

    }
    
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