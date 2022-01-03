var keys = [];
keys[0] = Array.from(document.getElementsByClassName('white'));
keys[1] = Array.from(document.getElementsByClassName('black'));

var naturalNotes = "cdefgab";

function elemForNote(noteName, colorString) {
var noteNum = naturalNotes.indexOf(noteName[0]);
var sharp = (noteName.length == 2) ? 1 : 0;
keys[sharp][noteNum].style = "color: aliceblue;background:" + colorString + ";";
keys[sharp][noteNum+7].style = "color: aliceblue;background:" + colorString + ";";

}

function reset(elem) {
elem.style = "";
}



//scale intervals
notes = ['c','c#','d','d#','e','f','f#','g','g#','a','a#','b'];
major = [2,2,1,2,2,2];
naturalMinor = [2,1,2,2,1,2];
harmonicMinor = [2,1,2,2,1,3];
melodicMinor = [2,1,2,2,2,2];
phrygianDominant = [1,3,1,2,1,2];
modeDorian = [2,1,2,2,2,1];
modePhyrigian = [1,2,2,2,1,2];
modeLydian = [2,2,2,1,2,2];
modeMixolydian = [2,2,1,2,2,1];
modeLocrian = [1,2,2,1,2,2];




function octaveAdjust(n){
if(n>11){
return notes[n-12];
}else{
return notes[n];
}
}

function makeKeys(){
keys[0].forEach(reset);
keys[1].forEach(reset);
}

makeKeys();

function intervals(key,intervalArray){
var rootNote = notes.indexOf(key);
var second = rootNote + intervalArray[0];
var third = second + intervalArray[1];
var fourth = third + intervalArray[2];
var fifth = fourth + intervalArray[3];
var sixth = fifth + intervalArray[4];
var seventh = sixth + intervalArray[5];

myScale =[rootNote,second,third,fourth,fifth,sixth,seventh];
return myScale.map(octaveAdjust);
}



function blueNote(){
makeKeys();
var key = document.getElementById('keysig').value;
var sc_id = document.getElementById('scale').value;
var intervalArray = ['nothing',major,naturalMinor,harmonicMinor,melodicMinor,phrygianDominant, modeDorian, modePhyrigian, modeLydian, modeMixolydian, modeLocrian];
var scale = intervals(notes[key],intervalArray[sc_id]);
for(var m = 0; m < 7; m++){
elemForNote(scale[m],"blue");	   		
}
}