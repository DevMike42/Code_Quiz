// GLOBAL VARIABLES
// =============================================

// Global variables for tracking quiz state
let currQuestionIndex = 0;

// Global variables for referencing DOM elements
const startBtn = document.getElementById('start');
const startScreen = document.getElementById('start-screen');
const questionsEl = document.getElementById('questions-box');
const choicesEl = document.getElementById('choices');


// FUNCTIONS
// =============================================

// Start Quiz
const startQuiz = function () {
  // hide start screen
  startScreen.setAttribute('class', 'hide');
  // show questions box
  questionsEl.removeAttribute('class');

  // TODO: start timer and display

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


  currQuestionIndex++;
  getQuestion();

}

// End Quiz


// EVENT LISTENERS
// =============================================
startBtn.onclick = startQuiz;
