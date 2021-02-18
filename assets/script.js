var startButton = document.querySelector(".start-quiz")
var timerElement = document.querySelector(".timer-start")
var questionBox = document.querySelector(".question-box")

var quizFinished = false;
var timeLeft = 60;

//when start the quiz button is clicked, quiz will begin (timer starts and first question populates)
function startTheQuiz() {
    quizFinished = false;
    timeLeft = 60;
    startButton.disabled = true;
    startTheTimer()
    showQuizQuestions()
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

