// Quiz Questions
const questions = [
    {
        question: "What is the correct syntax to declare a JavaScript variable?",
        options: [
            "var myVariable;",
            "variable myVariable;",
            "v myVariable;",
            "variable = myVariable;",
        ],
        correctAnswer: 0,
        difficulty: "easy",
    },
    {
        question: "Which of the following is NOT a JavaScript data type?",
        options: ["String", "Boolean", "Float", "Number"],
        correctAnswer: 2,
        difficulty: "easy",
    },
    {
        question: "What is the correct syntax to comment a single line in JavaScript?",
        options: [
            "// This is a comment",
            "/* This is a comment */",
            "*#-- This is a comment --#*",
            "# This is a comment",
        ],
        correctAnswer: 0,
        difficulty: "easy",
    },
    {
        question: "Which operator is used to concatenate strings in JavaScript?",
        options: ["+", "-", "*", "/"],
        correctAnswer: 0,
        difficulty: "easy",
    },
    {
        question: "What does the '===' operator do in JavaScript?",
        options: [
            "Checks for strict equality",
            "Checks for loose equality",
            "Assigns a value to a variable",
            "Performs a logical AND operation",
        ],
        correctAnswer: 0,
        difficulty: "easy",
    },
    {
        question: "Which method is used to remove the last element from an array in JavaScript?",
        options: ["pop()", "push()", "shift()", "unshift()"],
        correctAnswer: 0,
        difficulty: "average",
    },
    {
        question: "What is the purpose of the 'querySelector()' method in JavaScript?",
        options: [
            "Selects the first element that matches a specified CSS selector",
            "Selects all elements that match a specified CSS selector",
            "Selects the parent element of a specified element",
            "Selects the next sibling element of a specified element",
        ],
        correctAnswer: 0,
        difficulty: "average",
    },
    {
        question: "Which keyword is used to declare a function in JavaScript?",
        options: ["func", "method", "def", "function"],
        correctAnswer: 3,
        difficulty: "average",
    },
    {
        question: "What is the output of the following code?\n\nconsole.log(typeof 42);",
        options: ["number", "string", "boolean", "undefined"],
        correctAnswer: 0,
        difficulty: "average",
    },
    {
        question: "Which method is used to convert a string to uppercase in JavaScript?",
        options: ["toLowerCase()", "toUpperCase()", "charAt()", "concat()"],
        correctAnswer: 1,
        difficulty: "average",
    },
    {
        question: "What does the 'push()' method do in JavaScript?",
        options: [
            "Adds one or more elements to the end of an array and returns the new length",
            "Removes the last element from an array and returns it",
            "Returns a new array with all elements that pass a test",
            "Sorts the elements of an array in place",
        ],
        correctAnswer: 0,
        difficulty: "hard",
    },
    {
        question: "Which event is triggered when a user clicks on an HTML element?",
        options: ["mouseover", "keydown", "click", "load"],
        correctAnswer: 2,
        difficulty: "hard",
    },
    {
        question: "What does the 'parseInt()' function do in JavaScript?",
        options: [
            "Parses a string and returns a floating-point number",
            "Parses a string and returns an integer",
            "Converts a value to a string",
            "Checks if a value is NaN",
        ],
        correctAnswer: 1,
        difficulty: "hard",
    },
    {
        question: "What is the purpose of the 'splice()' method in JavaScript?",
        options: [
            "Adds or removes elements from an array",
            "Returns a new array with all elements that pass a test",
            "Sorts the elements of an array in place",
            "Joins two or more arrays",
        ],
        correctAnswer: 0,
        difficulty: "hard",
    },
    {
        question: "Which operator is used to assign a default value to a variable if it is undefined?",
        options: ["||=", "??=", "?:=", "??"],
        correctAnswer: 1,
        difficulty: "hard",
    },
];

// Quiz Variables
let currentQuestion = 0;
let score = 0;

// DOM Elements
const startBtn = document.getElementById("start-btn");
const questionSection = document.getElementById("question-section");
const questionText = document.getElementById("question");
const optionsList = document.getElementById("options");
const submitBtn = document.getElementById("submit-btn");
const resultSection = document.getElementById("result-section");
const resultText = document.getElementById("result");
const explanationText = document.getElementById("explanation");
const nextBtn = document.getElementById("next-btn");
const scoreSection = document.getElementById("score-section");
const scoreText = document.getElementById("score");

// Event Listeners
startBtn.addEventListener("click", startQuiz);
submitBtn.addEventListener("click", checkAnswer);
nextBtn.addEventListener("click", nextQuestion);

// Start Quiz
function startQuiz() {
    document.getElementById("intro-section").style.display = "none";
    questionSection.style.display = "block";
    loadQuestion();
}

// Load Question
function loadQuestion() {
    const currentQuiz = questions[currentQuestion];
    questionText.textContent = currentQuiz.question;
    optionsList.innerHTML = "";

    currentQuiz.options.forEach((option, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
        <input type="radio" name="option" value="${index}">
        ${option}
        </input>`;
        optionsList.appendChild(li);
    });
}

// Check Answer
function checkAnswer() {
    const currentQuiz = questions[currentQuestion];
    const selectedOption = document.querySelector("input[name='option']:checked");

    if (selectedOption) {
        const selectedAnswer = parseInt(selectedOption.value);

        if (selectedAnswer === currentQuiz.correctAnswer) {
            score += getScoreByDifficulty(currentQuiz.difficulty);
            resultText.textContent = "Correct!";
            resultText.style.color = "green";
        } else {
            resultText.textContent = "Incorrect!";
            resultText.style.color = "red";
            explanationText.textContent = `The correct answer is: ${currentQuiz.options[currentQuiz.correctAnswer]}`;
        }

        submitBtn.style.display = "none";
        explanationText.style.display = "block";
        nextBtn.style.display = "block";
    }
}

// Get Score by Difficulty
function getScoreByDifficulty(difficulty) {
    if (difficulty === "easy") {
        return 1;
    } else if (difficulty === "average") {
        return 2;
    } else if (difficulty === "hard") {
        return 3;
    }
}

// Next Question
function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
        resultText.textContent = "";
        explanationText.textContent = "";
        submitBtn.style.display = "block";
        explanationText.style.display = "none";
        nextBtn.style.display = "none";
    } else {
        showScore();
    }
}

// Show Score
function showScore() {
    questionSection.style.display = "none";
    resultSection.style.display = "none";
    scoreSection.style.display = "block";
    const totalQuestionsScore = 5 + 5 * 2 + 5 * 3;  //5 for easy and 5*2 for average and 5*3 for hard questions
    scoreText.textContent = `Your score is: ${score}/${totalQuestionsScore}`;
}
