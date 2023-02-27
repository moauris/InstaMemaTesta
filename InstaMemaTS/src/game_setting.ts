/** High level game settings */
class ImtGameSetting{
    /** How many rounds the game should last */
    MaxRound : number = 10;
    NumberSet : NumberSets = NumberSets.Full;


}

/** Represents what number sets are used.*/
enum NumberSets {
    /**Full number sets, 0-9 */
    Full = 1,
    /**Numbers with a circle inside: 0, 6, 8, 9*/
    Circles = 2
}