// importing piano ui from old thing
var keys = [];
		keys[0] = Array.from(document.getElementById('whitekeys').children);
		keys[1] = Array.from(document.getElementById('blackkeys').children);

var naturalNotes = "cdefgab";

function elemForNote(noteName) {
	var noteNum = naturalNotes.indexOf(noteName[0]);
	var sharp = (noteName.length == 2) ? 1 : 0;
	return keys[sharp][noteNum];
}