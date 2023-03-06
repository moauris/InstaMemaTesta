
function renderBlock(top: number, left: number)
{
    const div : HTMLDivElement = document.createElement("div");
    div.classList.add("TwSqaureBlock");
    div.style.top = top.toFixed() + "px";
    div.style.left = left.toFixed() + "px";
    document.getElementById("MainCanvas")!.appendChild(div);
}

function clearCanvas()
{
    var canvas : Element | null = document.querySelector("div#MainCanvas");
    if(canvas !== null)
        canvas.innerHTML = "";
}
function drawCanvus()
{
    for (let index = 0; index < vvpHandler.totalGrids(); index++) {
        const left = (index % vvpHandler.xGrids()) * 20;
        const top = ((index / vvpHandler.xGrids()) | 0) * 20;
        renderBlock(top, left);
        
    }
}

drawCanvus();

visualViewport?.addEventListener("resize", (e) =>
{
    console.log("resize filed in debug.js")
    clearCanvas();
    drawCanvus();
});

