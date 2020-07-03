var circularNoise = null
var c = null


function preload(){
    c = {
      background: color(0),
      colorA: color('#fc4674'),
      colorB: color('#0c2fb3')
    }
}

function setup() {
    createCanvas(2000, 2000);
    background(240);
    circularNoise = new CircularNoise(TWO_PI,10,4,0.4);

    strokeWeight(4)
    const number = 10;
    const maxRadius = 3 * width;
    for(let i = 0; i<number; i++){
        const radius = (i/number) * maxRadius;
        stroke(lerpColor(c.colorA, c.colorB, i/number))
        drawNoisePolygon(1000, radius, createVector(1000,1000));
    }

    
    
}

function drawNoisePolygon(n, radius, pos){

    const points = [];
    for(let a = 0; a < TWO_PI; a += TWO_PI/n){
        
        const x = cos(a) * radius;
        const y = sin(a) * radius;
        const noiseOffset = circularNoise.getNoise(a)-0.5;
        const pt = createVector(x,y).mult(noiseOffset).add(pos)
        points.push(pt);
    }
    drawPath(points, true);
}

function drawPolygon(n, radius, pos){
    const points = [];
    for(let a = 0; a < TWO_PI; a += TWO_PI/n){
      const x = cos(a) * radius + pos.x;
      const y = sin(a) * radius + pos.y;
      points.push(createVector(x,y));
    }
    drawPath(points, true);
}

function drawPath(points, join) {
    if (join) points.push(points[0]);
    for(let i = 0; i < points.length -1; i++){
        line(points[i].x, points[i].y, points[i+1].x, points[i+1].y)
    }
}

class CircularNoise{

    constructor(cycle = 600, divider = 10, octaves = 4, falloff = 0.4){


        // Helper Function that returns an Points Array with the key points of the function
        // in order to get the values in between function getVal has to be used
        const createRandomPointsArray = (stepWidth, amplitude) => {
            console.log('CircularNoise -> createRandomPointsArray -> stepWidth', stepWidth)
            const array = [];
            for(let x = 0; x<(this.cycle); x+=stepWidth){
                let pt = createVector(x, random(0,amplitude));
                array.push(pt);
            }
            const lastPoint = createVector(cycle, array[0].y)
            array.push(lastPoint)
            return array;
        }
        createRandomPointsArray.bind(this)

        this.cycle = cycle;

        this.functions = [];
        const maxStepWidth = cycle / divider;

        this.totalAmplitude = 0;
        
        for(let i = 0; i < octaves; i++){
            const amplitude = pow(falloff, i);
            this.totalAmplitude += amplitude;
            const stepWidth = maxStepWidth / (pow(2,i));
            const func = createRandomPointsArray(stepWidth, amplitude);
            this.functions.push(func);
        }

        console.log('CircularNoise -> constructor -> this.functions', this.functions)
    }


    getNoise(x){ 

        // Helper Function
        function cosineInterpolate(a, b, inter){
            const f = (1 - cos(PI * inter)) * 0.5;
            return a * (1-f) + b * f;
        }

        // Helper Function that returns the actual value on any point of the random points array
        // performs Binary search to find either the value of x or use the nearest two indices around x for interpolation
        const getVal = (x, pointsArray) => {
            
            // Circular Value
            x = x % this.cycle;
            if(x < 0) x = this.cycle+x;

            // Exceptions
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
            
            // if loop has not returned the value -> do interpolation 

            // calculate value between 0 and 1
            const inter = (x - pointsArray[low].x)/(pointsArray[high].x - pointsArray[low].x);
            
            //return linearInterpolate(pointsArray[low].y, pointsArray[high].y, inter);
            return cosineInterpolate(pointsArray[low].y, pointsArray[high].y, inter);
        }
        getVal.bind(this)

        let val = 0;
        
        for (let func of this.functions){
            val += getVal(x, func)
        }
        return val/this.totalAmplitude;
    }
}

