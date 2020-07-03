// Parameters
var columns = 30;
var padding = 0.1;
var rounded = 0.1;

// Global Internal Variables
var rows = null;
var stepSize = null;
var pixelSize = null;
var grid = null;
var playing = false;

var svgButton = null;

function setup() {
    const canvas = createCanvas(window.innerWidth, window.innerHeight);
    canvas.parent('canvas-wrapper');

    svgButton = document.getElementById('play-pause');
    svgButton.onclick = (e) => {
        e.stopPropagation();
    }

    // Initialize Constants
    stepSize = width / columns;
    rounded = stepSize * rounded;
    padding = stepSize * padding;
    pixelSize = stepSize - padding;
    
    rows = Math.floor(height / stepSize)
    grid = createEmptyGrid(columns + 2, rows + 2)
    drawGrid();


}


function draw(){

}


function drawGrid(){
    console.log("Start Drawing");
    for(let r = 0; r < grid.length-2; r++){
        const row = grid[r];
        
        for(let c = 0; c < row.length-2; c++){

            if(grid[r+1][c+1] === 0){
                drawPixel(r, c, false)
            }else{
                drawPixel(r, c, true)
            }
        }
    }
    console.log("Drawing Completed");
}

function drawPixel(row, column, filled){

    const c0 = color(20);
    const c1 = color(252,70,116)
    const c2 = color(63,94,251)

    if(filled){
        fill(lerpColor(c1, c2, ((row)/rows + (column)/columns)/2))
    }else{
        fill(c0)
    }

    const pos = getCellCoordinates(row,column)
    rect(pos.x, pos.y, pixelSize, pixelSize, rounded);
}

function getCellCoordinates(row, column){

    const x = stepSize * column + padding/2;
    const y = stepSize * row + padding/2;

    return createVector(x, y)
}

function getCellIndex(x, y){

    row = Math.floor(y / stepSize)
    column = Math.floor(x / stepSize)

    return {row: row, column: column};

}



function createEmptyGrid(columns, rows){
    const grid = []
    for(let i = 0; i < rows; i++){
        const row = []
        for(let k = 0; k < columns; k++){
            row.push(0)
        }
        grid.push(row)
    }
    return grid;
}

function mousePressed() {
    drawOnMousePosition();
}

function mouseDragged(){
    drawOnMousePosition();
}

function drawOnMousePosition(){
    const index = getCellIndex(mouseX, mouseY)
    grid[index.row+1][index.column+1] = 1;

    // For performance reasons it only redraws the changed pixel not the whole grid
    drawPixel(index.row, index.column, true)
    //drawGrid()
}

function convertToBinaryArray(rule){
    return rule.toString(2)
        .padStart(8, '0')
        .split("")
        .map(t => {return parseInt(t)})
        .reverse();
}


// Applys rule for a given binaryString 
// binaryString for example "011"
function nextCell(binaryString){
    const index = parseInt(binaryString, 2);
    const value = ruleArray[index];
    return value;
}


