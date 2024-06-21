const questions = [
    {
        question:"According to Bluelock Theory, What is Football about?",
        answers: [
            { text: "Being better as 11" , correct: false},
            { text: "Being the best striker" , correct: false},
            { text: "Scoring the most goals" , correct: true},
            { text: "Being the best forward" , correct: false},
        ]
    },
    {
        question:"After the Blue Lock Entrance Test, who was ranked as #275?",
        answers: [
            { text: "Isagi" , correct: false},
            { text: "Kira" , correct: false},
            { text: "Igarashi" , correct: true},
            { text: "Bachira" , correct: false},
        ]
    },
    {
        question:"Which player of Team Y passed the 1st selection?",
        answers: [
            { text: "Niko" , correct: true},
            { text: "Ohkawa" , correct: false},
            { text: "Barou" , correct:false},
            { text: "Iemon" , correct: false},
        ]
    },
    {
        question:"What is remarkable skill of Zantetsu Tsurugi?",
        answers: [
            { text: "Immense Speed" , correct:false },
            { text: "Rapid Acceleration" , correct: true},
            { text: "Direct Shoot" , correct: false},
            { text: "Dribbling" , correct: false},
        ]
    },
    {
        question:"Who is regarded as Aomori's Messi?",
        answers: [
            { text: "Yoichi Isagi" , correct:false },
            { text: "Hajime Nishioka" , correct: true},
            { text: "Seishiro Nagi" , correct: false},
            { text: "Rin Itoshi" , correct: false},
        ]
    },
    {
        question:"Which team in strata 5 had Wanima Brothers?",
        answers: [
            { text: "Team V" , correct:false },
            { text: "Team X" , correct: false},
            { text: "Team Z" , correct: false},
            { text: "Team W" , correct: true},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons= document.getElementById("answer-buttons");
const  nextButton = document.getElementById("next-btn");
const progressBar = document.getElementsByClassName('progress-bar')[0]

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score=0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    resetState()
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex+1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct =  answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}
function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display="block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `<center>You Scored ${score} out of ${questions.length}!</center>`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    console.log(currentQuestionIndex);
    // setInterval(() => {
        const computedStyle = getComputedStyle(progressBar)
        const width = parseFloat(computedStyle.getPropertyValue('--width')) || 0
        progressBar.style.setProperty('--width', width + 17)
    //   }, 5)
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
        const computedStyle = getComputedStyle(progressBar)
        const width = parseFloat(computedStyle.getPropertyValue('--width')) || 0
        progressBar.style.setProperty('--width', width - 102)
    }
});

startQuiz();