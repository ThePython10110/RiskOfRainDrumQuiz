import {trackData} from "./trackData.js"
// in case you misunderstand, this is *data* about *tracks*, not a script that *tracks data*

const drumPlayer = document.getElementById("drumPlayer");
const fullPlayer = document.getElementById("fullPlayer");
const startButton = document.getElementById("startButton");
const checkButton = document.getElementById("checkButton");
const switchButton = document.getElementById("switchButton");
const answerText = document.getElementById("answerText");
const filterForm = document.getElementById("filterForm");
const correctButton = document.getElementById("correctButton");
const scoreDisplay = document.getElementById("scoreDisplay");
const fadeAmount = 1;
const volMax = 0.7;
var totalTracks = 0;
var score = 0;
var correct = false;
var fadeTarget = 0;
var fade = 0;
var currentTrack;
var filteredTracks = []
var groups = []

function startTrack() {
    if (filteredTracks.length == 0) {return;}
    currentTrack = filteredTracks[Math.floor(Math.random() * filteredTracks.length)];
    drumPlayer.src = currentTrack.drums;
    fullPlayer.src = currentTrack.full;
    fadeTarget = 0;
    fade = 0;
    correct = false;
    totalTracks++;
    updateScore();
    correctButton.disabled = true;
    correctButton.innerHTML = "Mark correct";
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
    answerText.innerHTML = `[${currentTrack.group}] ${currentTrack.title}`;
    answerText.classList.remove("hidden")
    correctButton.disabled = false;
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

function filterTracks() {
    var filteredGroups = []
    for (const group of groups) {
        if (document.getElementById(`checkbox-${group}`).checked == true) {
            filteredGroups.push(group);
        }
    }
    if (filteredGroups.length == 0) {
        startButton.disabled = true;
        return;
    } else {
        startButton.disabled = false;
    }
    filteredTracks = []
    for (const track of trackData) {
        if (filteredGroups.includes(track.group)) {
            filteredTracks.push(track);
        }
    }
}

function correctPress() {
    correct = !correct;
    score += (correct ? 1 : -1)
    correctButton.innerHTML = correct ? "Mark incorrect" : "Mark correct";
    updateScore();
}

function updateScore() {
    scoreDisplay.innerHTML = `${score}/${totalTracks}`
}

for (const track of trackData) {
    if (!groups.includes(track.group)) {
        groups.push(track.group);
    }
}

for (const group of groups) {
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox"
    checkbox.name = group;
    checkbox.id = `checkbox-${group}`
    checkbox.checked = true;
    checkbox.addEventListener("change", filterTracks);
    var label = document.createElement("label");
    label.for = group;
    label.innerHTML = group;
    filterForm.appendChild(checkbox)
    filterForm.appendChild(label)
    filterForm.appendChild(document.createElement("br"))
}

startButton.addEventListener("click", startTrack);
checkButton.addEventListener("click", checkAnswer);
switchButton.addEventListener("click", switchTracks);
correctButton.addEventListener("click", correctPress);

setInterval(function() {
    if (fade < fadeTarget) {
        fade += fadeAmount;
    } else if (fade > fadeTarget) {
        fade -= fadeAmount;
    }
    drumPlayer.volume = volMax-volMax*(fade/100);
    fullPlayer.volume = volMax*(fade/100);
})

filterTracks();