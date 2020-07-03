const columns = 100;
var rule = 0;
var ruleCounter = 0;


var stepSize = null;
var diameter = null;
var ruleArray = null;
var font = null;

function preload(){
    font = loadFont('Monoton-Regular.ttf');
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

    frameRate(10)
}

function draw(){
    


    rule = ruleCounter % 256;
    ruleArray = convertToBinaryArray(rule);
    
    ruleCounter++;
    clear();
    drawAutomata();

    textFont(font);
    textSize(140);
    fill('rgb(255, 255, 255)')
    textAlign(CENTER, CENTER)

    text(rule, width/2 ,height/2)
}


function drawAutomata(){
    stepSize = width / (columns)
    diameter = 0.9 * stepSize;

    // Calculate Cellular Automata
    console.log("Calculate Cellular Automata");
    
    const rows = height / stepSize;
    let automata = []
    automata.push(getFirstRow());

    for(let i = 0; i < rows; i++){
        const lastRow = automata[automata.length - 1];
        const nextRow = [];

        for(let k = 1; k < columns + 1; k++){
            const binarayString = lastRow[k-1].toString() + lastRow[k].toString() + lastRow[k+1].toString();
            nextRow.push(nextCell(binarayString));
        }
        
        automata.push([0, ...nextRow, 0]);
    }


    // Drawing
    console.log("Drawing")

    const c0 = color(20);

    const c1 = color(34,193,195)
    const c2 = color(253,187,45)



    noStroke()
    for(let i = 0; i < automata.length; i++){
        const y = i*stepSize + stepSize/2;

        for(let k = 1; k <= columns; k++){
            
            const x = (k-1)*stepSize + stepSize/2;
            
            if(automata[i][k] === 0){
                fill(c0)
            }else{
                fill(lerpColor(c1, c2, (i/automata.length + k/columns))) // + Math.random()*rows*0.2)
            }
            circle(x, y, diameter)
        }

    }
    
    console.log("Completed")
}


function getFirstRow(){
    const array = [];
    for(let i = 0; i < columns + 2; i++){
        array.push(0)
    }
    const middle = Math.floor(columns/2);
    array[middle] = 1;
    return array;
}

function getRandomFirstRow(){
    const array = [];
    for(let i = 0; i < columns + 2; i++){
        array.push(Math.round(Math.random()))
    }
    return array;
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


