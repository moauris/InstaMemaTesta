/** The InstaMema VisualViewport Handler handles the operations related to the current DOM's viewport. */
declare class VvpHandler {
    Height: number;
    Width: number;
    /**
     * Initializes a new VvpHandler instance
     * @param {VisualViewport | null} viewPort DOM VisualViewport
     */
    constructor(viewPort: VisualViewport | null);
    /**
     * Gets the number of grid or blocks can be placed horizontally
     * @returns {number} number of grids or blocks can be placed horizontally
     */
    xGrids(): number;
    /**
     * Get the number of grid or blocks can be placed vertically
     * @returns {number} number of grids or blocks can be placed vertically
     */
    yGrids(): number;
    /**
     * Get the total number of grids or blocks on the screen
     * @returns {number} total number of grids or blocks on the viewport
     */
    totalGrids(): number;
    /**
     * Prints the viewport dimension information, height x width, yGrid x xGrid
     * @returns {string} Information about the dimension.
     */
    printDimension(): string;
}
/** Prints the Vvp Dimension to the div id="sizeinfo"
 *
 */
declare function printVvpDimension(handler: VvpHandler): void;
declare const vvpHandler: VvpHandler;
