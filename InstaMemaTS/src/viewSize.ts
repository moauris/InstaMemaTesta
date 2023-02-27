/** Prints the Vvp Dimension to the div id="sizeinfo"
 * 
 */
function printVvpDimension(handler : VvpHandler)
{
    var sizeInfo = document.getElementById("sizeinfo");
    sizeInfo!.innerText = handler.printDimension();
}

/** The InstaMema VisualViewport Handler handles the operations related to the current DOM's viewport. */
class VvpHandler {
    Height : number;
    Width : number;
    /**
     * Initializes a new VvpHandler instance
     * @param {VisualViewport | null} viewPort DOM VisualViewport
     */
    constructor(viewPort : VisualViewport | null) {
            this.Height = viewPort!.height;
            this.Width = viewPort!.width;
            printVvpDimension(this);
            viewPort!.onresize = (e) => {
                this.Height = viewPort!.height;
                this.Width = viewPort!.width;
                printVvpDimension(this);
            }
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
}


const vvpHandler : VvpHandler = new VvpHandler(visualViewport);
printVvpDimension(vvpHandler);
