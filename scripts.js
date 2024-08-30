const gridRows = document.createElement("div");
const buttons = document.querySelector("#buttons");
const changeGridSizeButton = document.querySelector("#changeGridSize");
const resetGridSizeButton = document.querySelector("#resetGridSize");
const gridSizeDisplay = document.querySelector("#gridSize");
const pixelate = e => e.target.classList.add("pixel");
const drawGrid = () => {
    gridRows.innerHTML = '';
    for (let i = 0; i < gridSize; i++) {
        const gridRow = document.createElement("div");

        for (let j = 0; j < gridSize; j++) {
            const gridItem = document.createElement("div");

            gridItem.setAttribute("class", "gridItem");
            gridItem.onmouseover = e => { if (isMouseDown) pixelate(e); };
            gridItem.onmousedown = e => pixelate(e);
            gridRow.append(gridItem);
        }

        gridRow.setAttribute("class", "gridRow");
        gridRows.append(gridRow);
        gridSizeDisplay.innerHTML = `${gridSize} &#10005; ${gridSize}`;
    }
}

let gridSize = 16;
let isMouseDown = false;

resetGridSizeButton.onclick = drawGrid;
changeGridSizeButton.onclick = () => {
    const message = "Select grid size"
    const error = "Invalid size! Enter value between 16 and 100 inclusive"

    gridSize = Number(prompt(message, ""));
    while (gridSize < 16 || gridSize > 100) {
        gridSize = Number(prompt(error))
    }

    drawGrid();
}
window.onmousedown = () => isMouseDown = true;
window.onmouseup = () => isMouseDown = false;
gridRows.setAttribute("id", "gridRows");
buttons.before(gridRows);

drawGrid();