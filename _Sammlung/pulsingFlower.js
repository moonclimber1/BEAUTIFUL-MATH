"use strict"

// Noise Settings
const divider =  10
const octaves =  4
const falloff = 0.3

var circularNoise = null
var noiseGens = null

var colors = null
var p = null

var rad = 0;
var noiseOffset = 0;
var turnFactor = 1
var individualism = 1;


function preload(){
    colors = {
        background: color(30),
        A1: color('#F1F2B5'),
        B1: color('#135058'),
        A2: color('#ED4264'),
        B2: color('#FFEDBC')
    }

    p = {
        figures: 8,
        minRadius: 0,
        radius: 900,
        baseFactor: 0.5,
        noiseFactor: 0.2,
        strokeWeight: 2,
    }
    initDatGui(p, drawFigure);
}


function setup() {
    createCanvas(1000, 1000);
    noiseGens = [];
    for(let i = 0; i < 1000; i++){
        noiseGens.push(new CircularNoise(TWO_PI,divider,octaves,falloff))
    }
    drawFigure();
}


    function draw(){
        noiseOffset += 0.01
        //p.radius += 1
        drawFigure();
    }


// function draw(){
//     translate(width/2, height/2)
//     rotate(rad)
//     translate(-width/2, -height/2)
//     rad += 0.01
//     drawFigure();
// }

function drawFigure(){
    background(colors.background);
    strokeWeight(p.strokeWeight)
    for(let i = 1; i<=p.figures; i++){
        circularNoise = noiseGens[i-1]
        // noiseOffset += 0.001
        
        const radius = (i/p.figures) * p.radius + p.minRadius;
        stroke(lerpColor(colors.A1, colors.B1, i/p.figures))
        drawNoisePolygon(360, radius, createVector(width/2,height/2));
    }
}

function drawNoisePolygon(n, radius, pos){
    const points = [];
    for(let a = 0; a < TWO_PI; a += TWO_PI/n){
        
        const x = cos(a) * radius;
        const y = sin(a) * radius;
        
        const noiseParam = a + noiseOffset * turnFactor * (3 +radius/p.radius)/4
        turnFactor *= -1;
        const noise = (circularNoise.getNoise(noiseParam)-0.5) * 2 * p.noiseFactor;
        const pt = createVector(x,y).mult(p.baseFactor + noise).add(pos)
        points.push(pt);
    }
    individualism += 0.001
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

function initDatGui(props, onChangeFunction){
    let gui = new dat.GUI();
    Object.getOwnPropertyNames(props).forEach((pr) => {
        gui.add(props, pr).onChange(onChangeFunction);
        
    });
}

