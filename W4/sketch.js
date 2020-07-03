
const octaves = 4;
const falloff = .3;
const maxAmplitude = 32;
const maxStepWidth = 64;


function setup() {
    createCanvas(600, 600);
    background(220);

    const functions = [];

    for(let i = 0; i < octaves; i++){
        const amplitude = maxAmplitude * pow(falloff, i);
        const stepWidth = maxStepWidth / (pow(2,i));
        func = createRandomPointsArray(stepWidth, amplitude);
        functions.push(func);
    }

    let lastY = 0;
    
    for(let x = 0; x<width; x++){
        let y = width/2;
        for (let func of functions){
            y += getVal(x, func)
        }
        line(x-1, lastY, x, y);
        lastY = y;
    }
    
    // const func1 = createRandomPointsArray(32, 64);
    // const func2 = createRandomPointsArray(16, 32);
    // const func3 = createRandomPointsArray(8, 16);
    // const func4 = createRandomPointsArray(4, 8);

    // let lastY = 0;
    
    // for(let x = 0; x<width; x++){
    //     y = width/2 + getVal(x, func1) + getVal(x, func2) + getVal(x, func3) + getVal(x, func4);
    //     line(x-1, lastY, x, y);
    //     lastY = y;
    // }
}


// returns an Points Array with the key points of the function
// in order to get the values in between function getVal has to be used

function createRandomPointsArray(stepWidth, amplitude){
    const array = [];
    for(let x = 0; x<(width+stepWidth); x+=stepWidth){
        let pt = createVector(x, random(-amplitude,amplitude));
        array.push(pt);
    }
    return array;
}


// returns the actual value on any point of the random points array
// performs Binary search to find either the value of x or use the nearest two indices around x for interpolation

function getVal(x, pointsArray){

    // Edge Cases
    if(x < pointsArray[0].x) return undefined;
    if(x > pointsArray[pointsArray.length-1].x) return undefined;

    let low = 0;
    let high = pointsArray.length - 1;

    while (high - low > 1){
        let mid = Math.floor((high + low) / 2);

        if (x < pointsArray[mid].x) {
            high = mid;
        } else if (x > pointsArray[mid].x) {
            low = mid;
        }else{
            // x equals x value of mid -> return y value of mid
            return pointsArray[mid].y;
        }
    }
    
    // if loop has not returned the value do interpolation 

    // calculate value between 0 and 1
    const inter = (x - pointsArray[low].x)/(pointsArray[high].x - pointsArray[low].x);
    
    //return linearInterpolate(pointsArray[low].y, pointsArray[high].y, inter);
    return cosineInterpolate(pointsArray[low].y, pointsArray[high].y, inter);
}

function linearInterpolate(a, b, inter){
    return a * (1-inter) + b * inter;
}

function cosineInterpolate(a, b, inter){
    const f = (1 - cos(PI * inter)) * 0.5;
    return a * (1-f) + b * f;
}

