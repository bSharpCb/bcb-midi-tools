function midiNoteToFrequency (note) {
    return Math.pow(2, ((note - 69) / 12)) * 440;
}

let cardStr = "[V: PianoRightHand]|";
let cardCounter = 0;

let context = new AudioContext(),
oscillators = {};


let gainNode = context.createGain();
gainNode.gain.value = 0.1;

gainNode.connect(context.destination);


function pressNote(midiArray){
    if(midiArray[1]<36 || midiArray[1] > 95){
        return;
    }
    let target = document.getElementById('n' + midiArray[1]);
    if(midiArray[0] === 128 || midiArray[2] === 0){
        target.style="";
    }else{
        target.style = "background:" + "blue;";
    }
}

const abcDict = ['2','4','8','[',']','(3','z','|',' ',
'C,,','_D,,','D,,','_E,,','E,,','F,,','^F,,','G,,','_A,,','A,,','_B,,','B,,',
'C,','_D,','D,','_E,','E,','F,','^F,','G,','_A,','A,','_B,','B,',
'C','_D','D','_E','E','F','^F','G','_A','A','_B','B',
'c','_d','d','_e','e','f','^f','g','_a','a','_b','b',
'c\'','_d\'','d\'','_e\'','e\'','f\'','^f\'','g\'','_a\'','a\'','_b\'','b\''
];

let handStaff = 'right';

function playNote (frequency,type) {
    oscillators[frequency] = context.createOscillator();
    oscillators[frequency].type = type;
    oscillators[frequency].frequency.value = frequency;
    oscillators[frequency].connect(gainNode);
    oscillators[frequency].start(context.currentTime);
}
 
function stopNote (frequency) {
    oscillators[frequency].stop(context.currentTime);
    oscillators[frequency].disconnect();
}

let timerCount = 0.0;
let bestTime = 0;
let timer;

function myTimer() {
  timerCount+=.1;
  document.getElementById("seconds").innerHTML = `${timerCount.toFixed(1)} seconds`;
}

function updateFC() {
    document.getElementById('fc-prog-num').innerHTML = cardCounter;
    cardCounter += 1;
    let btDiv = document.getElementById("best-time");
    switch (cardCounter) {
        case 1:
            timer = setInterval(myTimer, 100);
            getRandNote(flashRight);
            break;
        case 11:
            if(bestTime == 0){
                btDiv.innerHTML = `${timerCount.toFixed(1)} seconds`;
                bestTime = timerCount;
            }else if (timerCount < bestTime) {
                bestTime = timerCount;
                btDiv.innerHTML = `${timerCount.toFixed(1)} seconds`;
            }
            cardCounter = 0;
            document.getElementById("right").value = "[V: PianoRightHand]|C2";
            thisCard = 'C';
            timerCount = 0.0;
            abcRender();
            clearInterval(timer)
            break;
        default:
            getRandNote(flashRight);
    }
}

function makeSynth(){
    navigator.requestMIDIAccess().then(function(access) {
        let inputs = access.inputs;
        inputs.forEach((input) => {
            input.onmidimessage = function(message) {
                let frequency = midiNoteToFrequency(message.data[1]);
                // Log events with note values, only log 1 event per note
                if(message.data[0] === 144 && message.data[2] > 0){
                    pressNote(message.data);
                    if(abcDict[message.data[1]-27] === thisCard){
                        updateFC();
                    }else{
                        console.log(message.data[1]);
                        console.log(abcDict[message.data[1]-27]);
                    }
                    playNote(frequency-2, 'sine');
                    playNote(frequency-1, 'sawtooth');
                }
                if (message.data[0] === 128 || message.data[2] === 0) {
                    pressNote(message.data);
                    stopNote(frequency-2);
                    stopNote(frequency-1);
                }
            }
        });
        access.onstatechange = function(e) {
            // Print information about the (dis)connected MIDI controller
            console.log(e.port.name, e.port.manufacturer, e.port.state);
        };
    });
}
/*
** ABC notation reference guide
** = natural
** ^ sharp
** ^^ double sharp
** _ flat
** __ double flat
** z rest
** Z bar's rest
*/

function abcRender() {
    let abcHeader = document.getElementById("header").value;
    let abcRight = document.getElementById("right").value;
    let abcLeft = document.getElementById("left").value;
    let abcString = abcHeader + abcRight + abcLeft;
    window.ABCJS.renderAbc("mu-canvas", abcString, { responsive: "resize"});
}

let thisCard = '';
const flashRight = ['C','_D','D','_E','E','F','^F','G','_A','A','_B','B','c','_d','d','_e','e','f','^f','g','_a','a'];
    
    //'A,','_B,','B,',
//'_b','b','c\''];


const flashLeft = ['C,,','_D,,','D,,','_E,,','E,,','F,,','^F,,','G,,','_A,,','A,,','_B,,','B,,','C,','_D,','D,','_E,','E,','F,','^F,','G,','_A,','A,','_B,','B,','C'];



function getRandNote(flashArray){
    thisCard = flashArray[Math.floor(Math.random() * flashArray.length)];
    document.getElementById(handStaff).value += thisCard;
    abcRender();
}

function flashStart() {
    makeSynth();
    document.getElementById("right").value = "[V: PianoRightHand]|C2";
    thisCard = 'C';
    abcRender();
}