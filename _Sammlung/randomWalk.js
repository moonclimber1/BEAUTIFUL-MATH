"use strict"

var colors = null
var p = null

var lastPoint = null

function preload(){
    colors = {
        background: color(240),
        A1: color('#F1F2B5'),
        B1: color('#135058'),
        A2: color('#ED4264'),
        B2: color('#FFEDBC')
    }
    p = {
       
    }
    initDatGui(p, setup);
}


function setup() {
    createCanvas(1000, 1000);
    frameRate(30)

    push()
    lastPoint = createVector(vw(50), vh(50))
    background(colors.background)


    const ellipseFunc = () => {
        fill(30, 255, 10)
        ellipse(300,300,95,95);
    }

    drawGlowy(ellipseFunc)

    // smooth();
    // noStroke();
    // fill(255,0,0);
    // ellipse(100,100,95,95);
    // filter( BLUR, 6 );
    // ellipse(100,100,90,90);

    noFill()
}

function drawGlowy(drawFunction){
    console.log('drawGlowy -> drawFunction', drawFunction)
    push()
    noStroke();
    drawFunction()
    filter(BLUR,1);
    drawFunction()
    pop()
}

function draw(){
    translate(lastPoint)
    const points = getPolygonPoints(6, 40, createVector(0,0))
    const randomPoint = points[Math.floor(Math.random() * points.length)]
    drawGlowy(() => {
        stroke(colors.A2)
        line(0,0,randomPoint.x, randomPoint.y)
        ellipse(0, 0, 10)
    })
    lastPoint = lastPoint.add(randomPoint)
}



function getPolygonPoints(n, radius, pos){
    const points = [];
    for(let a = 0; a < TWO_PI; a += TWO_PI/n){
      const x = cos(a) * radius + pos.x;
      const y = sin(a) * radius + pos.y;
      points.push(createVector(x,y));
    }
    return points;
}

function drawPath(points, join) {
    if (join) points.push(points[0]);
    for(let i = 0; i < points.length -1; i++){
        line(points[i].x, points[i].y, points[i+1].x, points[i+1].y)
    }
}

function initDatGui(props, onChangeFunction){
    let gui = new dat.GUI();
    Object.getOwnPropertyNames(props).forEach((pr) => {
        gui.add(props, pr).onChange(onChangeFunction);
        
    });
}

function vw(percent){
    return percent/100 * width;
}

function vh(percent){
    return percent/100 * height;
}

