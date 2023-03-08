const DEBUG : boolean = false;


const MainCanvas : HTMLDivElement | null = document.querySelector("#MainCanvas");
const CountDown : HTMLDivElement | null = document.querySelector("#CountDown");
const ShowNumberPage : HTMLDivElement | null = document.querySelector("#ShowNumberPage");
const ScorePage : HTMLDivElement | null = document.querySelector("#ScorePage");
const SettingPage : HTMLDivElement | null = document.querySelector("#SettingPage");


function TogglePageActive(div : HTMLDivElement | null)
{
    if(div === null ) throw Error("The html element is null");
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

var vvpHandler : VvpHandler = new VvpHandler(visualViewport);
var game = new ImtGame(gameSetting, vvpHandler);
function GameStart()
{
    game.currentRound = 1;
    game.StartRound(MainCanvas);
}
function ReturnToMenuClicked()
{
    game.currentRound = 1;
    TogglePageActive(ScorePage);
    TogglePageActive(MainCanvas);
}
function RestartGameClicked()
{
    game.currentRound = 1;
    game.StartRound(ScorePage);
}

function ShowSettingPage()
{
    TogglePageActive(MainCanvas);
    TogglePageActive(SettingPage);

}

function ShowReadMe()
{
    throw new Error("ShowReadMe(): NotImplemented");
}

function expandOptionClicked(divOption : HTMLDivElement)
{
    var OptionsSelected : HTMLDivElement | null = document.querySelector("div.Options.Selected");
    while(OptionsSelected !== null)
    {
        OptionsSelected.classList.remove("Selected");
        OptionsSelected = document.querySelector("div.Options.Selected");
    }

    divOption.classList.add("Selected");
}

function optAdjustClicked(choice : HTMLElement)
{
    var opt : string = choice.id;
    switch (opt) {
        case "diff_inc":
                game.setting.StartDifficulty += 1;
            break;
        case "diff_dec":
                game.setting.StartDifficulty -= 1;
            break;
        case "round_inc":
            game.setting.MaxRound += 1;
        break;
        case "round_dec":
            game.setting.MaxRound -= 1;
        break;
        case "numset1":
            game.setting.NumberSet = NumberSets.Full;
        break;
        case "numset2":
            game.setting.NumberSet = NumberSets.Circles;
        break;
        default:
            break;
    }
    
}
var holdOptIntervalId = 0;
function optAdjustHeld(choice : HTMLElement)
{
    var opt : string = choice.id;
    var callback : Function | null = null;
    switch (opt) {
        case "diff_inc":
            callback = () => game.setting.StartDifficulty += 1;
            break;
        case "diff_dec":
            callback = () => game.setting.StartDifficulty -= 1;
            break;
        case "round_inc":
            callback = () => game.setting.MaxRound += 1;
        break;
        case "round_dec":
            callback = () => game.setting.MaxRound -= 1;
        break;
        default:
            break;
    }
    if(callback !== null)
    holdOptIntervalId = setInterval(callback, 100);

}

function optAdjustRelease()
{
    clearInterval(holdOptIntervalId);
}

function exitSetting() 
{
    TogglePageActive(SettingPage);
    TogglePageActive(MainCanvas);
}