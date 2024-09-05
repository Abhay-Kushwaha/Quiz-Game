const username = document.getElementById('username');
const saveBtn = document.getElementById('save');
const finalScore = document.getElementById('FinalScore');
const recent = localStorage.getItem('Recent');

if (!recent) {
    console.error("No recent score found in localStorage.");
    finalScore.innerText = "You Scored: 0";
} else {
    finalScore.innerText = "You Scored: " + recent;
}

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

username.addEventListener('keyup', () => {
    saveBtn.disabled = !username.value.trim();
});

document.getElementById('scoreForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const score = {
        score: parseInt(recent, 10),
        name: username.value.trim(),
    };

    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('../index.html');
});