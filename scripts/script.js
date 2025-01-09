// scripts/script.js

// Sample Questions
const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correct: 2 // Index of the correct option
    },
    {
        question: "True or False: The sun is a star.",
        options: ["True", "False"],
        correct: 0
    },
    {
        question: "Fill in the blank: The chemical symbol for water is ___?",
        options: ["H2O", "CO2", "O2", "HO2"],
        correct: 0
    },
];

// State Variables
let currentQuestionIndex = 0;
let userResponses = new Array(questions.length).fill(null);

// DOM Elements
const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const nextButton = document.getElementById("nextButton");
const prevButton = document.getElementById("prevButton");

// Initialize Quiz
function loadQuestion(index) {
    const question = questions[index];
    questionText.textContent = question.question;
    optionsContainer.innerHTML = "";

    question.options.forEach((option, i) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.className = "option-button";
        button.onclick = () => saveResponse(index, i);
        if (userResponses[index] === i) {
            button.classList.add("selected");
        }
        optionsContainer.appendChild(button);
    });

    prevButton.style.display = index === 0 ? "none" : "inline-block";
    nextButton.style.display = index === questions.length - 1 ? "none" : "inline-block";
}

function saveResponse(questionIndex, optionIndex) {
    userResponses[questionIndex] = optionIndex;
    loadQuestion(questionIndex); // Refresh UI
}

function calculateScore() {
    let score = 0;
    userResponses.forEach((response, i) => {
        if (response === questions[i].correct) {
            score++;
        }
    });
    alert(`You scored ${score} out of ${questions.length}!`);
}

// Event Listeners
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    loadQuestion(currentQuestionIndex);
});

prevButton.addEventListener("click", () => {
    currentQuestionIndex--;
    loadQuestion(currentQuestionIndex);
});

// Start Quiz
loadQuestion(currentQuestionIndex);
