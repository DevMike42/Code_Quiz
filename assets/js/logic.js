// GLOBAL VARIABLES
// =============================================

// Global variables for tracking quiz state
let currQuestionIndex = 0;
let time = questions.length * 15;
var timer;

// Global variables for referencing DOM elements
const timerEl = document.getElementById('time');
const startBtn = document.getElementById('start');
const startScreen = document.getElementById('start-screen');
const questionsEl = document.getElementById('questions-box');
const choicesEl = document.getElementById('choices');
const feedbackEl = document.getElementById('feedback');


// FUNCTIONS
// =============================================

// Start Quiz
const startQuiz = function () {
  // hide start screen
  startScreen.setAttribute('class', 'hide');
  // show questions box
  questionsEl.removeAttribute('class');

  // TODO: start timer and display
  timer = setInterval(clockTick, 1000);

  timerEl.textContent = time;

  // execute getQuestion() function
  getQuestion();
}

// Get Question
const getQuestion = function () {
  // get first question from questions array
  const currentQuestion = questions[currQuestionIndex];

  // update UI with title and choices from question
  const questionTitleEl = document.getElementById('question-title');
  questionTitleEl.textContent = currentQuestion.title;

  choicesEl.innerHTML = '';

  currentQuestion.choices.forEach(function (choice, i) {
    const choiceNode = document.createElement('button');
    choiceNode.setAttribute('class', 'choice');
    choiceNode.setAttribute('value', choice);
    choiceNode.textContent = `${i + 1}. ${choice}`;

    choiceNode.onclick = gradeQuestion;

    choicesEl.appendChild(choiceNode);
  });

}

// Grade Question
const gradeQuestion = function () {
  // check user's guess against correct answer
  if (this.value !== questions[currQuestionIndex].answer) {
    // penalize time
    time -= 15;
    if (time < 0) {
      time = 0;
    }
    timerEl.textContent = time;

    feedbackEl.textContent = 'Wrong!';
  } else {
    feedbackEl.textContent = 'Correct!'
  }

  // Display feedback element for 1 second
  feedbackEl.setAttribute('class', 'feedback');
  setTimeout(function () {
    feedbackEl.setAttribute('class', 'feedback hide');
  }, 1500);

  currQuestionIndex++;

  if (currQuestionIndex === questions.length) {
    endQuiz();
  } else {
    getQuestion();
  }
}

// Timer clock tick
const clockTick = function () {
  time--;
  timerEl.textContent = time;

  if (time <= 0) {
    endQuiz();
  }
}

// End Quiz
const endQuiz = function () {
  clearInterval(timer);
  console.log("GAME OVER");

}


// EVENT LISTENERS
// =============================================
startBtn.onclick = startQuiz;
