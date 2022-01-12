
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

