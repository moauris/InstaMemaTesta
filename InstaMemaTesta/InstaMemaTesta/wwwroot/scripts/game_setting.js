"use strict";
/** High level game settings */
class ImtGameSetting {
    constructor() {
        /** How many rounds the game should last */
        this.MaxRound = 10;
        this.NumberSet = NumberSets.Full;
        this.PositionSet = PositionSets.Everywhere;
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
