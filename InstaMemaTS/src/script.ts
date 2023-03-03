
const MainCanvas : HTMLDivElement | null = document.querySelector("#MainCanvas");
const CountDown : HTMLDivElement | null = document.querySelector("#CountDown");


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

function GameStart()
{
    TogglePageActive(MainCanvas);
    TogglePageActive(CountDown);
}