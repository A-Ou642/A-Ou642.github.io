// alert("running external JS code!");

//Event Listeners
document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#resetBtn").addEventListener("click", initializeGame);


//Global variables
let randomNumber;
let attempts = 0;

initializeGame();

    
function initializeGame() {
    randomNumber = Math.floor(Math.random() * 99) + 1;
    console.log("Random number:" + randomNumber);

    attempts = 0;

    // Hiding the Reset button
    document.querySelector("#resetBtn").style.display = "none";

    // Showing the Guess button
    document.querySelector("#guessBtn").style.display = "inline";

    let playerGuess = document.querySelector("#playerGuess");
    playerGuess.focus();
    playerGuess.value = "";

    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";

    // Clearing previous guesses
    document.querySelector("#guesses").textContent = "";
}


function checkGuess(){
    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";
    let guess = document.querySelector("#playerGuess").value;
    console.log("Player guess: " + guess);
    if (guess < 1 || guess > 99) {
        feedback.textContent = "Enter a number between 1 and 99";
        feedback.style.color = "red"; 
        return;
    }

    attempts++; 
    console.log("Attempts:" + attempts);

    document.querySelector("#guesses").textContent += guess + " ";

    feedback.style.color = "green";
    if (guess == randomNumber) {
        feedback.textContent = "You guessed it! You Won!";
        feedback.style.color = "blue";
        gameOver();
    } else {
        if (attempts == 7) {
            feedback.textContent = "Sorry, you lost! The number was " + randomNumber;
            feedback.style.color = "red";
            gameOver();
        } else if ( guess > randomNumber) {
            feedback.textContent = "Guess was too high";
        } else {
            feedback.textContent = "Guess was too low";
        }
    }
}

function gameOver() {
    let guessBtn = document.querySelector("#guessBtn");
    let resetBtn = document.querySelector("#resetBtn");

    guessBtn.style.display = "none"; //hides Guess Button
    resetBtn.style.display = "inline"; //displays Reset button
}

