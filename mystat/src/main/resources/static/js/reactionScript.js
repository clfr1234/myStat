const startBtn = document.getElementById('startBtn');
const waitBtn = document.getElementById('waitBtn');
const clickBtn = document.getElementById('clickBtn');

let started = false;

let totalTime = 0;

let startedTime;
let endedTime;
let randomTime;
let waitTime;
let currentTime;

let records = [];

let cnt = 1;

function start() {
    if(cnt == 6) {
        records = [];
        document.getElementById('formDiv').style.display = "none";
    }

    started = true;


    startBtn.style.display = 'none';
    waitBtn.style.display = 'block';

    randomTime = Math.random() * 3000 + 2000;
    console.log(randomTime);
    waitTime = setTimeout(() => click(), randomTime);
}

function clickIfWait() {
    alert("아직 시작 안했는뒈....");
    waitBtn.style.display = 'block';
    window.clearTimeout(waitTime);
    start();
}

function click() {
    waitBtn.style.display = 'none';
    clickBtn.style.display = 'block';
    startedTime = new Date().getTime();

}

clickBtn.addEventListener('mousedown', function () {
    endedTime = new Date().getTime();
    if (cnt <= 5) {
        if (started) {
            let currentT = Number(endedTime - startedTime);
            records.push(currentT);
            console.log(records);
            let currentLi = document.createElement('li');
            currentLi.textContent = currentT + 'ms';
            console.log("시작시간 : " + startedTime + "\n끝난시간 : " + endedTime + "\n걸린시간 : " + currentT);
            if (cnt <= 5) {
                document.getElementById('record').appendChild(currentLi);
                totalTime += currentT;
            }
            cnt++;
            started = false;
            if (cnt <= 5) {
                clickBtn.style.display = 'none';
                waitBtn.style.display = 'block';
                start();
            } else {
                clickBtn.style.display = 'none';
                waitBtn.style.display = 'none';
                startBtn.style.display = 'none';
                document.getElementById('result').style.display = 'block';
                document.querySelector('#result').innerHTML = "평균 값 : " + totalTime / records.length + "ms";
                document.getElementById('leadBtn').style.display = 'block';
            }
        }
    }
});

function checkInput() {
    let inputName = prompt("이름 입력");
    let regex = /^[ㄱ-ㅎa-zA-Z가-힣\s]{2,}$/;
    document.getElementById('name').value = inputName;
    let name = document.getElementById('name').value;
    if(records.length != 0 && regex.test(name)) {
        document.getElementById("record_time").value = totalTime / records.length;
        document.forms['leaderboardForm'].submit();
    } else {
        alert("유효한 이름을 입력해주세요 (최소 2자 이상, 영어 또는 한국어만 허용됩니다).");
    }
}

function howToPlay(check) {
    let htpDiv = document.getElementById('howToPlayBg');
    if(check) {
        htpDiv.style.display = 'block';
    } else {
        htpDiv.style.display = 'none';
    }
}