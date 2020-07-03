var c = null


function preload(){
    c = {
      background: color(0),
      colorA: color('#fc4674'),
      colorB: color('#0c2fb3')
    }
}


var canvas_size = 2000;

function setup() {
  createCanvas(canvas_size, canvas_size, WEBGL);
  createEasyCam();
  document.onmousedown = () => false;
}
  
  
function draw(){
  background(c.background);
  //drawPolygon(px(10), createVector(0, 0, 0), 20);
  //drawArchimedicSpiral(100, px(1), createVector(0,0), 2);


  drawShell(10, 5, createVector(0,0), 1);
}
  

// function drawArchimedicSpiral(n, size, position, turn){
  
//   const increment = TWO_PI/n;
//   const end = turn * TWO_PI
  
//   for(let a = 0; a < end; a += increment){
    
//     let radius = a * size;
//     const x = cos(a) * radius + position.x;
//     const z = sin(a) * radius + position.y;

//     drawPolygon(px(1), createVector(x,0,z), 3)

//     //sphere(10, x, y)
//   }
// }

function drawShell(n, size, pos, turn){
    const radStep = TWO_PI/n;
    const end = turn * TWO_PI
  
    for(let a = 0; a < end; a += radStep){
      
      let radius = a * size;
      const x = cos(a) * radius + pos.x;
      //const z = sin(a) * radius + pos.y;

      fill(lerpColor(c.colorA, c.colorB, a/end));
      // console.log('drawArchimedicSpiral -> a/end', a/end)

      drawPolygon(100, createVector(x,0,pos.y), 3)
      rotateY(radStep)
    }
}


function drawPolygon(radius, pos, n){
  
  const increment = TWO_PI/n;
  beginShape();

  for(let a = 0; a < TWO_PI; a += increment){
    
    const x = cos(a) * radius + pos.x;
    const y = sin(a) * radius + pos.y;
    const z = pos.z;

    let p = [x,y,z];
    vertex(x,y,pos.z);
  }
  endShape(CLOSE);
}









// Helper Functions

function px(percent){
  return percent/100 * canvas_size;
}

function pc(pixel){
  return pixel/canvas_size * 100;
}