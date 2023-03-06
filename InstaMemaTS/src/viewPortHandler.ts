/** The InstaMema VisualViewport Handler handles the operations related to the current DOM's viewport. */
class VvpHandler {
    /** The Height of the viewport, in px and integer */
    Height : number;
    /** The width of the viewport, in px and integer */
    Width : number;

    /** Uniform radius of the number circles*/
    Radius: number = 3;

    Grids: boolean[][];
    /**
     * Initializes a new VvpHandler instance
     * @param {VisualViewport | null} viewPort DOM VisualViewport
     */
    constructor(viewPort : VisualViewport | null) {
            this.Height = viewPort!.height | 0;
            this.Width = viewPort!.width | 0;
            this.Grids = this.createGrids();
            this.setDeadZone();
    }
    /**
     * Gets the number of grid or blocks can be placed horizontally
     * @returns {number} number of grids or blocks can be placed horizontally
     */
    public xGrids() : number
    {
        return (this.Width / 20) | 0;
    }
    /**
     * Get the number of grid or blocks can be placed vertically
     * @returns {number} number of grids or blocks can be placed vertically
     */
    public yGrids() : number
    {
        return (this.Height / 20) | 0;
    }
    /**
     * Get the total number of grids or blocks on the screen
     * @returns {number} total number of grids or blocks on the viewport
     */
    public totalGrids() : number
    {
        return this.xGrids() * this.yGrids();
    }
    public resetGrids()
    {
        this.Grids = this.createGrids();
        this.setDeadZone();
    }
    public createGrids() : boolean[][]
    {
        var x : number = this.xGrids();
        var y : number = this.yGrids();
        
        var result : boolean[][] = new Array<Array<boolean>>(x);
        var id : number = 0;
        for(var i = 0; i < x; i++)
        {
            result[i] = new Array<boolean>(y);
            result[i].fill(false);
        }
        return result;
    }
    /**
     * Prints the viewport dimension information, height x width, yGrid x xGrid
     * @returns {string} Information about the dimension.
     */
    public printDimension() : string
    {
        var out : string = this.Height.toFixed() + "x" + this.Width.toFixed();
        var out1 : string = this.yGrids() + "x" + this.xGrids() + "=" + this.totalGrids();
        return out + ", " + out1;
    }
    /** Set a deadzone by the edge by 1 circle radius */
    public setDeadZone()
    {
        for(var x = this.Radius; x < this.xGrids() - this.Radius; x++)
        {
            for(var y = this.Radius + 2; y < this.yGrids() - this.Radius; y++)
            {
                this.Grids[x][y] = true;
            }
        }
    }
}



