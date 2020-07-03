
var color = -1;

var size = 2000;





function px(percent){
    return percent/100 * size;
}

function pc(pixel){
  return pixel/size * 100;
}

function setup() {
  color = color(150);
  
  createCanvas(size, size);
  background(240);
  
  drawCircle();
  drawPolygon(50, px(30), createVector(px(50), px(50)));
  //drawArchimedicSpiral(100, px(3), px(50), 2);
  drawLogarithmicSpiral(100, createVector(px(50), px(50)), px(2));
  //drawSpiroSpiral(50, px(50), px(2));
  //drawSpirograph(50, px(10), createVector(px(50), px(50)));
  drawSpiro(50, px(10), createVector(px(50), px(50)));
}

function drawSpiroSpiral(n, position, turn){
  
  const increment = TWO_PI/n;
  
  for(let a = 0; a < turn * TWO_PI; a += increment){
    
    let radius = exp(0.1 * a);
    
    const x = cos(a) * radius + position;
    const y = sin(a) * radius + position;

    drawPolygon(500, px(30), createVector(x, y));
  }
}

function drawSpirograph(n, radius, pos){
  const increment = TWO_PI/n;
  
  for(let a = 0; a < TWO_PI; a += increment){
    
    const x = cos(a) * radius + pos.x;
    const y = sin(a) * radius + pos.y;
    drawPolygon(500, px(30), createVector(x, y));
  }
}

function drawSpiro(n, radius, pos){
  const increment = TWO_PI/n;
  
  for(let a = 0; a < TWO_PI; a += increment){
    
    const x = cos(a) * radius + pos.x;
    const y = sin(a) * radius + pos.y;
    
    drawLogarithmicSpiral(100, createVector(x,y), 10);
  }
  updatePixels();
}

function drawCircle(){
  const middle = px(50);
  const radius = px(20);
  for(let a = 0; a <= TWO_PI; a += 0.05){
    
    const x = cos(a) * radius + middle;
    const y = sin(a) * radius + middle;
    
    set(x,y, color);
  }
  updatePixels();
}


function drawPolygon(n, radius, pos){
  
  const increment = TWO_PI/n;
  
  for(let a = 0; a < TWO_PI; a += increment){
    
    const x = cos(a) * radius + pos.x;
    const y = sin(a) * radius + pos.y;
    const nextX = cos(a + increment) * radius + pos.x;
    const nextY = sin(a + increment) * radius + pos.y;
    
    line(x,y,nextX,nextY);
  }
}

function drawArchimedicSpiral(n, size, position, turn){
  
  const increment = TWO_PI/n;
  
  for(let a = 0; a < turn * TWO_PI; a += increment){
    
    let radius = a * size;
    let nextRadius = (a + increment) *size;
    
    const x = cos(a) * radius + position;
    const y = sin(a) * radius + position;
    const nextX = cos(a + increment) * nextRadius + position;
    const nextY = sin(a + increment) * nextRadius + position;
    
    line(x,y,nextX,nextY);
  }
}

function drawLogarithmicSpiral(n, pos, turn){
  
  const increment = TWO_PI/n;
  
  for(let a = 0; a < turn * TWO_PI; a += increment){
    
    let radius = exp(0.1 * a);
    let nextRadius = exp(0.1 * (a + increment));
    
    const x = cos(a) * radius + pos.x;
    const y = sin(a) * radius + pos.y;
    const nextX = cos(a + increment) * nextRadius + pos.x;
    const nextY = sin(a + increment) * nextRadius + pos.y;
    
    line(x,y,nextX,nextY);
  }
}




