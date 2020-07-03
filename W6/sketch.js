var props = {
    axiom: 'F',
    rule: '|[---F][+++F]|[--F][++F]|F',
    iterations: 2,
    angle: 20,
    lenPercent: 35,
    lenModifier: 0.65,
}

var c1 = null;
var c2 = null;


var sentences = [];
//var n = 0;
var len = 0;
var depthLen = 0;


function preload() {
    initDatGui(props, setup);
}

function setup() {
    createCanvas(1000, 1000);

    sentences = [];
    len = props.lenPercent/100 * height;
    depthLen = len;

    c1 = color(34,193,195);
    c2 = color(253,187,45);
    

    //n = 0;

    strokeWeight(2)

    translate(width/2, height);
    // generateSentences();
    // console.log('sentences', sentences)
    // drawSentences();

    drawRecursive(0);
}


function drawRecursive(n){ 
     
    
    depthLen = Math.pow(props.lenModifier, n) * len;
    stroke(lerpColor(c1, c2, n/props.iterations))

    for(let k in props.rule){
        const command = props.rule.charAt(k);
        switch(command){
            case 'F':
                if(n < props.iterations){
                    drawRecursive(n-1);
                }else{
                    line(0,0,0,-depthLen);
                    translate(0, -depthLen);
                }
                break;
            case 'G':
                translate(0, -depthLen);
                break;
            case '+':
                rotate(radians(props.angle));
                break;
            case '-':
                rotate(-radians(props.angle));
                break;
            case '[':
                push();
                break;
            case ']':
                pop();
                break;
            case '|':
                line(0,0,0,-depthLen);
                translate(0, -depthLen);
                break;
        }
    }
    
}

function doCommand(){

}

function generateSentences(){

    sentences.push(props.axiom);

    for(let i = 0; i < props.iterations; i++){

        let currentGen = sentences[i];
        let nextGen = "";

        for(let k = 0; k < currentGen.length; k++){
            const symbol = currentGen.charAt(k);
            if(symbol === 'F'){
                nextGen += props.rule;
            }else{
                nextGen += symbol;
            }
        }
        sentences.push(nextGen)
    }    
}

async function drawSentences(){

    
    const c1 = color(34,193,195)
    const c2 = color(253,187,45)

    const sentence = sentences[sentences.length-1];
    depthLen =  depthLen * props.lenModifier;
    //depthLenght = Math.pow(props.lenPercent/100, i) * height;
    console.log('drawSentences -> depthLenght', depthLen)

    for(let k in sentence){
        
        stroke(c1)
        const command = sentence.charAt(k);

        //await sleep(1000)
        switch(command){
            case 'F':
                //while(!keyIsDown(32))
                stroke(150)
                line(0,0,0,-len);
                translate(0, -len);
                break;
            case 'G':
                translate(0, -len);
                break;
            case '+':
                rotate(radians(props.angle));
                break;
            case '-':
                rotate(-radians(props.angle));
                break;
            case '[':
                push();
                break;
            case ']':
                pop();
                break;
            case '|':
                line(0,0,0,-depthLen);
                translate(0, -depthLen);
                break;
        }
    }
    
     
    // for(let i = sentences.length-1; i < sentences.length; i++){
    //     const sentence = sentences[i];
    //     depthLenght =  depthLenght * props.lenModifier;
    //     //depthLenght = Math.pow(props.lenPercent/100, i) * height;
    //     console.log('drawSentences -> depthLenght', depthLenght)

    //     for(let k in sentence){
           
    //         stroke(lerpColor(c1, c2, i/sentences.length))
    //         const command = sentence.charAt(k);

    //         //await sleep(1000)
    //         switch(command){
    //             case 'F':
    //                 //while(!keyIsDown(32))
    //                 stroke(150)
    //                 line(0,0,0,-len);
    //                 translate(0, -len);
    //                 break;
    //             case 'G':
    //                 translate(0, -len);
    //                 break;
    //             case '+':
    //                 rotate(radians(props.angle));
    //                 break;
    //             case '-':
    //                 rotate(-radians(props.angle));
    //                 break;
    //             case '[':
    //                 push();
    //                 break;
    //             case ']':
    //                 pop();
    //                 break;
    //             case '|':
    //                 line(0,0,0,-depthLenght);
    //                 translate(0, -depthLenght);
    //                 break;
    //         }
    //     }
    // }
}

function initDatGui(props, onChangeFunction){
    let gui = new dat.GUI();
    Object.getOwnPropertyNames(props).forEach((pr) => {
        gui.add(props, pr).onChange(onChangeFunction);
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function letsSleep(ms){
    await sleep(ms);
}




