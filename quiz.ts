export {};
interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswer: number;
}

const questions: QuizQuestion[] = [
    {
        question: "Which language is used to structure a web page?",
        options: ["Python", "HTML", "SQL", "TypeScript"],
        correctAnswer: 1
    },
    {
        question: "Which language is mainly used to style web pages?",
        options: ["CSS", "Python", "Java", "SQL"],
        correctAnswer: 0
    },
    {
        question: "What does DOM stand for?",
        options: ["Data Object Management", "Document Object Model", "Digital Output Method", "Document Order Manager"],
        correctAnswer: 1
    },
    {
        question: "Which keyword declares a variable in TypeScript?",
        options: ["define", "variable", "let", "make"],
        correctAnswer: 2
    },
    {
        question: "Which method adds an event listener to an element?",
        options: ["addEventListener()", "createEvent()", "startEvent()", "listen()"],
        correctAnswer: 0
    },
    {
        question: "Which language is used to add interactivity to web pages?",
        options: ["HTML", "CSS", "JavaScript", "SQL"],
        correctAnswer: 2
    },
    {
        question: "Which HTML tag is used to create a hyperlink?",
        options: ["<link>", "<a>", "<href>", "<url>"],
        correctAnswer: 1
    },
    {
        question: "Which CSS property changes the background color?",
        options: ["font-size", "text-align", "color", "background-color"],
        correctAnswer: 3
    },
    {
        question: "Which TypeScript type represents true or false?",
        options: ["string", "number", "boolean", "array"],
        correctAnswer: 2
    },
    {
        question: "Which method selects an HTML element by its ID?",
        options: [
            "document.querySelectorAll()",
            "document.getElementById()",
            "document.createElement()",
            "document.addEventListener()"
        ],
        correctAnswer: 1
    }
];

let currentQuestion: number = 0;
let score: number = 0;
let selectedAnswer: number | null = null;
let answerSubmitted: boolean = false;

const startButton = document.getElementById("start-btn") as HTMLButtonElement;

startButton.addEventListener("click", startQuiz);


const questionNumber = document.getElementById("question-number")!;
const scoreDisplay = document.getElementById("score")!;
const progressBar = document.getElementById("progress-bar")!;
const questionElement = document.getElementById("question")!;
const answerOptions = document.getElementById("answer-options")!;
const feedback = document.getElementById("feedback")!;

const submitButton = document.getElementById("submit-btn") as HTMLButtonElement;
const nextButton = document.getElementById("next-btn") as HTMLButtonElement;
const restartButton = document.getElementById("restart-btn") as HTMLButtonElement;

const quizScreen = document.getElementById("quiz-screen")!;
const resultScreen = document.getElementById("result-screen")!;
const finalScore = document.getElementById("final-score")!;
const resultMessage = document.getElementById("result-message")!;

function displayQuestion(): void {
    const question = questions[currentQuestion];

    questionNumber.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    scoreDisplay.textContent = `Score: ${score}`;
    progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
    questionElement.textContent = question.question;
    answerOptions.innerHTML = "";

    selectedAnswer = null;
    answerSubmitted = false;

    feedback.textContent = "";
    feedback.className = "";

    submitButton.disabled = true;
    submitButton.hidden = false;
    nextButton.hidden = true;

    question.options.forEach(function (option: string, index: number): void {
        const button = document.createElement("button");
        button.textContent = `${String.fromCharCode(65 + index)}. ${option}`;
        button.className = "answer-option";
        button.type = "button";

        button.addEventListener("click", function (): void {
            selectAnswer(index);
        });

        answerOptions.appendChild(button);
    });
}

function selectAnswer(index: number): void {
    if (answerSubmitted) {
        return;
    }

    selectedAnswer = index;

    const buttons = answerOptions.querySelectorAll<HTMLButtonElement>(".answer-option");

    buttons.forEach(function (button: HTMLButtonElement, i: number): void {
        button.classList.toggle("selected", i === index);
    });

    submitButton.disabled = false;
}

function submitAnswer(): void {
    if (selectedAnswer === null || answerSubmitted) {
        return;
    }

    answerSubmitted = true;
    const question = questions[currentQuestion];

    const buttons = answerOptions.querySelectorAll<HTMLButtonElement>(".answer-option");

    buttons.forEach(function (button: HTMLButtonElement, index: number): void {
        button.disabled = true;

        if (index === question.correctAnswer) {
            button.classList.add("correct");
        }

        if (index === selectedAnswer && selectedAnswer !== question.correctAnswer) {
            button.classList.add("incorrect");
        }
    });

    if (selectedAnswer === question.correctAnswer) {
        score++;
        feedback.textContent = "Correct! Well done.";
        feedback.className = "success";
    } else {
        feedback.textContent = `Incorrect. The correct answer is ${question.options[question.correctAnswer]}.`;
        feedback.className = "error";
    }

    scoreDisplay.textContent = `Score: ${score}`;
    submitButton.hidden = true;
    nextButton.hidden = false;
    nextButton.textContent = currentQuestion === questions.length - 1
        ? "View Results →"
        : "Next Question →";
}

function nextQuestion(): void {
    if (!answerSubmitted) {
        return;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        displayQuestion();
    } else {
        showResults();
    }
}

function showResults(): void {
    quizScreen.hidden = true;
    resultScreen.hidden = false;

    finalScore.textContent = `You scored ${score} out of ${questions.length}!`;

    const percentage: number = (score / questions.length) * 100;

    if (percentage === 100) {
        resultMessage.textContent = "Perfect score! Excellent work!";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Good job! Keep practising to improve.";
    } else {
        resultMessage.textContent = "Keep learning and try again. You can do it!";
    }

    progressBar.style.width = "100%";
}

function restartQuiz(): void {
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;
    answerSubmitted = false;

    resultScreen.hidden = true;
    quizScreen.hidden = false;

    displayQuestion();
}

function startQuiz(): void {
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;
    answerSubmitted = false;

    startScreen.hidden = true;
    quizScreen.hidden = false;
    resultScreen.hidden = true;

    displayQuestion();
}

startButton.addEventListener("click", startQuiz);
submitButton.addEventListener("click", submitAnswer);
nextButton.addEventListener("click", nextQuestion);
restartButton.addEventListener("click", restartQuiz);

startScreen.hidden = false;
quizScreen.hidden = true;
resultScreen.hidden = true;
