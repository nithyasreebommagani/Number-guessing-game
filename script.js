let number;
let attempts;
let max;
let history=[];

const message=document.getElementById("message");
const hint=document.getElementById("hint");
const attemptsDisplay=document.getElementById("attempts");
const historyDisplay=document.getElementById("history");

function startGame(){

let difficulty=document.getElementById("difficulty").value;

if(difficulty==="easy"){max=50;attempts=10;}
if(difficulty==="medium"){max=100;attempts=7;}
if(difficulty==="hard"){max=200;attempts=5;}

number=Math.floor(Math.random()*max)+1;

history=[];

attemptsDisplay.textContent=attempts;

historyDisplay.textContent="";

message.textContent="";
hint.textContent="";

document.getElementById("guessInput").value="";

}

function checkGuess(){

let guess=Number(document.getElementById("guessInput").value);

if(!guess) return;

attempts--;

history.push(guess);

attemptsDisplay.textContent=attempts;

historyDisplay.textContent="Guesses: "+history.join(", ");

if(guess===number){

message.textContent="🎉 Correct! You Win!";
hint.textContent="🥳 Amazing guess!";

celebrate();
playSound("winSound");

saveScore();

return;

}

else if(guess<number){

message.textContent="⬇ Too Low";
playSound("wrongSound");

}

else{

message.textContent="⬆ Too High";
playSound("wrongSound");

}

generateHint(guess);

if(attempts<=0){

message.textContent="💀 Game Over! Number was "+number;
hint.textContent="";

playSound("loseSound");

}

}

function generateHint(guess){

let difference=Math.abs(number-guess);

if(difference<=3){

hint.textContent="🔥 AI Hint: You are VERY close!";

}

else if(difference<=10){

hint.textContent="🤖 AI Hint: Getting warmer.";

}

else if(guess<number){

hint.textContent="🤖 AI Hint: Try a higher number.";

}

else{

hint.textContent="🤖 AI Hint: Try a lower number.";

}

}

function celebrate(){

confetti({
particleCount:150,
spread:90,
origin:{y:0.6}
});

}

function playSound(id){

let sound=document.getElementById(id);

sound.pause();
sound.currentTime=0;

sound.play();

}

function saveScore(){

let best=localStorage.getItem("bestScore");

if(!best || attempts>best){

localStorage.setItem("bestScore",attempts);
document.getElementById("bestScore").textContent=attempts;

}

}

function loadScore(){

let best=localStorage.getItem("bestScore");

if(best) document.getElementById("bestScore").textContent=best;

}

document.getElementById("guessBtn").addEventListener("click",checkGuess);

document.getElementById("restartBtn").addEventListener("click",startGame);

document.getElementById("difficulty").addEventListener("change",startGame);

document.getElementById("guessInput").addEventListener("keypress",function(e){

if(e.key==="Enter") checkGuess();

});

loadScore();
startGame();