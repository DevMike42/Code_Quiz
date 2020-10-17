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
const questionTitleEl = document.getElementById('question-title');
const choicesEl = document.getElementById('choices');
const feedbackEl = document.getElementById('feedback');
const endScreenEl = document.getElementById('end-screen');
const finalScoreEl = document.getElementById('final-score');
const initialsEl = document.getElementById('initials');
const submitBtn = document.getElementById('submit');


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
  // stop timer
  clearInterval(timer);

  // show end screen
  endScreenEl.removeAttribute('class');

  // show final score 
  finalScoreEl.textContent = time;

  // hide questions box
  questionsEl.setAttribute('class', 'hide');
}

// Save high score
const saveHighscore = function () {
  const initialsInput = initialsEl.value.trim();

  // make sure input wasn't empty
  if (initials !== '') {
    const highscores = JSON.parse(localStorage.getItem('highscores')) || [];

    // create new score object for current user
    const newScore = {
      score: time,
      initials: initialsInput
    };

    // save to local storage
    highscores.push(newScore);
    localStorage.setItem('highscores', JSON.stringify(highscores));

    // redirect to highscores.html
    window.location.href = 'highscores.html'
  }
}

// EVENT LISTENERS
// =============================================
startBtn.onclick = startQuiz;

submitBtn.onclick = saveHighscore;
