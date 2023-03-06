const DEBUG : boolean = true;


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
gameSetting.NumberSet = NumberSets.Full;
gameSetting.PositionSet = PositionSets.Everywhere;

var game = new ImtGame(gameSetting);

game.difficulty = 9;

var vvpHandler : VvpHandler = new VvpHandler(visualViewport);

var grids = vvpHandler.Grids();

function FillGrids(grids : boolean[][])
{
    var x : number = grids.length;
    var y : number = grids[0].length;
    for(var i = 0; i < x; i++)
    {
        for(var j = 0; j < y; j++)
        {
            var grid : HTMLDivElement = document.createElement("div");
            grid.style.top = j * 20 + "px";
            grid.style.left = i * 20 + "px";
            grid.style.width = "20px";
            grid.style.height = "20px";
            grid.style.backgroundColor = grids[i][j] ? "Blue" : "Red";
            grid.style.borderRadius = "50%";
            grid.style.position = "fixed";
            ShowNumberPage?.appendChild(grid);
        }
    }
}

function GameStart()
{
    TogglePageActive(MainCanvas);
    TogglePageActive(CountDown);
    setTimeout(() => 
    {
        TogglePageActive(CountDown);
        TogglePageActive(ShowNumberPage);
        vvpHandler.setDeadZone();
        game.StartRound(grids);
        if(DEBUG) FillGrids(grids);
    }, 3000);

}

