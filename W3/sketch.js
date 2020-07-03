
var canvas_size = 600;
var sources = ['HarryPotter.txt', 'OdysseeHomer.txt'] // 'Faust.txt' 'ShadesOfGrey.txt'
var loadedTexts = [];
var sourceText = "";

var order = 2;
var startKey = [];
var length = 150;

var myText = [];

//Graphical Stuff
var font;
var fontsize = 15;

var wordList = [];

var button = -1;
var output = -1;



function preload(){

  sources.forEach((source) => {
      loadedTexts.push(loadStrings(source));
  });

  font = loadFont('Comfortaa-Regular.ttf');
}

function setup() {

  var canvas = createCanvas(canvas_size, canvas_size);
  canvas.parent('canvas-wrapper');

  //background(250)

  loadedTexts.forEach((text) => {
    sourceText += text + " ";
  });
  
  

 
  //createText();
  //createP(myText);
  //myText = join(myText, " ");


  // Initialization
  createMarkovChain();
  button = document.getElementById('next-word');
  output = document.getElementById('text-output');
  
  button.onclick = () => {createNextTextStep(wordList)}


  startKey = decomposeKey(getRandomKey(markov));
  wordList = startKey;
  console.log("startKey: " + startKey)
  console.log("wordList: " + wordList)


  // Text Drawing
 
  
  
  

  createNextTextStep(wordList);
  

}


// returns random key from Set or Map
function getRandomKey(collection) {
  let keys = Array.from(collection.keys());
  return keys[Math.floor(Math.random() * keys.length)];
}

function drawVisualization(key, values){

  clear();

  // Set text characteristics
  textFont(font);
  textSize(17);
  fill('rgb(255, 255, 255)')

  textAlign(CENTER, CENTER)
  key = join(key, " ");
  text(key, 300 ,300)
  
 
  
  const maxNum = 12;

  let i;
  let isFirst = true;
  translate(300, 300)

  let popularity;

  textAlign(LEFT, CENTER);

  let obj = getMostLikelyWords(maxNum, values);
  console.log("das krieg ich: " + obj.array + "hihg" + obj.highestValue);
  
  obj.array = shuffle(obj.array)

  for(i = 0; i < obj.array.length; i++){

    popularity = random();
    size = obj.array[i][1]/obj.highestValue * 150;
    
    drawTextBar(obj.array[i][0],size);
    rotate(TWO_PI /  obj.array.length);
  }

  function drawTextBar(txt, size){
    stroke('rgb(249, 86, 115)');
    strokeWeight(35)
    line(110, 0, 110 + size, 0)
    noStroke()
    text(txt, 110 ,0)
   
  }
  cuttedWordList = wordList.slice(0, wordList.length-1);
  const currentText = join(cuttedWordList, " ");
  output.textContent = currentText;
}

function getMostLikelyWords(max, values){
  likelyWords = new Map();
  
  values.forEach((word) => {
    key = word;
    count = (likelyWords.get(key) || 0) + 1; 
    likelyWords.set(key, count)
  });

  console.log(likelyWords)
  let result = [];
  let i;
  let highestVal=0;
  for(i=0; i<max; i++){
    if(likelyWords.size > 0){
      let highest = [...likelyWords.entries()].reduce((a, e) => e[1] > a[1] ? e : a);
      likelyWords.delete(highest[0]);
      result.push(highest)

      if(highestVal < 1){
        highestVal = highest[1];
      }
  }
  }
  console.log(result)
  console.log(highestVal)

  return { 
    array: result,
    highestValue: highestVal
  }
  
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



function createNextTextStep(wordList){
  key = wordList.slice(-order);
  key = composeKey(key);
  values = markov.get(key);
  index = Math.floor(Math.random() * values.length);

  console.log("chosen element" + values[index]);
  
  wordList.push(values[index]);
  console.log("WordList " + wordList)

  drawVisualization(decomposeKey(key), values);
  return wordList;
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