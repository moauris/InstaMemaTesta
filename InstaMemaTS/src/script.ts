const DEBUG : boolean = false;


const MainCanvas : HTMLDivElement | null = document.querySelector("#MainCanvas");
const CountDown : HTMLDivElement | null = document.querySelector("#CountDown");
const ShowNumberPage : HTMLDivElement | null = document.querySelector("#ShowNumberPage");


function TogglePageActive(div : HTMLDivElement | null)
{
    if(div === null ) return;
    if(div.classList.contains("PageActivated"))
    {
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

var vvpHandler : VvpHandler = new VvpHandler(visualViewport);

var game = new ImtGame(gameSetting, vvpHandler);

game.difficulty = 4;


function FillGrids()
{
    var x : number = vvpHandler.Grids.length;
    var y : number = vvpHandler.Grids[0].length;
    for(var i = 0; i < x; i++)
    {
        for(var j = 0; j < y; j++)
        {
            var grid : HTMLDivElement = document.createElement("div");
            grid.style.top = j * 20 + "px";
            grid.style.left = i * 20 + "px";
            grid.style.width = "20px";
            grid.style.height = "20px";
            grid.style.backgroundColor = vvpHandler.Grids[i][j] ? "Blue" : "Red";
            grid.style.borderRadius = "50%";
            grid.style.position = "fixed";
            ShowNumberPage?.appendChild(grid);
        }
    }
}

function GameStart()
{
    setTimeout(() => 
    {
        game.StartRound();
        if(DEBUG) FillGrids();
    }, 1500);

}

