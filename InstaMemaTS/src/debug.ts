var totalGrid : number = vvpHandler.totalGrids();
var xGrid : number = vvpHandler.xGrids();
var yGrid : number = vvpHandler.yGrids();

function drawBlock(top: number, left: number)
{
    const div : HTMLDivElement = document.createElement("div");
    div.classList.add("TwSqaureBlock");
    div.style.top = top.toFixed() + "px";
    div.style.left = left.toFixed() + "px";
    document.getElementById("MainCanvus")!.appendChild(div);
}

for (let index = 0; index < totalGrid; index++) {
    const left = (index % xGrid) * 20;
    const top = ((index / xGrid) | 0) * 20;
    drawBlock(top, left);
    
}

