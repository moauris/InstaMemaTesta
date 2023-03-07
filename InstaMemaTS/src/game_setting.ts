/** High level game settings */
class ImtGameSetting{
    /** How many rounds the game should last */
    MaxRound : number = 10;
    NumberSet : NumberSets = NumberSets.Full;
    PositionSet : PositionSets = PositionSets.Everywhere;
    PixelsPerGrid : number = 20;

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