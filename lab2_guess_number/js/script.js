// alert("running external JS code!");

//Event Listeners
document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#resetBtn").addEventListener("click", initializeGame);


//Global variables
let randomNumber;
let attempts = 0;
let wins = 0;
let losses = 0;

initializeGame();


function initializeGame() {
    randomNumber = Math.floor(Math.random() * 99) + 1;
    console.log("Random number:" + randomNumber);

    attempts = 0;
    document.querySelector("#attemptsLeft").textContent = 7;

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
    let guess = Number(document.querySelector("#playerGuess").value);
    console.log("Player guess: " + guess);
    if (!Number.isInteger(guess) || guess < 1 || guess > 99) {
        feedback.textContent = "Enter a number between 1 and 99";
        feedback.style.color = "red"; 
        return;
    }

    attempts++; 
    console.log("Attempts:" + attempts);
    document.querySelector("#attemptsLeft").textContent = 7 - attempts;

    document.querySelector("#guesses").textContent += guess + " ";

    feedback.style.color = "green";
    if (guess == randomNumber) {
        feedback.textContent = "You guessed it! You Won with " + attempts + "attempt(s)!";
        feedback.style.color = "blue";

        wins++;
        document.querySelector("#totalWins").textContent = wins;

        gameOver();
    } else {
        if (attempts == 7) {
            feedback.textContent = "Sorry, you lost! The number was " + randomNumber;
            feedback.style.color = "red";

            losses++;
            document.querySelector("#totalLosses").textContent = losses;

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

