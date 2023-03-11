const DEFAULT_SETTINGS = {
    gridSize: 16,
    selectedTool: "brush",
    backgroundColor: "#ffffff",
    gridLinesEnabled: true,
    selectedColor: "#1b1b1b",
    selectedTool: "brush",
    maxGridSize: 50,
    minGridSize: 1
};

let tiles;
let gridContainer = document.getElementById("grid-container");
let rangeGridSize = document.getElementById("rangeGridSize");
let tbGridSize = document.getElementById("textGridSize");
let tbGridSizeMultiplier = document.querySelector(".textbox-wrapper div");
let chkToggleGridLines = document.getElementById("checkGridLines");
let btnClearGrid = document.getElementById("btnClearGrid");
let colorBackgroundColor = document.getElementById("colorBackgroundColor");

let mouseDown = false;
let settings = DEFAULT_SETTINGS;
let selectedColor = settings.selectedColor;
let currentTool = settings.selectedTool;
let backgroundColor = settings.backgroundColor;

const TOOLS = {
    brush: paint,
    eraser: erase,
};

function generateGrid() {
    let numCells = Math.pow(settings.gridSize, 2);

    tiles = {};
    gridContainer.innerHTML = "";

    // Makes the cells square-y
    gridContainer.style.gridTemplateColumns = `repeat(${settings["gridSize"]}, 1fr)`;

    for (let i = 0; i < numCells; i++) {
        let tile = document.createElement("div");
        tile.id = `tile${i}`;
        tile.classList.add("tile");
        tile.classList.add("bg");

        // console.log(settings.backgroundColor);
        // tile.style.backgroundColor = settings.backgroundColor;

        if (settings.gridLinesEnabled) {
            tile.classList.add("grid-lines");
        }

        gridContainer.appendChild(tile);
    }

    tiles = document.querySelectorAll(".tile");

    tiles.forEach((tile) => {
        tile.addEventListener("mouseover", () => {
            if (mouseDown) {
                TOOLS[currentTool](tile);
            }
        });
    });
}

function paint(tile) {
    tile.style.backgroundColor = selectedColor;
    tile.classList.remove("bg");
}

function erase(tile) {
    tile.style.backgroundColor = settings.backgroundColor;
    tile.classList.add("bg");
}

function changeBackgroundColor(newBgColor) {
    console.log("Working");
    settings.backgroundColor = newBgColor;
    
    tiles.forEach(tile => {
        if (tile.classList.contains("bg")) {
            tile.style.backgroundColor = newBgColor;
        }
    })
}

function toggleGrid() {
    settings.gridLinesEnabled = !settings.gridLinesEnabled;

    if (settings.gridLinesEnabled) {
        tiles.forEach((tile) => {
            tile.classList.add("grid-lines");
        });
    } else {
        tiles.forEach((tile) => {
            tile.classList.remove("grid-lines");
        });
    }
}

function clearGrid() {
    tiles.forEach((tile) => {
        erase(tile);
    })
}

function onMouseDown(mouse) {
    mouseDown = true;
    if (mouse.target.classList.contains("tile")) {
        TOOLS[currentTool](mouse.target);
    }
}

function onMouseUp(mouse) {
    mouseDown = false;
}

generateGrid();

document.addEventListener("mousedown", onMouseDown);
document.addEventListener("mouseup", onMouseUp);
chkToggleGridLines.addEventListener("change", toggleGrid);
btnClearGrid.addEventListener("click", clearGrid);
colorBackgroundColor.addEventListener("input", (e) => {
    changeBackgroundColor(e.target.value);
});

rangeGridSize.addEventListener("change", () => {
    let newGridSize = +rangeGridSize.value;
    tbGridSize.value = newGridSize;
    tbGridSizeMultiplier.textContent = "X " + newGridSize;

    settings.gridSize = newGridSize;

    generateGrid(newGridSize)
})

tbGridSize.addEventListener("change", () => {
    if (Number(tbGridSize.value) !== Number.NaN) {
        let newGridSize = +tbGridSize.value
        if (newGridSize >= settings.minGridSize && newGridSize <= settings.maxGridSize) {
            rangeGridSize.value = newGridSize;
            tbGridSizeMultiplier.textContent = "X " + newGridSize;

            settings.gridSize = newGridSize;

            generateGrid()
        }
    } 
})