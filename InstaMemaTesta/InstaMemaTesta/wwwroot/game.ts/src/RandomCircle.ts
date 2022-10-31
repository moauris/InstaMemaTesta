
const canvas : Element | null = document.querySelector(".Canvas");


function CircleMain() : void
{
    if(canvas === null) 
    {
        console.log("canvas is null");
        return;
    }

    initPoints();
    refreshPix();

    gameView.Circles = 8;
    for(let p of gameView.GetPoints())
    {
        console.log("Drawing circle @ (" + p.X + ", " + p.Y + ")")
        setTimeout(() => drawCircle(p.X, p.Y), 500);
    }

}

function refreshPix() : void
{
    for(let x = 0; x < 80; x++)
    {
        for(let y = 0; y < 60; y++)
        {
            drawPoint(x, y, gameView.GetPoint(x, y));
        }
    }
}

function drawCircle(x : number, y : number) : void
{
    //r *= 2;
    gameView.fill2XRadiusCircleAt(new ScreenPoint(x, y))
    refreshPix();
}


function drawPoint(x : number, y : number, filled : boolean) : void
{
    const div = document.getElementById("PX" + x + "Y" + y);
    div?.classList.remove("WhiteZone");
    div?.classList.remove("RedZone");
    let zone = filled? "WhiteZone" : "RedZone";
    div?.classList.add(zone);
}

function initPoints(){

    for(let x = 0; x < gameView.width; x++)
    {
        for(let y = 0; y <gameView.height; y++)
        {
            let div = document.createElement("div");
            div.id = "PX" + x + "Y" + y;
            div.style.left = x + "0px";
            div.style.top = y + "0px";
            div.classList.add("ZoneBase");
            canvas!.appendChild(div);
        }
    }
}


function getRandom(lower : number, upper : number) : number{
    let rand = Math.random() * (upper - lower) + lower;

    return Math.floor(rand);
}

