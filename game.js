const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const scoreText = document.getElementById("score");

 
let currentQuestions ={};
let acceptingAnswers = false;
let score = 0;
let questionCounter =0;
let availableQuestions = [];

let questions = [
{
    question: "Commonly used data types Do Not Include?" ,
    choice1:  "<strings>" ,
    choice2:  "<booleans>" ,
    choice3:  "<alerts >" ,
    choice4:  "<numbers>" ,
    answer:  3

},

{
    question: "A very useful tool used during development and debugging is" ,
    choice1:  "<Javascript>" ,
    choice2:  "<terminal/bash>" ,
    choice3:  "<for loops>" ,
    choice4:  "<console.log>" ,
    answer: 4

},


{
    question: "String values must be enclosed within ___ when being assigned to variables." ,
    choice1: "<commas>" ,
    choice2:  "<curly brackets>" ,
    choice3:  "<quotes>" ,
    choice4:   "<parenthesis>" ,
    answer:  4

},


{
    question: "Arrays in JavaScript can be used to store?" ,
    choice1:  "<numbers and strings>" ,
    choice2:  "<other arrays>" ,
    choice3:  "<booleans>" ,
    choice4:  "<all of the above>" ,
    answer:  4

},
]


// constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 4;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    
    getNewQuestion();
};

getNewQuestion = () => {

    if (availableQuestions.length == 0 || questionCounter > MAX_QUESTIONS) {
        // go to the end page
        return window.location.assign("/end.html");
    }
    questionCounter++;
    const questionIndex = Math.floor(Math.random( ) * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice  => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click" , e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

     const classToApply = "incorrect";
    if(selectedAnswer == currentQuestion.answer) {
     const classToApply = "correct";
       
    }

    if(classToApply === "correct") {
        incrementScore(CORRECT_BONUS);
    }

        selectedChoice.parentElement.classList.add(classToApply);
        
        setTimeout ( () => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
        }, 1000);

    });
})

incrementScore = num => {
    score  += num;
    scoreText.innertext = score;
};



startGame();