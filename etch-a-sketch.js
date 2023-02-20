let gridContainer = document.getElementById("grid-container");

const defaultSettings = {
  "gridSize": 16,
  "selectedTool": "pencil",
  "backgroundColor": "#",
  "gridLinesEnabled": true
}

const settingLimits = {
  "maxGridSize": 64,
  "minGridSize": 1
}

const states = [
  "pencil",
  "brush",
  "erase",
  "fill",
  "line", 
  "shape"
]

let settings = defaultSettings;

function generateGrid() {
  let numCells = Math.pow(settings["gridSize"], 2);
  
  // Makes the cells square-y
  gridContainer.style.gridTemplateColumns = `repeat(${settings["gridSize"]}, 1fr)`

  for (let i = 0; i < numCells; i++) {
    let cell = document.createElement("div");
    cell.id = `cell${i}`;
    cell.classList.add("cell");
    gridContainer.appendChild(cell);
  }
}

generateGrid()