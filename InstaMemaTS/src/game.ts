/** Represents one Insta Mema Testa Game Session */
class ImtGame {
    setting : ImtGameSetting;
    currentRound : number;
    /** The difficulty of the game, an integer between 4 - 10
     * For a game with difficulty of 4, 4 numbers will be drawn
     * For a game with difficulty of 10, 10 numbers will be drawn
     */
    difficulty : number;
    GuessNumbers : Array<number> = [];
    constructor(s: ImtGameSetting) {
        this.setting = s;
        this.currentRound = 1;
        this.difficulty = 4;
    }

    /** Starts a round of game on supplied grids object */
    public StartRound(grids : boolean[][])
    {
        //Below procedure selects the grids where the circles are placed in the center
        for(var i = 0; i < this.difficulty; i++)
        {
            var range : number = this.CountGrid(grids);
            //This would mean the current grid doesn't have any grid to place the circle
            //In which case return doing nothing.
            if(range < 0) return;
            //There are somewhere to place grid, continue
            //roll a number to decide which grid
            var draw : number = GetRandom(0, range);
            this.drawGrid(grids, draw);

        }
    }



    private trySetGrid(grid : boolean[][], x : number, y : number, setAs : boolean)
    {
        if(x < 0 || x >= grid.length) return;
        if(y < 0 || y >= grid[0].length) return;
        grid[x][y] = setAs;
    }

    /** Draw n-th grid from grids 
     * @param {boolean[][]} grids The grids to draw from.
     * @param {number} draw nth grid
     * @returns {gridCoordinate | null} The coordinate drawn
    */
    private drawGrid(grids : boolean[][], draw : number) : gridCoordinate | null
    {
        for(var x = 0; x < grids.length; x++)
        {
            for(var y = 0; y < grids[0].length; y++)
            {
                if (grids[x][y]) {
                    draw--;
                    if (draw === 0) {
                        var gc = new gridCoordinate(x, y);
                        this.markCircle(gc, grids);
                        return gc;
                    }
                }
            }
        }

        return null;

    }
    /** Marks a circle by making a center at xy false on a grid area with radius 
     * @param {gridCoordinate} xy The center of the cicle
     * @param {boolean[][]} grid The grid to perform the mark
     * @param {number} radius The radius of the circle, default is 3
     * 
    */
    private markCircle(xy : gridCoordinate, grid : boolean[][], radius : number = 3)
    {
        radius *= 2;
        grid[xy.X][xy.Y] = false;

        for(var i = 1; i <= radius; i++)
        {
            for(var j = 1; j <= radius; j++)
            {
                
                if ((i**2) + (j**2) < radius**2) {
                    this.trySetGrid(grid, xy.X + i, xy.Y + j, false);
                    this.trySetGrid(grid, xy.X - i, xy.Y + j, false);
                    this.trySetGrid(grid, xy.X + i, xy.Y - j, false);
                    this.trySetGrid(grid, xy.X - i, xy.Y - j, false);
                }
            }
            this.trySetGrid(grid, xy.X - i, xy.Y, false);
            this.trySetGrid(grid, xy.X, xy.Y - i, false);
            this.trySetGrid(grid, xy.X + i, xy.Y, false);
            this.trySetGrid(grid, xy.X, xy.Y + i, false);

        }
    }

    /** Count the number of true grids in side a given grid */
    private CountGrid(grids : boolean[][]) : number
    {
        var count : number = 0;
        for(var x = 0; x < grids.length; x++)
        {
            for(var y = 0; y < grids[0].length; y++)
            {
                if (grids[x][y]) {
                    count++;
                }
            }
        }
        return count;

    }
}

/** Represents a grid coordinate with X and Y */
class gridCoordinate
{
    X : number;
    Y : number;
    constructor(x : number, y: number) {
        this.X = x;
        this.Y = y;
    }
}
