let gridContainer = document.getElementById("grid-container");
let tiles

const DEFAULT_SETTINGS = {
  "gridSize": 32,
  "selectedTool": "brush",
  "backgroundColor": "#",
  "gridLinesEnabled": true
}

const SETTING_LIMITS = {
  "maxGridSize": 64,
  "minGridSize": 1
}

const TOOLS = {
  "brush": paint,
}

let settings = DEFAULT_SETTINGS;
let mouseDown = false;
let selectedColour = "#1b1b1b"
let currentTool = "brush"

function generateGrid() {
  let numCells = Math.pow(settings["gridSize"], 2);
  
  // Makes the cells square-y
  gridContainer.style.gridTemplateColumns = `repeat(${settings["gridSize"]}, 1fr)`

  for (let i = 0; i < numCells; i++) {
    let tile = document.createElement("div");
    tile.id = `tile${i}`;
    tile.classList.add("tile");
    gridContainer.appendChild(tile);
  }

  tiles = document.querySelectorAll(".tile");
}

function paint(tile) {
  tile.style.backgroundColor = selectedColour;
}

generateGrid()

tiles.forEach((tile) => {
  tile.addEventListener("mouseover", () => {
    if (mouseDown) {
      TOOLS[currentTool](tile)
    }
  })
})

document.addEventListener("mousedown", (e) => {
  mouseDown = true;
  TOOLS[currentTool](e.target)
})

document.addEventListener("mouseup", () => {
  mouseDown = false;
})