var trackData = [
    {
        "title": "Out of Whose Womb Came the Ice",
        "drums": "https://jetta.vgmtreasurechest.com/soundtracks/risk-of-rain-2-survivors-of-the-void-deep-dive-2022/djtbpadqhv/07.%20Drums%20I.mp3",
        "full": "https://jetta.vgmtreasurechest.com/soundtracks/risk-of-rain-2-survivors-of-the-void-2022/tjptcepk/04.%20Out%20of%20Whose%20Womb%20Came%20the%20Ice.mp3",
    }
];

const drumPlayer = document.getElementById("drumPlayer");
const fullPlayer = document.getElementById("fullPlayer");
const startButton = document.getElementById("startButton");
const checkButton = document.getElementById("checkButton");
const answerText = document.getElementById("answerText")
const fadeAmount = 2;
var fadeTarget = 0;
var fade = 0;
var currentTrack;

startButton.addEventListener("click", startTrack);
checkButton.addEventListener("click", checkAnswer);

function startTrack() {
    currentTrack = trackData[Math.floor(Math.random() * trackData.length)];
    drumPlayer.src = currentTrack.drums;
    fullPlayer.src = currentTrack.full;
    fade = 0;
    fadeTarget = 0;
    drumPlayer.volume = 1;
    fullPlayer.volume = 0;
    drumPlayer.hidden = false;
    fullPlayer.hidden = true;
    answerText.innerHTML = ""
}

function checkAnswer() {
    if (!currentTrack || !fullPlayer.hidden) {return;}
    fullPlayer.currentTime = drumPlayer.currentTime
    fadeTarget = 100;
    fullPlayer.play();
    answerText.innerHTML = currentTrack.title
    drumPlayer.hidden = true;
    fullPlayer.hidden = false;
}

setInterval(function() {
    if (fade == fadeTarget) {
        return;
    } else if (fade < fadeTarget) {
        fade += fadeAmount;
    } else {
        fade -= fadeAmount;
    }
    drumPlayer.volume = 1-(fade/100);
    fullPlayer.volume = fade/100;
})