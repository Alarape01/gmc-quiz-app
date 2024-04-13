// Quiz data
let quizData = [
    {
        question: "Who Is The Current President of Nigeria?",
        answers: ["Olusegun Obasanjo", "Bola Ahmed Tinubu", "Faruqa"],
        correctAnswer: 1 // Index of correct answer in answers array
    },
    {
        question: "Which of The Option is the Correct Spelling?",
        answers: ["Gomycodde", "Gomyycode", "Gomycode"],
        correctAnswer: 2
    },
    {
        question: "What is the capital city of Nigeria?",
        answers: ["Lagos", "Abuja", "Kano"],
        correctAnswer: 1
    },
    {
        question: "Which Nigerian musician is known as the 'African Giant'?",
        answers: ["Burna Boy", "Wizkid", "Davido"],
        correctAnswer: 0
    }
    // Add more questions here
];

// Variables to track quiz state
let currentQuestion = 0;
let score = 0;
quizData = randomizeQuestions(quizData);

// Function to load current question
function loadQuestion() {
    const quizItem = document.getElementById("quiz-item");
    const currentQuizData = quizData[currentQuestion];
    quizItem.innerHTML = `
                <h2>${currentQuizData.question}</h2>
                ${currentQuizData.answers.map((answer, index) => `
                    <label>
                        <input type="radio" name="answer" value="${index}">
                        ${answer}
                    </label>
                `).join('')}
            `;
}

// Function to handle answer submission
function submitAnswer() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (!selectedAnswer) {
        return; // No answer selected
    }

    const userAnswer = parseInt(selectedAnswer.value);
    const correctAnswer = quizData[currentQuestion].correctAnswer;

    if (userAnswer === correctAnswer) {
        score++;
        document.getElementById("quiz-feedback").textContent = "Correct!";
    } else {
        document.getElementById("quiz-feedback").textContent = "Incorrect.";
    }

    // Show next button
    document.getElementById("next-btn").style.display = "block";
    // Hide submit button
    document.getElementById("submit-btn").style.display = "none";
}

// Function to handle moving to the next question
function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
        // Hide next button
        document.getElementById("next-btn").style.display = "none";
        // Show submit button
        document.getElementById("submit-btn").style.display = "block";
        // Clear feedback message
        document.getElementById("quiz-feedback").textContent = "";
    } else {
        // Quiz ended
        document.getElementById("quiz-item").innerHTML = `<h2>Quiz Completed!</h2><p>Your score: ${score}/${quizData.length}</p>`;
        // Hide next button
        document.getElementById("next-btn").style.display = "none";
        // Hide submit button
        document.getElementById("submit-btn").style.display = "none";
        // Show retake button
        document.getElementById("retake-btn").style.display = "block";
        // Clear feedback message
        document.getElementById("quiz-feedback").textContent = "";
    }
}

// Function to handle retaking the quiz
function retakeQuiz() {
    location.reload();
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function randomizeQuestions(quizData) {
    return shuffle(quizData);
}

// Event listeners
document.getElementById("submit-btn").addEventListener("click", submitAnswer);
document.getElementById("next-btn").addEventListener("click", nextQuestion);
document.getElementById("retake-btn").addEventListener("click", retakeQuiz);

// Load first question
loadQuestion();