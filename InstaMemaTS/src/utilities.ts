/** Create a Draw List based on the draw provided.
 * A draw could be any number from 4 - 10
 * @param {number} draw Determines how many numbers to draw
 * @param {NumberSets} set Determines how the numbers are drawn
 * @returns
 */
function CreateDrawList(draw : number, set : NumberSets) : number[]
{
    var result : number[] = [];
    if(draw < 4 || draw > 11) throw new Error("Draw must be a whole num between 4 and 10");
    //mapping is as below:
    //11_1111_1111
    //01_2345_6789
    //therefore circles set should be:
    //10_0000_1011 or 523
    //iterate from 00_0000_0000 to 11_1111_1111
    for(var i = 0; i < 1024; i++)
    {
        if(CountOnes(i) === draw)
        {
            switch (set) {
                case NumberSets.Circles:
                    if((i & 523) === 523)
                    {
                        result.push(i);
                    }
                    break;
                case NumberSets.Full:
                    result.push(i);
                default:
                    break;
            }
        }
    }
    
    return result;

}

/**Count the number of 1s in any number */
function CountOnes(num : number) : number
{
    var result : number = 0;
    while(num > 0)
    {
        if(1 == (num & 1))
        {
            result++;
        }
        num >>= 1;
    }
    return result;
}


function GetRandom(lower : number, upper : number){
    let rand = Math.random() * (upper - lower) + lower;
    return Math.floor(rand);
}



/**Make a random draw based on difficulty
 * @param {number} difficulty How many numbers to draw from
 * @param {NumberSets} set determines how the numbers to be draw
 * @returns The list of selected numbers
 */
function Draw(difficulty : number, set : NumberSets) : number[]
{
    
    var drawList = CreateDrawList(difficulty, set);
    var drawn = GetRandom(0, drawList.length);
    var bin = drawList[drawn];

    var i : number = 9;
    var result : number[] = [];
    while(bin > 0)
    {
        if((bin & 1) == 1)
        {
            result.push(i);
        }
        i--;
        bin >>= 1;
    }
    return result;
}