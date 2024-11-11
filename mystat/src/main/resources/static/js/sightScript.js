const levels = [
    { count: 4, timeLimit: 7 },
    { count: 9, timeLimit: 6 },
    { count: 16, timeLimit: 5 },
    { count: 25, timeLimit: 4 },
    { count: 36, timeLimit: 3 },
];

const letter = ["도제", "축제", "은행제", "아이티", "방학", "크리스마스", "루돌프", "카카오톡", "창의경영고", "카페라떼"];
const change = ["도재", "죽제", "은헹제", "이아티", "방확", "크리스미스", "루들프", "카카오독", "창의겅영고", "카페라때"];
//const change = ["","","","","","","","","",""];
let currentLevel = 0;
let timer;
let timeLeft;
let answeredCorrectly = false;
let gameOverFlag = false;
let changedValue;

const levelDiv = document.getElementById('levelDiv');
const startBtn = document.getElementById('start-btn');
const gameDiv = document.getElementById('game');
const message = document.getElementById("message");
const nextBtn = document.getElementById("next-btn");
const restartGameBtn = document.getElementById("restart-game-btn");
const progressBar = document.getElementById("progress-bar");

startBtn.addEventListener('click', startGame);
nextBtn.addEventListener('click', nextLevel);
restartGameBtn.addEventListener('click', restartGame);

function startGame() {
    startBtn.style.display = "none";
    gameDiv.style.display = "flex";
    gameDiv.style.opacity = 1;
    createGame(currentLevel);
}

function createGame(level) {
    const { count, timeLimit } = levels[level];

    const startIndex = level === 0 ? 0 :
        level === 1 ? 2 :
            level === 2 ? 4 :
                level === 3 ? 6 :
                    level === 4 ? 8 : 0;

    const endIndex = level === 0 ? 2 :
        level === 1 ? 4 :
            level === 2 ? 6 :
                level === 3 ? 8 :
                    level === 4 ? 10 : 0;

    const rn = Math.floor(Math.random() * (endIndex - startIndex)) + startIndex;
    const letters = letter[rn];
    changedValue = change[rn];

    const grid = Math.sqrt(count);
    const lettersContainer = document.getElementById("letters");
    lettersContainer.style.gridTemplateColumns = `repeat(${grid}, 1fr)`;
    lettersContainer.innerHTML = "";

    const correctIndex = Math.floor(Math.random() * count);

    for (let i = 0; i < count; i++) {
        const letterButton = document.createElement("button");
        letterButton.textContent = i === correctIndex ? changedValue : letters;
        letterButton.onclick = () => checkAnswer(i === correctIndex);
        lettersContainer.appendChild(letterButton);
    }

    message.textContent = `남은 시간: ${timeLimit}초`;
    timeLeft = timeLimit;
    updateProgressBar(timeLimit);

    clearInterval(timer);
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateProgressBar(timeLeft);
            message.textContent = `남은 시간: ${timeLeft}초`;
        } else {
            clearInterval(timer);
            gameOver(true);
        }
    }, 1000);
}

function updateProgressBar(timeLeft) {
    const { timeLimit } = levels[currentLevel];
    const percentage = (timeLeft / timeLimit) * 100;
    progressBar.style.width = `${percentage}%`;
}

function checkAnswer(isCorrect) {
    const lettersContainer = document.getElementById("letters");
    const buttons = lettersContainer.querySelectorAll("button");
    buttons.forEach((button) => {
        if (button.textContent === changedValue) {
            button.classList.add("glow");
        }
    });
    clearInterval(timer);

    if (answeredCorrectly || gameOverFlag) return;

    if (isCorrect) {
        answeredCorrectly = true;
        message.textContent = "정답입니다!";
        levelDiv.textContent = ``;

        if (currentLevel === 4) {
            document.getElementById("congratulations").textContent = "축하합니다! 모든 단계를 완료했습니다!";
            document.getElementById("congratulations").style.display = "block";
            gameDiv.style.display = 'none';
            restartGameBtn.style.display = "block";
            nextBtn.style.display = "none";
            return;
        }

        nextBtn.style.display = "block";
    } else {
        gameOver(false);
    }
}

function nextLevel() {
    currentLevel++;
    answeredCorrectly = false;
    nextBtn.style.display = "none";
    createGame(currentLevel);
    levelDiv.textContent = `${currentLevel+1}단계`;
}

function gameOver(isTimeUp) {
    gameOverFlag = true;
    clearInterval(timer);
    message.textContent = isTimeUp ? "시간이 다 되었습니다!" : "게임 오버!";
    const lettersContainer = document.getElementById("letters");
    const buttons = lettersContainer.querySelectorAll("button");
    buttons.forEach((button) => {
        if (button.textContent === changedValue) {
            button.classList.add("glow");
        }
    });
    restartGameBtn.style.display = "block";
    levelDiv.textContent = ``;
    nextBtn.style.display = "none";
}

function restartGame() {
    currentLevel = 0;
    answeredCorrectly = false;
    gameOverFlag = false;
    message.textContent = "";
    document.getElementById("congratulations").style.display = "none";
    restartGameBtn.style.display = "none";
    startBtn.style.display = "block";
    gameDiv.style.display = "none";
    progressBar.style.width = '100%';
}

function howToPlay(check) {
    let htpDiv = document.getElementById('howToPlayBg');
    if(check) {
        htpDiv.style.display = 'block';
    } else {
        htpDiv.style.display = 'none';
    }
}