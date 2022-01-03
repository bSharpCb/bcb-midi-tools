<!DOCTYPE html>
<html>
    <head>
        <?php
            function get_that_filetime($file_url = false) {
                if($file_url && file_exists($file_url)) {
                    return filemtime($file_url);
                }
            }
        ?>
        <title>Piano</title>
        <link rel="stylesheet" type="text/css" href="./index.css?ver=<?php echo get_that_filetime($_SERVER['DOCUMENT_ROOT'] . '/index.css'); ?>">
    </head>
    <body>
        <ul>
            <li class="white c">C</li>
            <li class="black cs">C#</li>
            <li class="white d">D</li>
            <li class="black ds">D#</li>
            <li class="white e">E</li>
            <span class="black" style="display: none"></div>
            <li class="white f">F</li>
            <li class="black fs">F#</li>
            <li class="white g">G</li>
            <li class="black gs">G#</li>
            <li class="white a">A</li>
            <li class="black as">A#</li>
            <li class="white b">B</li>
            <span class="black" style="display: none"></div>
            <li class="white c">C</li>
            <li class="black cs">C#</li>
            <li class="white d">D</li>
            <li class="black ds">D#</li>
            <li class="white e">E</li>
            <span class="black" style="display: none"></div>
            <li class="white f">F</li>
            <li class="black fs">F#</li>
            <li class="white g">G</li>
            <li class="black gs">G#</li>
            <li class="white a">A</li>
            <li class="black as">A#</li>
            <li class="white b">B</li>
        </ul>
        <div class="nav">
                <select id="keysig" class="dropdown">
                    <option value="0">C</option>
                    <option value="1">C#</option>
                    <option value="2">D</option>
                    <option value="3">D#</option>
                    <option value="4">E</option>
                    <option value="5">F</option>
                    <option value="6">F#</option>
                    <option value="7">G</option>
                    <option value="8">G#</option>
                    <option value="9">A</option>
                    <option value="10">A#</option>
                    <option value="11">B</option>
                </select>
    
    
                <select id="scale" class="dropdown">
                    <option value="1">Major</option>
                    <option value='2'>Natural Minor</option>
                    <option value="3">Harmonic Minor</option>
                    <option value="4">Melodic Minor</option>
                    <option value="5">Phrygian Dominant</option>
                    <option value="6">Dorian Mode</option>
                    <option value="7">Phrygian Mode</option>
                    <option value="8">Lydian Mode</option>
                    <option value="9">Mixolydian Mode</option>
                    <option value="10">Locrian Mode</option>
                </select>
                    <button onclick="blueNote()" class="button">Generate scale</button>
                
                    <button onclick="makeKeys()" class="button">Clear keys</button>
        </div>

        <div class="topNav">
                <h1>
                    <a href='/'>B#Cb</a>
                </h1>
                <a href='https://www.linkedin.com/in/bradley-shaffer-9a8b5772/' target="_blank">LinkedIn</a>
                <a href='https://github.com/bSharpCb' target="_blank">Github</a>
                <img src="./img/faceEdited.png" class="proPic">
                <!-- update img src to use php autofill -->
            </div>


        <script type="text/javascript" src="./index.js?ver=<?php echo get_that_filetime($_SERVER['DOCUMENT_ROOT'] . '/index.js'); ?>"></script>
    </body>
</html>