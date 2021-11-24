function midiNoteToFrequency (note) {
    return Math.pow(2, ((note - 69) / 12)) * 440;
}

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

let wav = ['sine', 'square', 'sawtooth', 'triangle'];

//pitch bend multipliers (5th up/down, octave up/down, 3rd up/down)
let pb = [1, 1.5, 0.75, 2, 0.5, 1.26, 0.79];

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

let editMode = false;
function abcToggle(){
    editMode = !editMode;
}

let notes = {};
notes.active = [];

function editAbc(midiNote){
    if(midiNote === 21){
        document.getElementById('rightHeader').style="";
        handStaff = 'left';
        document.getElementById('leftHeader').style="font-weight:" + "bold;";
    }else if(midiNote === 23){
        document.getElementById('leftHeader').style="";
        handStaff = 'right';
        document.getElementById('rightHeader').style="font-weight:" + "bold;";
    }else{
        switch(notes.active.length){
            case 1:
                document.getElementById(handStaff).value += abcDict[notes.active[0]-27];
                abcRender();
                break;
            case 0:
                document.getElementById(handStaff).value += ' ';
                break;
            default:
                document.getElementById(handStaff).value += '[';
                for(let i=0; i<notes.active.length; i++){
                    document.getElementById(handStaff).value += abcDict[notes.active[i]-27];
                }
                document.getElementById(handStaff).value += ']';
                abcRender();
        }
    }
    notes.active=[];
}


function makeSynth(){
    let type1 = document.getElementById('osc1-type').value;
    let type2 = document.getElementById('osc2-type').value;
    let harm1 = document.getElementById('osc1-harmonize').value;
    let harm2 = document.getElementById('osc2-harmonize').value;
    navigator.requestMIDIAccess().then(function(access) {
        let inputs = access.inputs;
        inputs.forEach((input) => {
            input.onmidimessage = function(message) {
                let frequency = midiNoteToFrequency(message.data[1]);
                // Log events with note values, only log 1 event per note
                if(message.data[0] === 144 && message.data[2] > 0){
                    pressNote(message.data);
                    if(editMode){
                        notes[message.data[1]] = 1;
                        notes.active.push(message.data[1]);
                    }
                    playNote(frequency*pb[harm1]-2, wav[type1]);
                    playNote(frequency*pb[harm2]-1, wav[type2]);
                    console.log(message);
                }
                if (message.data[0] === 128 || message.data[2] === 0) {
                    if(editMode){
                        if(notes[message.data[1]]){
                            notes[message.data[1]] = 0;
                            editAbc(message.data[1]);
                        }
                    }
                    pressNote(message.data);
                    stopNote(frequency*pb[harm1]-2);
                    stopNote(frequency*pb[harm2]-1);
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
    console.log(abcString);
    window.ABCJS.renderAbc("mu-canvas", abcString);
}

function flashStart() {
    makeSynth();
    abcRender();
}

// sidenav menu stuff
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("content").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("content").style.marginLeft= "0";
    document.body.style.backgroundColor = "cornflowerblue";
  }

  function toggleOscBox() {
    if(document.getElementById("osc-box").style.display == "none"){
        document.getElementById("osc-box").style.display = "block";
    }else{
        document.getElementById("osc-box").style.display = "none";
    }
  }


// start of modal code (used for populating a modal popup with keywords/definitions on click)
const modalText = {
    'Maj7': 'The Major Seventh chord uses the root, major third, perfect fifth, and major seventh intervals.',
    'm7':'The Minor Seventh chord uses the root, minor third, perfect fifth, and minor seventh intervals.',
    '7':'This is known as a "dominant seventh" chord. It uses the root, major third, perfect fifth, and minor seventh intervals.',
    'm7b5':'The Minor Seventh Flat Five- this chord is a bit trickier, it uses the root, minor third, diminished fifth, and minor seventh intervals. You may notice that its name describes it perfectly- a Minor Seventh chord, except the fifth is flattened (lowered a semitone)', 
    'semitone':'the smallest interval in western music. Sometimes called a half step. (e.g. C -> C#, or D -> Eb)',
    'major third':'an interval spanning the distance of 4 semitones (e.g. C -> E)',
    'minor third':'an interval spanning the distance of 3 semitones (e.g. C -> Eb)',
    'diminished fifth':'an interval spanning the distance of 6 semitones. Sometimes called the Tritone. Extremely dissonant. Contrary to popular belief, the Tritone was not in fact outlawed by the Catholic church. (e.g. C -> F#)',
    'perfect fifth':'an interval spanning the distance of 7 semitones. For the purposes of this lesson, think of this as the "maximum harmony" interval. (e.g. C -> G)',
    'minor seventh':'an interval spanning the distance of 10 semitones. I would recommend thinking of it as "just 2 steps short of an octave" for the purposes of this lesson.  (e.g. C -> Bb)',
    'major seventh':'an interval spanning the distance of 11 semitones I would recommend thinking of it as "just 1 step short of an octave" for the purposes of this lesson.(e.g. C -> B)',
    'octave': 'an interval spanning the distance of 12 semitones. One octave contains all 12 keys. Playing the same note across multiple octaves can be very harmonious (e.g. C -> C)'
}
const wordbank = document.getElementById("wordbank");

// populating a wordbank window with every term listed in modalText object
// each term gets onclick function to popup modal with definition
Object.keys(modalText).forEach(key => {
    wordbank.innerHTML += `<p class="wordbank">${key}</p>`;
});

// on page load, all html elements with wordbank class have onclick function attached
document.querySelectorAll('.wordbank').forEach(
    (chord)=>{
        chord.addEventListener('click',function(){
          document.getElementById('lookup-term').innerHTML = this.innerText;
          document.getElementById('lookup-def').innerHTML = modalText[this.innerText];
          modal.style.display = "block";
        });
      });

// modal popup and close logic
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];

function openWordBank() {
 modal.style.display="block";     
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
// end of modal stuff


// i know this is probably bad but ill care about that later
function showWb(){
    const wbbtn = document.getElementById('wordbank-open');
    const wb = document.getElementById('wordbank');
    if(wbbtn.innerHTML == 'Show Wordbank'){
        wb.style="display: block";
        wbbtn.innerHTML="Close Wordbank";
    }else if(wbbtn.innerHTML == 'Close Wordbank'){
        wb.style="display: none";
        wbbtn.innerHTML="Show Wordbank";
    }
}

