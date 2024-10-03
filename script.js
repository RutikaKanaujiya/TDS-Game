const words = {
    animals: ["elephant", "tiger", "giraffe", "kangaroo", "penguin"],
    fruits: ["banana", "apple", "mango", "strawberry", "orange"],
    countries: ["germany", "france", "canada", "australia", "japan"]
};

let selectedCategory = "";
let scrambledWord = "";
let correctWord = "";
let timeLeft = 10;
let timer;

document.getElementById("start-btn").addEventListener("click", startGame);
document.getElementById("submit-btn").addEventListener("click", checkGuess);

function startGame() {
    const categorySelect = document.getElementById("category");
    selectedCategory = categorySelect.value;
    const wordArray = words[selectedCategory];
    correctWord = wordArray[Math.floor(Math.random() * wordArray.length)];
    scrambledWord = scrambleWord(correctWord);

    document.getElementById("scrambled-word").innerText = scrambledWord;
    document.getElementById("game-section").classList.remove("hidden");
    document.getElementById("message").innerText = "";
    document.getElementById("guess").value = "";
    resetTimer();
}

function scrambleWord(word) {
    const shuffled = word.split('').sort(() => Math.random() - 0.5);
    return shuffled.join('');
}

function checkGuess() {
    const userGuess = document.getElementById("guess").value.toLowerCase();
    if (userGuess === correctWord) {
        document.getElementById("message").innerText = "Correct! You guessed the word.";
        clearInterval(timer);
    } else {
        document.getElementById("message").innerText = "Incorrect! Try again.";
    }
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 10;
    document.getElementById("timer").innerText = `Time left: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = `Time left: ${timeLeft}s`;
        if (timeLeft === 0) {
            clearInterval(timer);
            document.getElementById("message").innerText = `Time's up! The word was: ${correctWord}`;
        }
    }, 1000);
}
