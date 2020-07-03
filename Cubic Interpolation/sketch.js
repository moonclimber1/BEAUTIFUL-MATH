


function setup() {
    createCanvas(600, 600);
    background(220);
    
    //const func1 = createRandomPointsArray(100, 128);

    const func1 = [createVector(50, -100), createVector(100, -150), createVector(150, -200), createVector(200, -150), createVector(250, -100)]

    let lastY = 0;


    for(let point of func1){
        ellipse(point.x, width/2 + point.y, 10)
    }

    for(let x = 0; x<width; x++){
        y = width/2 + getVal(x, func1);
        line(x-1, lastY, x, y);
        lastY = y;
    }


}


// returns an Points Array with the key points of the function
// in order to get the values in between function getVal has to be used

function createRandomPointsArray(stepWidth, amplitude){
    const array = [];
    for(let x = 100; x<width; x+=stepWidth){
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
    //return cosineInterpolate(pointsArray[low].y, pointsArray[high].y, inter);

    const v0 = pointsArray[low-1] ? pointsArray[low-1].y : pointsArray[low].y;
    const v1 = pointsArray[low].y;
    const v2 = pointsArray[high].y;
    const v3 = pointsArray[high+1] ? pointsArray[high+1].y : pointsArray[high].y;
    

    return cubicInterpolate(v0, v1, v2, v3, inter);
}

function linearInterpolate(a, b, inter){
    return a * (1-inter) + b * inter;
}

function cosineInterpolate(a, b, inter){
    const f = (1 - cos(PI * inter)) * 0.5;
    return a * (1-f) + b * f;
}

function cubicInterpolate(v0, v1, v2, v3, inter){
    const p = (v3- v2) - (v0 - v1)
    const q = (v0 - v1) - p
    const r = v2 - v0
    const s = v1
    
    return p * Math.pow(inter,3) + q * Math.pow(inter,2) + r * inter + s;
}

