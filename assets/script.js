var startButton = document.querySelector(".start-quiz")
var timerElement = document.querySelector(".timer-start")
var questionBox = document.querySelector("#question-box")



var quizFinished = false;
var timeLeft = 60;
var currentIndex = 0;

var questions = [
    {
        question: "Which of these is a Javascript Data Type?",
        answers: [
            "1. Number",
            "2. String",
            "3. Boolean",
            "4. All of the Above"
        ]
    },
    {
        question: "Which of these is a pop-up box?",
        answers: [
            "1. Tent",
            "2. Prompt",
            "3. Emerge",
            "4. Arise"
        ]
    },
    {
        question: "What dose the === Operator mean?",
        answers: [
            "1. Not a Number",
            "2. Delete",
            "3. Strictly Equal",
            "4. It isn't used in Javascript"
        ]
    },
    {
        question: "What method is used to append an element to an Array by passing an arguement?",
        answers: [
            "1. Push",
            "2. Bind",
            "3. Apply",
            "4. Poach"
        ]
    }
]

function showQuizQuestion(index) {
    var question = document.createTextNode(questions[index].question);
    questionBox.appendChild(question);
    var ol = document.createElement("OL");
    for (answer of questions[index].answers) {
        var li = document.createElement("LI");
        var txt = document.createTextNode(answer);
        li.appendChild(txt);
        ol.appendChild(li);
    }
    questionBox.appendChild(ol);
}

function nextQuestion() {

}

//when start the quiz button is clicked, quiz will begin (timer starts and first question populates)
function startTheQuiz() {
    quizFinished = false;
    timeLeft = 60;
    startButton.disabled = true;
    startTheTimer()
    showQuizQuestion(currentIndex)
}

// when you finish the quiz with time left
function youDidIt () {
    questionbox.textContent = "Great Job! Enter your Initials to save your score!"
    startButton.disabled = false;
}

// when you run out of time
function timesUpScore () {
    questionBox.textContent = "Oh No!! Enter your intials to save your score, but please try again!"
    startButton.disabled = false;
}

//start the timer functions as both a start and stop, which leads to a finished quiz or a timesUp function
function startTheTimer () {
    timeTracker = setInterval(function() {
        timeLeft -= 1;
        timerElement.textContent = timeLeft;
    if (timeLeft >= 0) {
        if (timeLeft && quizFinished > 0) {
        clearInterval(timeTracker);
        youDidIt()
        }
    }
    if (timeLeft === 0) {
        // Clears interval
        clearInterval(timeTracker);
        timesUpScore();
    }
}, 1000);
}

// event listener to start the quiz
startButton.addEventListener("click", startTheQuiz);

