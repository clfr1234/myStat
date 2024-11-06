let clickCount = 0;
let btn = document.getElementById("dBtn");
let countInterval;
let resultCps;
let setSecound = 10;

function cpsStart() {
   increase();
   countdown(setSecound);
   btn.setAttribute("onclick","increase(this)");
}

function increase() {
    clickCount++;
    btn.textContent = clickCount;
}

function countdown(sec) {
    countInterval = setInterval(() => {
        sec = sec - 1;
        if(sec == 0) {
            clearInterval(countInterval);
            setResult();
        }
    }, 1000);
1}

function resetf() {
    window.location.href="/cps";
}

function setResult() {
    btn.disabled = true;
    resultCps = clickCount / setSecound;
    btn.textContent = `YOUR CPS : ${resultCps}`;
    setTimeout(() => {
        addLead();
    }, 1000);
}

function addLead() {
    let wantIt = confirm("기록을 리더보드에 등록하시겠습니까?");
    if(wantIt) {
        let name = prompt("리더보드에 등록될 이름을 입력해주세요!");
        let frm = document.forms['cpsForm'];
        frm.name.value = name;
        frm.cps.value = resultCps;
        frm.submit();
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