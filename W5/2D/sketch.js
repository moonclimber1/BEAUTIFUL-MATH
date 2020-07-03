// Parameters
const columns = 50;
var padding = 0.1;
var rounded = 0.1;
const fps = 10;

// Global Internal Variables
var rows = null;
var stepSize = null;
var pixelSize = null;
var grid = null;
var playing = false;


function setup() {
    const canvas = createCanvas(window.innerWidth, window.innerHeight);
    canvas.parent('canvas-wrapper');
    frameRate(fps)

    const svgButton = document.getElementById('play-pause');
    const startAnimation = document.getElementById('startAnimation');
    const reverseAnimation = document.getElementById('reverseAnimation');

    startAnimation.beginElement();
    
    svgButton.onclick = () =>{

        if(playing){
            startAnimation.beginElement();
        }else{
            reverseAnimation.beginElement();
        }
        playing = !playing;
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
    if(playing){
        nextGeneration();
        drawGrid();
    }
}

function nextGeneration(){
    const newGrid = createEmptyGrid(columns + 2, rows + 2);

    for(let r = 1; r < grid.length -1; r++){
        const row = grid[r];
        for(let c = 1; c < row.length-1; c++){
            const neigbours = getNeighboursCount(r,c);    
            
            if(grid[r][c]===0){ 
                // cell was dead

                if(neigbours === 3){
                    newGrid[r][c] = 1;
                }else{
                    newGrid[r][c] = 0;
                }

            }else{
                // cell was alive

                if(neigbours === 2 || neigbours === 3){
                    newGrid[r][c] = 1;
                }else{
                    newGrid[r][c] = 0;
                }
            }
        }
    }
    grid = newGrid;
}

function getNeighboursCount(r,c){
    return grid[r-1][c-1] + grid[r-1][c] + grid[r-1][c+1] 
        + grid[r][c-1] + grid[r][c+1] 
        + grid[r+1][c-1] + grid[r+1][c] + grid[r+1][c+1];
}


function drawGrid(){
    //console.log("Start Drawing");
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
    //console.log("Drawing Completed");
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

    if(index.row < rows && index.column < columns){

        grid[index.row+1][index.column+1] = 1;
        // For performance reasons it only redraws the changed pixel not the whole grid
        drawPixel(index.row, index.column, true)
        //drawGrid()
    }
       
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function letsSleep(ms){
    await sleep(2000);
}
