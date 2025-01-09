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
const retryButton = document.getElementById("retryQuiz");

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

        // Highlight selected option
        if (userResponses[index] === i) {
            button.classList.add("selected");
        }

        optionsContainer.appendChild(button);
    });

    // Manage navigation button visibility
    prevButton.style.display = index === 0 ? "none" : "inline-block";
    nextButton.textContent = index === questions.length - 1 ? "Submit" : "Next";
}

function saveResponse(questionIndex, optionIndex) {
    userResponses[questionIndex] = optionIndex;
    loadQuestion(questionIndex); // Refresh UI
}

function showResults() {
    document.getElementById("quizSection").hidden = true;
    document.getElementById("resultsSection").hidden = false;

    const scoreElement = document.getElementById("score");
    const feedbackList = document.getElementById("feedbackList");

    let score = 0;
    feedbackList.innerHTML = "";

    userResponses.forEach((response, index) => {
        const question = questions[index];
        const feedbackItem = document.createElement("li");

        if (response === question.correct) {
            score++;
            feedbackItem.textContent = `Question ${index + 1}: Correct!`;
        } else {
            feedbackItem.textContent = `Question ${index + 1}: Incorrect. The correct answer was "${
                question.options[question.correct]
            }".`;
        }

        feedbackList.appendChild(feedbackItem);
    });

    scoreElement.textContent = `You scored ${score} out of ${questions.length}!`;
}

function resetQuiz() {
    currentQuestionIndex = 0;
    userResponses.fill(null);

    document.getElementById("resultsSection").hidden = true;
    document.getElementById("welcome").hidden = false;
}

// Event Listeners
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex === questions.length - 1) {
        showResults();
    } else {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    }
});

prevButton.addEventListener("click", () => {
    currentQuestionIndex--;
    loadQuestion(currentQuestionIndex);
});

retryButton.addEventListener("click", resetQuiz);

// Start the Quiz
loadQuestion(currentQuestionIndex);



// Start Quiz button
document.getElementById("startQuiz").addEventListener("click", function () {
    document.getElementById("welcome").hidden = true;
    document.getElementById("howTo").hidden = false;
});


// Start Game button
document.getElementById("startGame").addEventListener("click", function () {
    document.getElementById("howTo").hidden = true;
    document.getElementById("quizSection").hidden = false;
});

