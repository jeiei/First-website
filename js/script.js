// Pelin muuttujat
var mysteryNumber = Math.ceil(Math.random()*100);
var playersGuess = 0;
var guessesRemaining = 10;
var guessesMade = 0;
var gameState = "";
var gameWon = false;
console.log(mysteryNumber);
/* Input ja output käyttöliittymästä */
var input = document.querySelector("#input");
var output = document.querySelector("#output");

// Painonappi
var button = document.querySelector("button");
button.style.cursor = "pointer";
button.addEventListener("click", clickHandler, false);

window.addEventListener("keydown", keydownHandler, false);

function keydownHandler(event) {
    if(event.keyCode === 13){
        validateInput();
    }
}

function clickHandler(){
    validateInput();
}
function validateInput(){
    playersGuess = parseInt(input.value);
    if(isNaN(playersGuess)){
        output.innerHTML = "Syötä vain numeroita";
    }
    else {
        playGame();
    }
}

function playGame(){
    guessesMade++; //guessesMade = guessesMade + 1;
    guessesRemaining--; //guessesReamaining = guessesremaining - 1;
    gameState = "Tämä oli arvaus nro: " + guessesMade + ". Sinulla on " + guessesRemaining + " arvausta jäljellä.";
    console.log(guessesMade, guessesRemaining);
    
    if (playersGuess > mysteryNumber) {
        output.innerHTML = "Arvauksesi oli liian iso." + gameState;
        if(guessesRemaining < 1){
            endGame();
        }
    }
    else if (playersGuess < mysteryNumber) {
        output.innerHTML = "Arvauksesi oli liian pieni." + gameState;
        if(guessesRemaining < 1) {
            endGame();
        }
    }
    else {
        gameWon = true;
        endGame();
    }
}

function endGame() {
    if(gameWon){
        output.innerHTML = "Hienoa! Arvasit oikein. Sinulla kului " + guessesMade + " arvausta.";
    }
    else {
        output.innerHTML = "Ei enää arvauksia jäljellä. Salainen numero oli: " + mysteryNumber;
    }
    button.removeEventListener("click", clickHandler, false);
    window.removeEventListener("keydown", keydownHandler, false);
    button.disabled = true;
    input.disabled = true;
}



    

