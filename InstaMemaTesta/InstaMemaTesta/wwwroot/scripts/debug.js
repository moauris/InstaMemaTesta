"use strict";
function renderBlock(top, left) {
    const div = document.createElement("div");
    div.classList.add("TwSqaureBlock");
    div.style.top = top.toFixed() + "px";
    div.style.left = left.toFixed() + "px";
    document.getElementById("MainCanvas").appendChild(div);
}
function clearCanvas() {
    var canvas = document.querySelector("div#MainCanvas");
    if (canvas !== null)
        canvas.innerHTML = "";
}
function drawCanvus() {
    for (let index = 0; index < vvpHandler.totalGrids(); index++) {
        const left = (index % vvpHandler.xGrids()) * 20;
        const top = ((index / vvpHandler.xGrids()) | 0) * 20;
        renderBlock(top, left);
    }
}
drawCanvus();
visualViewport === null || visualViewport === void 0 ? void 0 : visualViewport.addEventListener("resize", (e) => {
    console.log("resize filed in debug.js");
    clearCanvas();
    drawCanvus();
});
