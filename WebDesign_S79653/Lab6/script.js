// Questions Array
const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyper Transfer Main Language",
            "Home Tool Markup Language"
        ],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "Which language is used to style web pages?",
        options: [
            "Java",
            "CSS",
            "Python",
            "C++"
        ],
        answer: "CSS"
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: [
            "print",
            "echo",
            "let",
            "display"
        ],
        answer: "let"
    },
    {
        question: "Which method displays a popup message?",
        options: [
            "prompt()",
            "alert()",
            "console()",
            "write()"
        ],
        answer: "alert()"
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        options: [
            "<!-- -->",
            "#",
            "//",
            "**"
        ],
        answer: "//"
    }
];

// Variables
let shuffledQuestions = [];
let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timer;

// Shuffle questions
function shuffleQuestions() {
    shuffledQuestions = [...questions];

    for (let i = shuffledQuestions.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        [shuffledQuestions[i], shuffledQuestions[j]] =
        [shuffledQuestions[j], shuffledQuestions[i]];
    }
}

// Start timer
function startTimer() {
    clearInterval(timer);
    timeLeft = 15;

    document.getElementById("timer").innerText =
        "Time: " + timeLeft + "s";

    timer = setInterval(function() {
        timeLeft--;

        document.getElementById("timer").innerText =
            "Time: " + timeLeft + "s";

        if (timeLeft <= 0) {
            clearInterval(timer);

            document.getElementById("feedback").innerText =
                "Time is up!";
            document.getElementById("feedback").className =
                "incorrect";

            disableOptions();
            document.getElementById("nextBtn").disabled = false;
        }
    }, 1000);
}

// Display question
function displayQuestion() {
    const q = shuffledQuestions[currentQuestion];

    document.getElementById("question").innerText =
        q.question;

    document.getElementById("options").innerHTML = "";
    document.getElementById("feedback").innerText = "";
    document.getElementById("feedback").className = "";

    document.getElementById("nextBtn").disabled = true;

    q.options.forEach(function(option) {
        const button = document.createElement("button");

        button.innerText = option;
        button.className = "option-btn";

        button.onclick = function() {
            checkAnswer(option);
        };

        document.getElementById("options").appendChild(button);
    });

    startTimer();
}

// Check answer
function checkAnswer(selectedAnswer) {
    clearInterval(timer);

    const correctAnswer =
        shuffledQuestions[currentQuestion].answer;

    if (selectedAnswer === correctAnswer) {
        score++;

        document.getElementById("feedback").innerText =
            "Correct Answer!";
        document.getElementById("feedback").className =
            "correct";
    } else {
        document.getElementById("feedback").innerText =
            "Incorrect! Correct answer: " + correctAnswer;
        document.getElementById("feedback").className =
            "incorrect";
    }

    disableOptions();
    document.getElementById("nextBtn").disabled = false;
}

// Disable answer buttons
function disableOptions() {
    const buttons = document.querySelectorAll(".option-btn");

    buttons.forEach(function(button) {
        button.disabled = true;
    });
}

// Move to next question
function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < shuffledQuestions.length) {
        displayQuestion();
    } else {
        finishQuiz();
    }
}

// Finish quiz and display score
function finishQuiz() {
    clearInterval(timer);

    document.getElementById("quiz").style.display = "none";
    document.getElementById("result").style.display = "block";

    document.getElementById("score").innerText =
        "Your score: " + score + " / " + questions.length;
}

// Start quiz
function startQuiz() {
    clearInterval(timer);

    currentQuestion = 0;
    score = 0;

    document.getElementById("quiz").style.display = "block";
    document.getElementById("result").style.display = "none";

    shuffleQuestions();
    displayQuestion();
}

// Automatically start the quiz
startQuiz();