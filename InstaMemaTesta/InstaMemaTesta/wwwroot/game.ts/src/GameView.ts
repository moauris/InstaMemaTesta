
// Class representation of a game view
// default is initialized for 80x60 for 800x600 resolution
class GameView
{
    private screen : Array<Array<boolean>>;

    public width : number;
    public height : number;
    public radius : number;

    private countofTrues : number;

    public Circles : number = 0;

    constructor(width : number = 80, 
        height : number = 60, 
        radius : number = 8) 
    {
        this.width = width;
        this.height = height;
        this.radius = radius;

        this.screen = new Array(this.width);
        this.countofTrues = 0;

        for(let i = 0; i < this.width; i++)
        {
            this.screen[i] = new Array<boolean>(this.height);
            for(let j = 0; j < this.height; j++)
            {
                this.screen[i][j] = false;
            }
        }
        
        //console.log("count of trues initialized to be: " + this.countofTrues);
        this.setDeadZone();
    }

    resetScreen() : void
    {
        for(let i = 0; i < this.width; i++)
        {
            for(let j = 0; j < this.height; j++)
            {
                this.screen[i][j] = false;
            }
        }
        this.setDeadZone();
    }

    checkBound(x: number, y: number) : boolean
    { 
        return x >= 0 && y >= 0 && x < this.width && y < this.height;
    }
    //Get the result of a point at x or y.
    //Returns null if x or y is out of bound
    tryGetPoint(x : number, y : number) : boolean | null
    {
        if(this.checkBound(x, y))
        {
            return this.screen[x][y];
        }
        return null;
    }

    GetPoint(x : number, y : number) : boolean
    {
        return this.screen[x][y];
    }

    trySetPoint(x : number, y : number, newVal : boolean) : void
    {
        let oldVal : boolean | null = this.tryGetPoint(x, y);
        if(oldVal === null) return; //return if outofBound
        if(oldVal !== newVal) // only change value if old is not new
        {
            this.screen[x][y] = newVal;
            //console.log("Point(" + x + "," + y + ") is set to " + newVal + " was " + oldVal);
            if (oldVal === true)
            {
                this.countofTrues--; // one less true;
            } else {
                this.countofTrues++; // one more true;
            }
            
            //console.log("count of trues changed to: " + this.countofTrues);
        }
        
    }
    // deadzone is the edge area where if a center were to be placed
    // a full circle with radius cannot be rendered
    private setDeadZone() : void
    {
        for(let i = 0; i < this.width; i++)
        {
            for(let j = 0; j < this.height; j++)
            {
                let isOutDeadZone = 
                    i + this.radius < this.width &&
                    j + this.radius < this.height &&
                    i >= this.radius &&
                    j >= this.radius;
                this.trySetPoint(i, j, isOutDeadZone)
            }
        }
    }

    private drawRandomFrom(lower : number, 
        upper : number) : number
    {
        let rand = Math.random() * (upper - lower) + lower;
    
        return Math.floor(rand);
    }

    private selectRandomAvailablePoint() : ScreenPoint | null
    {
        //console.log("[selectRandomAvailablePoint](0): there are " + this.countofTrues + " points in screen.");
        if (this.countofTrues === 0) {
            throw new Error("There are no available points left to be drawn");
        }
        let randIndex : number = this.drawRandomFrom(0, this.countofTrues);

        //console.log("[selectRandomAvailablePoint](1): Selected random index: " + randIndex);

        for(let i = 0; i <= this.width; i++)
        {
            for(let j = 0; j <= this.height; j++)
            {
                if (this.tryGetPoint(i, j)){
                    if (randIndex === 0) 
                    {
                        let target = new ScreenPoint(i, j);
                        this.fill2XRadiusCircleAt(target);
                        return target;
                    }
                    randIndex--;
                }
            }
        }
        return null;
    }

    public fill2XRadiusCircleAt(center : ScreenPoint) : void
    {
        let d = 2 * this.radius;
        let top : number = center.Y - d;
        let left : number = center.X - d;
    
    
        for(let i = 0; i <= d; i++)
        {
            for(let j = 0; j <= d; j++)
            {
                let inRadius = this.isInRadius(new ScreenPoint(i, j));
                if (inRadius) {
                    this.trySetPoint(left + i, top + j, false);
                    this.trySetPoint(left + (2 * d - i), top + j, false);
                    this.trySetPoint(left + i, top + (2 * d - j), false);
                    this.trySetPoint(left + (2 * d - i), top + (2 * d - j), false);
                }
            }
        }
    }

    private isInRadius(p : ScreenPoint) : boolean
    {
        let dX2 = (p.X - 2 * this.radius) ** 2;
        let dY2 = (p.Y - 2 * this.radius) ** 2;
        return (dX2 + dY2) <= ((2 * this.radius) ** 2);

    }

    public GetPoints() : Array<ScreenPoint>
    {
        let results = new Array<ScreenPoint>();
        let target : ScreenPoint | null;
        while (this.Circles > 0) {
            target = this.selectRandomAvailablePoint();
            if(target !== null)
            {
                results.push(target);
                this.Circles--;
            }
        }
        return results;
    }

}

class ScreenPoint{
    X = 0;
    Y = 0;
    constructor(x : number, y : number) {
        this.X = x;
        this.Y = y;
    }
}