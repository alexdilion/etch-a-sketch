const DEFAULT_SETTINGS = {
    gridSize: 16,
    selectedTool: "brush",
    backgroundColor: "#ffffff",
    gridLinesEnabled: true,
    selectedColor: "#1b1b1b",
    selectedTool: "erase",
    maxGridSize: 50,
    minGridSize: 1,
    darkenAmount: 10
};

const RANDOM_COLORS = [
    "#ee657a",
    "#f6621f",
    "#fecc2f",
    "#db3838",
    "#b2c225",
    "#a363d9",
    "#40a4d8"
]

let tiles;
let gridContainer = document.getElementById("grid-container");
let rangeGridSize = document.getElementById("rangeGridSize");
let tbGridSize = document.getElementById("textGridSize");
let tbGridSizeMultiplier = document.querySelector(".textbox-wrapper div");
let chkToggleGridLines = document.getElementById("checkGridLines");
let btnClearGrid = document.getElementById("btnClearGrid");
let colorBackgroundColor = document.getElementById("colorBackgroundColor");
let btnErase = document.getElementById("btnErase");
let btnBrush = document.getElementById("btnBrush");
let btnRainbow = document.getElementById("btnRainbow");
let btnDarken = document.getElementById("btnDarken");
let colorSelectedColor = document.getElementById("colorSelectedColor");

let mouseDown = false;
let settings = DEFAULT_SETTINGS;

const TOOLS = {
    "brush": paint,
    "erase": erase,
    "rainbow": rainbow,
    "darken": darken
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
        tile.style.backgroundColor = settings.backgroundColor;

        if (settings.gridLinesEnabled) {
            tile.classList.add("grid-lines");
        }

        gridContainer.appendChild(tile);
    }

    tiles = document.querySelectorAll(".tile");

    tiles.forEach((tile) => {
        tile.addEventListener("mouseover", () => {
            if (mouseDown) {
                TOOLS[settings.selectedTool](tile);
            }
        });
    });
}

function paint(tile) {
    tile.style.backgroundColor = settings.selectedColor;
    tile.classList.remove("bg");
    tile.style.filter = ""
}

function erase(tile) {
    tile.style.backgroundColor = settings.backgroundColor;
    tile.classList.add("bg");
    tile.style.filter = ""
}

function darken(tile) {
    let filter = tile.style.filter;

    if (filter !== "") {
        let currentValue = +filter.substring(filter.indexOf("(") + 1, filter.indexOf("%"))

        tile.style.filter = `brightness(${currentValue - settings.darkenAmount}%)`;

        return
    }

    tile.style.filter = `brightness(${100 - settings.darkenAmount}%)`;
}

function rainbow(tile) {
    let color = randomFromArray(RANDOM_COLORS);

    tile.style.backgroundColor = color;
    tile.classList.remove("bg");
    tile.style.filter = "";
}

function changeBackgroundColor(newBgColor) {
    settings.backgroundColor = newBgColor;
    
    tiles.forEach(tile => {
        if (tile.classList.contains("bg")) {
            tile.style.backgroundColor = newBgColor;
        }
    })
}

function changeSelectedColor(color) {
    settings.selectedColor = color;
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

function randomFromArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

function clearGrid() {
    tiles.forEach((tile) => {
        erase(tile);
    })
}

function onMouseDown(mouse) {
    mouseDown = true;
    if (mouse.target.classList.contains("tile")) {
        TOOLS[settings.selectedTool](mouse.target);
    }
}

function onMouseUp(mouse) {
    mouseDown = false;
}

function changeTool(e) {
    let value = e.target.value.toLowerCase();
    settings.selectedTool = value;
}

generateGrid();

document.addEventListener("mousedown", onMouseDown);
document.addEventListener("mouseup", onMouseUp);
chkToggleGridLines.addEventListener("change", toggleGrid);
btnClearGrid.addEventListener("click", clearGrid);
btnBrush.addEventListener("click", changeTool);
btnErase.addEventListener("click", changeTool);
btnRainbow.addEventListener("click", changeTool)
btnDarken.addEventListener("click", changeTool)

colorBackgroundColor.addEventListener("input", (e) => {
    changeBackgroundColor(e.target.value);
});

colorSelectedColor.addEventListener("input", (e) => {
    changeSelectedColor(e.target.value);
})

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
