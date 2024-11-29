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
    while(true) {
        if(wantIt) {
            let name = prompt("학번 이름 입력\n* 학번과 이름을 정확하게 기재하지 않을 시\n상품 지급이 되지 않을 수 있습니다.\n예)10101 김도제");
            if(name) {
                let frm = document.forms['cpsForm'];
                frm.name.value = name;
                frm.cps.value = resultCps;
                frm.submit();
                break;
            } else {
                alert("학변과 이름을 입력해주세요.");
            }
        }
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