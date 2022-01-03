/*
frame data sourced from:
https://smashboards.com/threads/falco-hitboxes-and-frame-data.300397/
*/

document.getElementById('shine').volume = .2;

const shine = {
    img: '<img src="./img/btn_b.svg">',
    audio: 'shine'   
}

const jump = {
    img: '<img src="./img/btn_y.svg">',
    audio: 'jump'
}

const shield = {
    img: '<img src="./img/btn_l.svg">',
    audio: 'shield'
}

//goku blue, tho should work for all
const dbl = {
    img: '<img src="./img/btn_b.svg">',
    audio: 'shield'
}
const dbm = {
    img: '<img src="./img/btn_b.svg">',
    audio: 'shield'
}
const dbs = {
    img: '<img src="./img/btn_b.svg">',
    audio: 'shield'
}
const dbup = {
    img: '<img src="./img/btn_y.svg">',
    audio: 'jump'
}
const dbql = {
    img: '<img src="./img/btn_b.svg">',
    audio: 'shield'
}
//end of dbfz

function makePattern() {
    let frames = document.getElementById('customPattern').value;
    let inputs = [];
    for (k in frames) {
        inputs.push(shield);
    }
    let patObj = {
        frames: frames,
        inputs: inputs
    }
    return patObj;
}

let patterns = [
    multishine = {
        frames: [0, 7, 12, 21, 26],
        inputs: [shine, jump, shine, jump, shine]
    },
    waveshine = {
        frames: [0, 7, 12, 22],
        inputs: [shine, jump, shield, shine]
    },
    
    bluku = {
        frames: [0,2,4,8,9,10,11,12,15,19,20,21,22,23,26,30],
        inputs: [dbm, dbs, dbql, dbl, dbup, dbl, dbm, dbs, dbql, dbl, dbup, dbl, dbm, dbs, dbql, dbl]
    }
];

function addPattern() {
    let customPat = makePattern();
    patterns.push(customPat);
}

function formatNome (patIndex, endLoopFrame) {
    let pattern = patterns[patIndex];
    let timeFrames = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59 ];
    if (pattern && pattern.frames.length == pattern.inputs.length){
        let arrf = pattern.frames;
        let arri = pattern.inputs;
        for (let n = 0; n<arrf.length; n++) {
            timeFrames[arrf[n]] = arri[n];
        }
    }
    return timeFrames.slice(0,endLoopFrame + 1);
}


function progressFrame(frame,timeFrames,endLoopFrame) {
    if (typeof(timeFrames[frame]) != "number") {
        document.getElementById(timeFrames[frame].audio).play();
        document.getElementById('frameData').innerHTML = timeFrames[frame].img;    
    }else{
        console.log(timeFrames[frame]);
        document.getElementById('frameData').innerHTML = timeFrames[frame];
    }
    if (frame==endLoopFrame) {
        frame=0;
    }else{
        frame +=1;
    }
    return frame;
} 

var nomeActive = false;

function startNome (patIndex) { //in ms
    let i = 0;
    let speed = document.getElementById('pbSpeed').value;
    let endLoopFrame = document.getElementById('endFrame').value;
    let frameDuration = document.getElementById('tickSpeed').value;
    if(patIndex != 'stop') {
        if(nomeActive){
            clearInterval(nomeClicks);
        }
        let timeFrames = formatNome(patIndex, endLoopFrame);
        document.getElementById('jump').playbackRate = 1;
        document.getElementById('shine').playbackRate = 1;
        document.getElementById('shield').playbackRate = 1;
        nomeActive = true;
        return nomeClicks = setInterval(function(){i = progressFrame(i,timeFrames,endLoopFrame)},frameDuration/speed);
    }else{
        nomeActive = false;
        clearInterval(nomeClicks);
    }
}

function bpmSelect () {
    let bpm = document.getElementById('bpm').value;
    let speed = Math.ceil(60000 / bpm / 4);
    document.getElementById('tickSpeed').value = speed;
}

function setFPS(num) {
    let fps = document.getElementById('fps').value;
    let speed = Math.ceil(1000 / fps);
    document.getElementById('tickSpeed').value = speed;
}
