"use strict";
/** The InstaMema VisualViewport Handler handles the operations related to the current DOM's viewport. */
class VvpHandler {
    /**
     * Initializes a new VvpHandler instance
     * @param {VisualViewport | null} viewPort DOM VisualViewport
     */
    constructor(viewPort) {
        /** Uniform radius of the number circles*/
        this.Radius = 3;
        this.Height = viewPort.height | 0;
        this.Width = viewPort.width | 0;
        this.Ppg = 20;
        if (DEBUG)
            console.log("ctor::VvpHandler: There are " + this.totalGrids() + "under current viewport.");
        this.Grids = this.createGrids();
        this.setDeadZone();
    }
    /**
     * Gets the number of grid or blocks can be placed horizontally
     * @returns {number} number of grids or blocks can be placed horizontally
     */
    xGrids() {
        return (this.Width / this.Ppg) | 0;
    }
    /**
     * Get the number of grid or blocks can be placed vertically
     * @returns {number} number of grids or blocks can be placed vertically
     */
    yGrids() {
        return (this.Height / this.Ppg) | 0;
    }
    /**
     * Get the total number of grids or blocks on the screen
     * @returns {number} total number of grids or blocks on the viewport
     */
    totalGrids() {
        return this.xGrids() * this.yGrids();
    }
    resetGrids() {
        this.Grids = this.createGrids();
        this.setDeadZone();
    }
    createGrids() {
        var x = this.xGrids();
        var y = this.yGrids();
        var result = new Array(x);
        var id = 0;
        for (var i = 0; i < x; i++) {
            result[i] = new Array(y);
            result[i].fill(false);
        }
        return result;
    }
    /**
     * Prints the viewport dimension information, height x width, yGrid x xGrid
     * @returns {string} Information about the dimension.
     */
    printDimension() {
        var out = this.Height.toFixed() + "x" + this.Width.toFixed();
        var out1 = this.yGrids() + "x" + this.xGrids() + "=" + this.totalGrids();
        return out + ", " + out1;
    }
    /** Set a deadzone by the edge by 1 circle radius */
    setDeadZone() {
        for (var x = this.Radius; x < this.xGrids() - this.Radius; x++) {
            for (var y = this.Radius + 2; y < this.yGrids() - this.Radius; y++) {
                this.Grids[x][y] = true;
            }
        }
    }
    fillGrids() {
        var x = this.Grids.length;
        var y = this.Grids[0].length;
        for (var i = 0; i < x; i++) {
            for (var j = 0; j < y; j++) {
                var grid = document.createElement("div");
                grid.style.top = j * this.Ppg + "px";
                grid.style.left = i * this.Ppg + "px";
                grid.style.width = this.Ppg + "px";
                grid.style.height = this.Ppg + "px";
                grid.style.backgroundColor = this.Grids[i][j] ? "Blue" : "Red";
                grid.style.borderRadius = "50%";
                grid.style.position = "fixed";
                grid.classList.add("debugGridDots");
                ShowNumberPage === null || ShowNumberPage === void 0 ? void 0 : ShowNumberPage.appendChild(grid);
            }
        }
    }
    clearGrids() {
        var grids = document.querySelectorAll("div.debugGridDots");
        if (grids === null)
            return;
        for (var i = 0; i < grids.length; i++) {
            ShowNumberPage === null || ShowNumberPage === void 0 ? void 0 : ShowNumberPage.removeChild(grids[i]);
        }
    }
}
