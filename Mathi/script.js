let randomNumber;
let attempts;
let stats = [0, 0, 0, Infinity, 0]; // [partidas jugadas, intentos totales, promedio de intentos, mínimo de intentos, máximo de intentos]

function generateRandomNumber() {
    randomNumber = Math.floor(Math.random() * 101);
    attempts = 0;
    document.getElementById('feedback').textContent = '';
    document.getElementById('userInput').value = '';
}

function checkGuess() {
    const userInput = document.getElementById('userInput').value;
    const feedback = document.getElementById('feedback');
    if (userInput.toLowerCase() === 'game over') {
        endGame();
        return;
    }
    const guess = parseInt(userInput, 10);
    if (isNaN(guess) || guess < 0 || guess > 100) {
        feedback.textContent = "Por favor, ingresa un número válido entre 0 y 100.";
        return;
    }
    attempts++;
    if (guess < randomNumber) {
        feedback.textContent = "El número es mayor. Intenta con un número más alto.";
    } else if (guess > randomNumber) {
        feedback.textContent = "El número es menor. Intenta con un número más bajo.";
    } else {
        feedback.textContent = "¡Correcto! Has adivinado el número.";
        updateStats();
        generateRandomNumber();
    }
}

function updateStats() {
    stats[0]++;
    stats[1] += attempts;
    stats[2] = (stats[1] / stats[0]).toFixed(2);
    if (attempts < stats[3]) stats[3] = attempts;
    if (attempts > stats[4]) stats[4] = attempts;
    displayStats();
}

function displayStats() {
    document.getElementById('gamesPlayed').textContent = stats[0];
    document.getElementById('totalAttempts').textContent = stats[1];
    document.getElementById('averageAttempts').textContent = stats[2];
    document.getElementById('minAttempts').textContent = stats[3] === Infinity ? 0 : stats[3];
    document.getElementById('maxAttempts').textContent = stats[4];
}

function endGame() {
    alert("Gracias por jugar. El juego ha terminado.");
    displayStats();
}

document.addEventListener('DOMContentLoaded', generateRandomNumber);
