var c = null

const coordList = [];


function preload(){
    c = {
      background: color(200),
      colorA: color('#fc4674'),
      colorB: color('#0c2fb3')
    }
}


var canvas_size = 2000;

function setup() {
  createCanvas(canvas_size, canvas_size, WEBGL);
  createEasyCam();
  document.onmousedown = () => false;

  drawShell(10, 10, createVector(0,0), 1);
  drawCoords();
  
}
  
  
function draw(){
  background(c.background);
  //drawPolygon(px(10), createVector(0, 0, 0), 20);
  //drawArchimedicSpiral(100, px(1), createVector(0,0), 2);

  
  // drawShell(10, 10, createVector(0,0), 1);
  // drawCoords();
  // drawCoordsShape();
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
      const z = sin(a) * radius + pos.y;

      fill(lerpColor(c.colorA, c.colorB, a/end));
      // console.log('drawArchimedicSpiral -> a/end', a/end)

      //drawPolygon(10, createVector(x,0,z), 3)
      //rotateY(radStep)

      drawAwesomePolygon(createVector(x,0,z), 10, 10)
    }
}

function drawAwesomePolygon(pos, radius, n){
    const up = createVector(0,1,0).mult(radius);
    const dir = pos.copy().normalize().mult(radius);
    // const a = p5.Vector.sub(pos, dir); 
    // const b = p5.Vector.add(pos, dir)

    //line(a.x, a.y, a.z, b.x, b.y, b.z)

    // beginShape();
    const increment = TWO_PI/n;
    

    for(let a = 0; a < TWO_PI; a += increment){
      
      
      // const x = cos(a) * radius + pos.x;
      const xVec = dir.copy().mult(cos(a));
      
      // const y = sin(a) * radius + pos.y;
      const yVec = up.copy().mult(sin(a));
      
      const posVec = pos.copy().add(xVec).add(yVec);
      console.log('drawAwesomePolygon -> posVec', posVec)


      coordList.push(posVec)
      

      // push()
      // translate(posVec)
      // sphere(0.1)
      // pop()

      // vertex(posVec);
    }
    // endShape(CLOSE);
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

function drawCoords(){
    
    let previous = coordList[0];
    for(let coord of coordList){
      line(previous.x, previous.y, previous.z, coord.x, coord.y, coord.z)
      previous = coord;
    }
}

function drawCoordsShape(){
    
  beginShape();
  for(let coord of coordList){
      vertex(coord)
  }
  endShape();
}








// Helper Functions

function px(percent){
  return percent/100 * canvas_size;
}

function pc(pixel){
  return pixel/canvas_size * 100;
}