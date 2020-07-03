
var canvas_size = 900;

function setup() {
  createCanvas(canvas_size, canvas_size, WEBGL);
  
  createEasyCam();
  document.oncontextmenu = () => false;
  document.onmousedown = () => false;

  

  //drawPolygon(px(25), createVector(px(0), px(0), px(0)), 4);
  
  
}
  
  
function draw(){
  background(200);
  //drawPolygon(px(25), createVector(px(0), px(0), px(0)), 6);

  drawArchimedicSpiral(px(1), createVector(px(0), px(0), px(0)), 4, 50);
  // drawPolygon3D(px(25), [0,0,0], [0,0,1], 4);
}
  




function drawArchimedicSpiral(size, pos, loops, n){
  
  const increment = TWO_PI/n;

  beginShape(QUAD_STRIP);

  for(let a = 0.1; a < loops * TWO_PI; a += increment){
    
    const radius = a * size;
    const x = cos(a) * radius + pos.x;
    const y = sin(a) * radius + pos.y;
    const z = -radius;
    const p = [x,y,z];

    const next_a = a + increment;
    const next_radius = a * size;
    const next_x = cos(next_a) * next_radius + pos.x;
    const next_y = sin(next_a) * next_radius + pos.y;
    const next_z = -next_radius;
    const next_p = [next_x,next_y,next_z];

    let normal = vec3.create();
    vec3.subtract(normal, p, next_p)

    drawPolygon3D(px(4), p, normal, 6);

    //vertex(x,y,-radius)
    //drawPolygon(px(2), createVector(x, y, -radius), 10);
  }

  endShape();
}

function drawPolygon(radius, pos, n){
  
  const increment = TWO_PI/n;
  
  noFill();
  beginShape();

  for(let a = 0; a < TWO_PI; a += increment){
    
    const x = cos(a) * radius + pos.x;
    const y = sin(a) * radius + pos.y;
    const z = pos.z;

    let p = [x,y,z];
    console.log("Polygon 2D: " + p);
    vertex(x,y,pos.z);
  }

  endShape(CLOSE);
}


function drawPolygon3D(radius, pos, normal, n){
  
  // Calculate Rotation Matrix
  const zAxis = [0,0,1];
  let rotAxis = vec3.create();
  vec3.cross(rotAxis, zAxis, normal);
  const angle = vec3.angle(zAxis, normal);

  let rotMat = mat4.create();
  mat4.rotate(rotMat, rotMat, angle, rotAxis);


  // Draw Polygon in x-y Plane
  const increment = TWO_PI/n;
  //noFill();
  //beginShape();

  let first = -1;

  for(let a = 0; a < TWO_PI; a += increment){
    
    const x = cos(a) * radius + pos[0];
    const y = sin(a) * radius + pos[1];
    const z = pos[2];

    let p = [x,y,z];
    
    // Apply Rotation Matrix
    vec3.transformMat4(p, p, rotMat);
    console.log("Polygon 3D: " + p);

    vertex(p[0], p[1], p[2]);

    if(first === -1){
      first = p;
    }
  }

  vertex(first[0], first[1], first[2]);

  //endShape(CLOSE);
}



// Helper Functions

function px(percent){
  return percent/100 * canvas_size;
}

function pc(pixel){
  return pixel/canvas_size * 100;
}