const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progress = document.getElementById('progress');
const ScoreText = document.getElementById('score');
const ProgressBarFull = document.getElementById('ProgressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');
let current = {};
let accept = false;
let score = 0;
let QuesCounter = 0;
let available = [];
let questions = [];

fetch("questions.json")
    .then((res) => {
        return res.json();
    })
    .then((loaded) => {
        console.log(loaded);
        questions = loaded;
        startgame();
    })
    .catch((err) => {
        console.error(err);
    });

const Points = 10;
const MaxQues = 5;

startgame = () => {
    QuesCounter = 0;
    score = 0;
    available = [...questions];
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
};

getNewQuestion = () => {
    if (available.length === 0 || QuesCounter >= MaxQues) {
        localStorage.setItem('Recent', score);
        //go to the end page
        return window.location.assign('end.html');
    }
    QuesCounter++;
    progress.innerText = `Question ${QuesCounter}/${MaxQues}`;
    ProgressBarFull.style.width = `${(QuesCounter / MaxQues) * 100}%`;

    const Index = Math.floor(Math.random() * available.length);
    current = available[Index];
    question.innerHTML = current.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = current['choice' + number];
    });

    available.splice(Index, 1);
    accept = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!accept) return;

        accept = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        const Apply = selectedAnswer == current.answer ? 'correct' : 'incorrect';

        if (Apply === 'correct') {
            incrementScore(Points);
        }

        selectedChoice.parentElement.classList.add(Apply);
        
        time = 15;
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(Apply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = (num) => {
    score += num;
    ScoreText.innerText = score;
};

let time = 15;
function update() {
    if (time === 0) {
        time = 15;
        getNewQuestion();
    } else {
        document.getElementById("time").innerHTML = time--;
    }
}
update();
setInterval(update, 1000);

