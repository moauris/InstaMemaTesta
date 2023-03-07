"use strict";
const DEBUG = false;
const MainCanvas = document.querySelector("#MainCanvas");
const CountDown = document.querySelector("#CountDown");
const ShowNumberPage = document.querySelector("#ShowNumberPage");
const ScorePage = document.querySelector("#ScorePage");
function TogglePageActive(div) {
    if (div === null)
        throw Error("The html element is null");
    if (div.classList.contains("PageActivated")) {
        div.classList.remove("PageActivated");
        div.classList.add("PageDeactivated");
    }
    else if (div.classList.contains("PageDeactivated")) {
        div.classList.remove("PageDeactivated");
        div.classList.add("PageActivated");
    }
}
var gameSetting = new ImtGameSetting();
gameSetting.MaxRound = 10;
gameSetting.NumberSet = NumberSets.Circles;
gameSetting.PositionSet = PositionSets.Everywhere;
var vvpHandler = new VvpHandler(visualViewport);
var game = new ImtGame(gameSetting, vvpHandler);
function FillGrids() {
    var x = vvpHandler.Grids.length;
    var y = vvpHandler.Grids[0].length;
    for (var i = 0; i < x; i++) {
        for (var j = 0; j < y; j++) {
            var grid = document.createElement("div");
            grid.style.top = j * 20 + "px";
            grid.style.left = i * 20 + "px";
            grid.style.width = "20px";
            grid.style.height = "20px";
            grid.style.backgroundColor = vvpHandler.Grids[i][j] ? "Blue" : "Red";
            grid.style.borderRadius = "50%";
            grid.style.position = "fixed";
            ShowNumberPage === null || ShowNumberPage === void 0 ? void 0 : ShowNumberPage.appendChild(grid);
        }
    }
}
function GameStart() {
    game.currentRound = 1;
    game.difficulty = 4;
    game.StartRound(MainCanvas);
    if (DEBUG)
        FillGrids();
}
function restartGameClicked() {
    game.difficulty = 4;
    game.currentRound = 1;
    game.StartRound(ScorePage);
}
