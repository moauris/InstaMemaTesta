"use strict";
/** High level game settings
 * @property {number} StartDifficulty The difficulty for the initial round, can be any whole number between 4 - 10.
 * @property {number} MaxRound Determines how many rounds the game will last, can be any whole number between 3 - 10.
 * @property {NumberSets} Numberset Determines which numbers to draw every round.
*/
class ImtGameSetting {
    constructor() {
        /** How the circles appear */
        this.PositionSet = PositionSets.Everywhere;
        /** Px:Grid density on the screen */
        this.PixelsPerGrid = 20;
        this.numberSet = NumberSets.Full;
        this.maxRound = 10;
        this.startDifficulty = 4;
        this.NumberSet = NumberSets.Full;
        this.MaxRound = 10;
        this.StartDifficulty = 4;
    }
    get NumberSet() {
        return this.numberSet;
    }
    set NumberSet(v) {
        this.numberSet = v;
        var tx = document.querySelector("span#numSetTx");
        if (tx === null)
            return;
        var dv = document.querySelector("div.OptionCard.Selected");
        if (dv !== null)
            dv.classList.remove("Selected");
        switch (v) {
            case NumberSets.Full:
                var ns = document.querySelector("div#numset1");
                if (ns !== null)
                    ns.classList.add("Selected");
                tx.textContent = "全盘随机";
                break;
            case NumberSets.Circles:
                var ns = document.querySelector("div#numset2");
                if (ns !== null)
                    ns.classList.add("Selected");
                tx.textContent = "圈圈数字";
                break;
            default:
                break;
        }
    }
    get MaxRound() {
        return this.maxRound;
    }
    set MaxRound(v) {
        if (v < 3 || v > 10)
            return;
        this.maxRound = v | 0;
        var sp = document.querySelector("span#maxRoundTx");
        if (sp === null)
            return;
        sp.textContent = "" + this.maxRound;
    }
    get StartDifficulty() {
        return this.startDifficulty;
    }
    set StartDifficulty(v) {
        if (v < 4 || v > 10)
            return;
        this.startDifficulty = v | 0;
        var sp = document.querySelector("span#startDiffTx");
        if (sp === null)
            return;
        sp.textContent = "" + this.startDifficulty;
    }
}
/** Represents what number sets are used.*/
var NumberSets;
(function (NumberSets) {
    /**Full number sets, 0-9 */
    NumberSets[NumberSets["Full"] = 1] = "Full";
    /**Must have Numbers with a circle inside: 0, 6, 8, 9*/
    NumberSets[NumberSets["Circles"] = 2] = "Circles";
})(NumberSets || (NumberSets = {}));
/** Represents where these nums appear. */
var PositionSets;
(function (PositionSets) {
    /** Everywhere */
    PositionSets[PositionSets["Everywhere"] = 1] = "Everywhere";
    /** Edges Only */
    PositionSets[PositionSets["Edges"] = 2] = "Edges";
})(PositionSets || (PositionSets = {}));
