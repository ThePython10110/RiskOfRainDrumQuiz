import {trackData} from "./trackData.js"
// in case you misunderstand, this is *data* about *tracks*, not a script that *tracks data*

const drumPlayer = document.getElementById("drumPlayer");
const fullPlayer = document.getElementById("fullPlayer");
const startButton = document.getElementById("startButton");
const checkButton = document.getElementById("checkButton");
const switchButton = document.getElementById("switchButton");
const answerText = document.getElementById("answerText")
const fadeAmount = 1;
const volMax = 0.7;
var fadeTarget = 0;
var fade = 0;
var currentTrack;

startButton.addEventListener("click", startTrack);
checkButton.addEventListener("click", checkAnswer);
switchButton.addEventListener("click", switchTracks);

function startTrack() {
    currentTrack = trackData[Math.floor(Math.random() * trackData.length)];
    drumPlayer.src = currentTrack.drums;
    fullPlayer.src = currentTrack.full;
    fadeTarget = 0;
    fade = 0;
    drumPlayer.hidden = false;
    fullPlayer.hidden = true;
    checkButton.hidden = false;
    checkButton.disabled = false;
    switchButton.hidden = true;
    answerText.classList.add("hidden")
}

function checkAnswer() {
    if (!currentTrack || !fullPlayer.hidden) {return;}
    fadeTarget = 0; // hacky spaghetti code but I don't care; this probably isn't necessary anyway
    switchTracks();
    checkButton.hidden = true;
    switchButton.hidden = false;
    answerText.innerHTML = currentTrack.title;
    answerText.classList.remove("hidden")
}

function switchTracks() {
    if (fadeTarget == 0) {
        fadeTarget = 100;
        fullPlayer.currentTime = drumPlayer.currentTime;
        fullPlayer.playbackRate = drumPlayer.playbackRate;
        drumPlayer.hidden = true;
        fullPlayer.hidden = false;
        fullPlayer.play();
    } else {
        fadeTarget = 0;
        drumPlayer.currentTime = fullPlayer.currentTime;
        drumPlayer.playbackRate = fullPlayer.playbackRate;
        drumPlayer.hidden = false;
        fullPlayer.hidden = true;
        drumPlayer.play();
    }
}

setInterval(function() {
    if (fade < fadeTarget) {
        fade += fadeAmount;
    } else if (fade > fadeTarget) {
        fade -= fadeAmount;
    }
    drumPlayer.volume = volMax-volMax*(fade/100);
    fullPlayer.volume = volMax*(fade/100);
})