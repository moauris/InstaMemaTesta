"use strict";
/** Represents one Insta Mema Testa Game Session
 * @param {ImtGameSetting} setting The Current Game Setting
 *
*/
class ImtGame {
    constructor(s, vp) {
        this.GuessNumbers = [];
        /** The current score
         * difficulty : score value
         * 4 : 2pt
         * 5 : 4pt
         * 6 : 8pt
         * 7 : 16pt
         * 8 : 32pt
         * 9 : 64pt
         * 10 : 126pts
         */
        this.currentScore = 0;
        this.Expects = [];
        this.setting = s;
        this.currentRound = 1;
        this.difficulty = 4;
        this.viewPortHandler = vp;
    }
    resetGuessNum(classTag) {
        var gN = document.querySelector("div.NumericBase." + classTag);
        while (gN !== null) {
            gN.classList.remove(classTag);
            gN = document.querySelector("div.NumericBase." + classTag);
        }
    }
    resetProgress() {
        var pb = document.querySelectorAll("li.HealthPoint.Filled");
        for (var i = 0; i < pb.length; i++) {
            pb[i].classList.remove("Filled");
        }
    }
    setProgress(n) {
        var pb = document.querySelector("li.HealthPoint:nth-child(" + n + ")");
        if (pb === null)
            return;
        pb.classList.add("Filled");
    }
    /** Starts a round of game on supplied grids object
     * @param {HTMLDivElement | null} from Optional. Which page did we started the game. Default is ShowNumberPage.
    */
    StartRound(from = ShowNumberPage) {
        //Check if score board should be shown instead
        if (this.setting.MaxRound < this.currentRound) {
            this.ShowScoreboard();
            return;
        }
        //start the game
        if (this.currentRound === 1) {
            //special handling for 1st round
            this.resetProgress();
            this.difficulty = this.setting.StartDifficulty;
            //Create ul li.HealthPoint
            var ul = document.createElement("ul");
            for (var i = 0; i < this.setting.MaxRound; i++) {
                var li = document.createElement("li");
                li.classList.add("HealthPoint");
                ul.appendChild(li);
            }
            var HealthBar = document.querySelector("div#HealthBar");
            if (HealthBar === null) {
                throw new Error("div#HealthBar not found");
            }
            HealthBar.innerHTML = "";
            HealthBar.appendChild(ul);
        }
        TogglePageActive(from);
        TogglePageActive(CountDown);
        setTimeout(() => {
            TogglePageActive(CountDown);
            TogglePageActive(ShowNumberPage);
        }, 3000);
        this.setProgress(this.currentRound);
        this.currentRound++;
        // Set all NumericBase to nothing
        var classTags = ["Guess", "Wrong", "Chosen", "Correct"];
        for (var i = 0; i < classTags.length; i++) {
            this.resetGuessNum(classTags[i]);
        }
        //Get the numbers to display.
        if (DEBUG)
            console.log("GameStarted with difficulty:" + this.difficulty);
        var nums = Draw(this.difficulty, this.setting.NumberSet);
        this.viewPortHandler.resetGrids();
        //Below procedure selects the grids where the circles are placed in the center
        var coords = this.getCoordinates(this.viewPortHandler.Grids);
        if (DEBUG) {
            this.viewPortHandler.clearGrids();
            this.viewPortHandler.fillGrids();
        }
        if (nums.length !== coords.length) {
            throw new Error("The number of draws mismatch grids available: num, grid = (" + nums.length + ", " + coords.length + ")");
        }
        var len = nums.length;
        for (var i = 0; i < len; i++) {
            this.Expects[i] = nums[i];
            this.ShowNumber(nums[i], coords[i]);
        }
        setTimeout(() => {
            for (var i = 0; i < len; i++) {
                this.HideNumber(nums[i]);
            }
        }, 4000);
    }
    HideNumber(num) {
        var gN = document.querySelector("div#guessNumber_" + num);
        if (gN === null) {
            throw new Error("#guessNumber_" + num + " cannot be found.");
        }
        gN.classList.remove("Show");
        gN.classList.add("Guess");
        //TODO: IMPROVE the event listener code
        gN.onclick = () => this.Answered(num);
    }
    Answered(num) {
        var gN = document.querySelector("div#guessNumber_" + num);
        if (gN === null) {
            throw new Error("#guessNumber_" + num + " cannot be found.");
        }
        var Ans = this.Expects.pop();
        if (Ans === num) {
            gN.classList.remove("Guess");
            gN.classList.add("Chosen");
            if (this.Expects.length == 0) {
                this.CorrectNumbers();
            }
        }
        else {
            this.WrongNumbers();
        }
    }
    ShowScoreboard() {
        TogglePageActive(ShowNumberPage);
        TogglePageActive(ScorePage);
        var score = document.querySelector("h1#ScoreBoard");
        if (score === null)
            return;
        score.textContent = "" + this.currentScore;
    }
    scored() {
        return 2 ** (this.difficulty - 3);
    }
    //**A correct number is chosen. start the next round if possible */
    CorrectNumbers() {
        var gN = document.querySelector("div.NumericBase.Chosen");
        while (gN !== null) {
            gN.classList.remove("Chosen");
            gN.classList.add("Correct");
            gN = document.querySelector("div.NumericBase.Chosen");
        }
        this.difficulty = this.difficulty + 1 > 10 ? 10 : this.difficulty + 1;
        this.currentScore += this.scored();
        setTimeout(() => {
            this.StartRound();
        }, 1000);
    }
    //**A wrong number is chosen. Mark all remaining guess items wrong and start the next round if possible */
    WrongNumbers() {
        var gN = document.querySelector("div.NumericBase.Guess");
        while (gN !== null) {
            gN.classList.remove("Guess");
            gN.classList.add("Wrong");
            gN = document.querySelector("div.NumericBase.Guess");
        }
        this.difficulty = this.difficulty - 1 < 4 ? 4 : this.difficulty - 1;
        setTimeout(() => {
            this.StartRound();
        }, 1000);
    }
    /**Show a number on a location on the viewport depending on the number supplied and grid coordinate
     * @param {number} num A number between 0 and 9.
     * @param {gridCoordinate} center Determines where to put the number div.
    */
    ShowNumber(num, center) {
        var gN = document.querySelector("div#guessNumber_" + num);
        if (gN === null) {
            throw new Error("#guessNumber_" + num + " cannot be found.");
        }
        gN.classList.add("Show");
        gN.style.top = center.Y * this.setting.PixelsPerGrid - 60 + "px";
        gN.style.left = center.X * this.setting.PixelsPerGrid - 60 + "px";
    }
    getCoordinates(grids) {
        var coords = [];
        for (var i = 0; i < this.difficulty; i++) {
            var range = this.CountGrid(grids);
            //This would mean the current grid doesn't have any grid to place the circle
            //In which case return doing nothing.
            if (range < 0)
                break;
            //There are somewhere to place grid, continue
            //roll a number to decide which grid
            var draw = GetRandom(0, range);
            var coord = this.drawGrid(grids, draw);
            if (coord !== null)
                coords.push(coord);
        }
        return coords;
    }
    trySetGrid(grid, x, y, setAs) {
        if (x < 0 || x >= grid.length)
            return;
        if (y < 0 || y >= grid[0].length)
            return;
        grid[x][y] = setAs;
    }
    /** Draw n-th grid from grids
     * @param {boolean[][]} grids The grids to draw from.
     * @param {number} draw nth grid
     * @returns {gridCoordinate | null} The coordinate drawn
    */
    drawGrid(grids, draw) {
        for (var x = 0; x < grids.length; x++) {
            for (var y = 0; y < grids[0].length; y++) {
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
    markCircle(xy, grid, radius = 3) {
        radius *= 2;
        grid[xy.X][xy.Y] = false;
        for (var i = 1; i <= radius; i++) {
            for (var j = 1; j <= radius; j++) {
                if ((i ** 2) + (j ** 2) < radius ** 2) {
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
    CountGrid(grids) {
        var count = 0;
        for (var x = 0; x < grids.length; x++) {
            for (var y = 0; y < grids[0].length; y++) {
                if (grids[x][y]) {
                    count++;
                }
            }
        }
        return count;
    }
}
/** Represents a grid coordinate with X and Y */
class gridCoordinate {
    constructor(x, y) {
        this.X = x;
        this.Y = y;
    }
}
