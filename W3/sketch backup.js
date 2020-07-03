
var canvas_size = 700;
var sources = ['HarryPotter.txt', 'OdysseeHomer.txt'] // 'Faust.txt' 'ShadesOfGrey.txt'
var loadedTexts = [];
var sourceText = "";

var order = 2;
var startKey = ["Da", "er"]
var length = 150;

var myText = [];

//Graphical Stuff
var font;
var fontsize = 40;
var textColor = color(218, 165, 32);


function preload(){

  sources.forEach((source) => {
      loadedTexts.push(loadStrings(source));
  });

  font = loadFont('beon-webfont.ttf');
}

function setup() {

  createCanvas(canvas_size, canvas_size);
  background(230)

  loadedTexts.forEach((text) => {
    sourceText += text + " ";
  });

  console.log(loadedTexts);
  console.log(sourceText);
  
  

  // createMarkovChain();
  // createText();
  // createP(myText);


  // Text Drawing
 
  // Set text characteristics
  textFont(font);
  textSize(fontsize);
  textAlign(RIGHT);

  fill(textColor)
  text('BIG text in awesome font', 300,300)
}
  
function draw(){
  
  
}


function createMarkovChain(){
  markov = new Map();
  const wordArray = sourceText.split(' ');
  let nextWord = -1;

  let index;
  let k;
  for(index = 0; index < wordArray.length-order; index++){
    key = [];
    for(k = 0; k < order; k++){
      key.push(wordArray[index + k]);
    }
    val = wordArray[index + order];

    //convert key array to string
    key = composeKey(key);

    // Create new entry or add to existing
    values = markov.get(key);
    if(values===undefined){
      markov.set(key, [val]);
    }else{
      values.push(val);
    }
  }
  console.log(markov)
}

function createText(){


  myText = startKey;

  for(i = 0; i<length-1; i++){

    key = myText.slice(-order);
    key = composeKey(key);
    values = markov.get(key);
    console.log("Key: " + key + " Values: " + values);
    index = Math.floor(Math.random() * values.length);
    
    console.log(values[index]);
    
    myText.push(values[index]);
  }

  myText = join(myText, " ");
}



// Helper Functions

function composeKey(array){
  return array.join('§');
}
function decomposeKey(string){
  return string.split('§')
}

function px(percent){
  return percent/100 * canvas_size;
}

function pc(pixel){
  return pixel/canvas_size * 100;
}