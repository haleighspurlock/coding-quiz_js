var startButton = document.querySelector(".start-quiz")
var timerElement = document.querySelector(".timer-start")
var questionBox = document.querySelector("#question-box")



var quizFinished = false;
var timeLeft = 60;
var currentIndex = 0;
var finalScore = 0;

// questions and answer object

var questions = [
    {
        question: "Which of these is a Javascript Data Type?",
        answers: [ 
            "Number", 
            "String", 
            "Boolean", 
            "All of the Above"
        ],
        
        correctAnswer : "All of the Above"
    },
    {
        question: "Which of these is a pop-up box?",
        answers: [
           "Tent",
           "Prompt", 
           "Emerge",
           "Arise"
        ],
        correctAnswer : "Prompt"
    },
    {
        question: "What does the === Operator mean?",
        answers: [
           "Not a Number",
           "Delete",
           "Strictly Equal", 
           "It isn't used in JavaScript"
        ],
        correctAnswer : "Strictly Equal"
    },
    {
        question: "What method is used to append an element to an Array by passing an arguement?",
        answers: [
           "Push", 
           "Bind",
           "Apply",
           "Poach"
        ],
        correctAnswer: "Push"
    }
]

// show and iterates through current quiz question
function showQuizQuestion() {
    var answerWrapper = document.createElement("DIV");
    answerWrapper.setAttribute("id", "answerWrapper");
    var question = document.createTextNode(questions[currentIndex].question);
    questionBox.innerHTML = ""
    answerWrapper.appendChild(question);
    var ol = document.createElement("OL");
    for (currentAnswer of questions[currentIndex].answers) {
        var li = document.createElement("LI");
        li.addEventListener("click", answerClicked);
        var txt = document.createTextNode(currentAnswer);
        li.appendChild(txt);
        ol.appendChild(li);
    }
    answerWrapper.appendChild(ol);
    questionBox.appendChild(answerWrapper);
}

// what happens when a question is answered
function answerClicked(event) {
    if (currentIndex === questions.length -1){
        console.log("ALL DONE!")
        quizFinished = true;
        highScoreForm()
    }
    else if (event.target.textContent !== questions[currentIndex].correctAnswer) {
        console.log("Wrong!")
        timeLeft = timeLeft - 10;
        timerElement.textContent = timeLeft;
        currentIndex++;
        showQuizQuestion()
    }
    else if (event.target.textContent === questions[currentIndex].correctAnswer) {
        console.log("Correct!")
        currentIndex++;
        showQuizQuestion()
    }

}

// gets initials and scores and sends to new high score page
function highScorePage() {
    var enterInitials = document.getElementById("enterInitials");
    finalScore = finalScore + timeLeft;

    var player = {
        initials: enterInitials.value,
        score: finalScore
    }
    var retrieveScores = localStorage.getItem("player");
    var players  = JSON.parse(retrieveScores);
    if (players !== null){
        players.push(player)
    }
    else players = [player]
    localStorage.setItem("player", JSON.stringify(players))
    window.location.replace("./highscore.html") 
}

// sets the form/button to get score
function highScoreForm(){
    document.getElementById("question-box").innerHTML = "";

    var scoreForm = document.createElement("DIV");
    scoreForm.setAttribute("id", "scoreForm");

    var enterInitials = document.createElement("INPUT");
    enterInitials.setAttribute("id", "enterInitials");
    enterInitials.setAttribute("placeholder", "Please Enter Initials");
    scoreForm.appendChild(enterInitials);

    var submitButton = document.createElement("BUTTON");
    var buttonText = document.createTextNode("Submit");
    submitButton.appendChild(buttonText);
    submitButton.addEventListener("click", highScorePage);
    scoreForm.appendChild(submitButton);

    questionBox.appendChild(scoreForm);
    }


//when start the quiz button is clicked, quiz will begin (timer starts and first question populates)
function startTheQuiz() {
    quizFinished = false;
    timeLeft = 60;
    startButton.disabled = true;
    startTheTimer()
    showQuizQuestion()
}

//start the timer functions as both a start and stop, which leads to a finished quiz or a timesUp function
function startTheTimer () {
    timeTracker = setInterval(function() {
        timeLeft -= 1;
        timerElement.textContent = timeLeft;
    if (timeLeft >= 0) {
        if (timeLeft && quizFinished > 0) {
        clearInterval(timeTracker);
        highScoreForm()
        }
    }
    if (timeLeft === 0) {
        // Clears interval
        clearInterval(timeTracker);
        highScoreForm()
    }
}, 1000);
}

// event listener to start the quiz
startButton.addEventListener("click", startTheQuiz);

