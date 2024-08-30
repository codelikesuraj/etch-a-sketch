const gridRows = document.createElement("div");
const buttons = document.querySelector("#buttons");
const changeGridSizeButton = document.querySelector("#changeGridSize");
const resetGridSizeButton = document.querySelector("#resetGridSize");
const gridSizeDisplay = document.querySelector("#gridSize");
const randomRGBValue = () => Math.floor(Math.random() * 256) + 1;
const pixelate = e => e.target.style.backgroundColor = `rgb(${randomRGBValue()}, ${randomRGBValue()}, ${randomRGBValue()})`;
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

    let newGridSize = prompt(message);
    if (newGridSize === null) {
        return
    }

    while (Number(newGridSize) < 16 || Number(newGridSize) > 100) {
        newGridSize = prompt(error)
        if (newGridSize == null) {
            return
        }
    }

    gridSize = Number(newGridSize)
    drawGrid();
}
window.onmousedown = () => isMouseDown = true;
window.onmouseup = () => isMouseDown = false;
gridRows.setAttribute("id", "gridRows");
buttons.before(gridRows);

drawGrid();