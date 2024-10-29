const txt = [
    "배",
    "사과",
    "파인애플",
    "피안애플",
    "참외",
    "딸기",
    "망고스틴",
    "두리안",
    "용과",
    "수박",
    "엄준식",
    "포도",
    "거봉",
    "오렌지",
    "바나나",
    "새우",
    "코코넛",
    "마우스",
    "키보드",
    "모니터",
    "컴퓨터",
    "스마트폰",
    "발로란트",
    "고양이",
    "강아지",
    "염소",
    "돼지",
    "반지",
    "기러기",
    "참새",
    "비둘기",
    "선생님",
    "오한새", //이스터에그
    "한지원", //이스터에그
    // ".",
]

// const developerTxt = [
//     'print',
//     'scanf',
//     'function',
//     'const',
//     'let',
//     'var',
//     'int',
//     'String',
//     'char',
//     'boolean',
//     'system',
//     'select',
//     'insert',
//     'parseInt',
//     'create',
//     'delete',
//     'crud',
//     'java',
//     'python',
//     'html',
//     'css',
//     'spring',
//     'compile',
//     'mysql',
//     'sqlite',
//     'react',
//     'frontend',
//     'backend',
// ]

let comboStack = 0;
let score = 0;

$(document).ready(async function () {
    let startTime, gameStart, maxCombo = 0; // 전역변수 선언

    // 처음에 안보면 안 되는 것들, 인풋 포커스
    $('#bonusBoard').hide();
    $('#comboBoard').hide();

    function spawnBox() {
        // const randomTxt = developerTxt[Math.floor(Math.random() * developerTxt.length)];
        const randomTxt = txt[Math.floor(Math.random() * txt.length)];

        const $textBox = $(`<div class="textBox" data-value="${randomTxt}">${randomTxt}</div>`);

        const windowHeight = $(window).height();
        const windowWidth = $(window).width();

        const randomY = Math.random() * (windowHeight - 140 - 140 - 114); // 화면높이 - div크기 - footer - header
        const randomX = Math.random() * (windowWidth - (140 * 2)); // 화면 넓이 - (div크기 * 2)

        $textBox.css('top', randomY + 'px');
        $textBox.css('left', randomX + 'px');

        $('body').append($textBox);

        $textBox.animate({ // textBox의 크기가 점점 작아지게
            width: "35px",
            height: "35px",
            fontSize: "8px"
        }, 5000, () => {
            if ($textBox.parent().length > 0) {
                if (comboStack > 0) {
                    comboStack = 0;
                    $('#comboBoard').fadeOut();
                    let comboBreakSound = new Audio(`sound/combobreak.wav`);
                    comboBreakSound.currentTime = 0.12;                                                                                                                    
                    comboBreakSound.play();
                }
                $textBox.remove();
            }
        })
    }

    $('#startBtn').on('click', function () {
        $(this).css('display', 'none');
        $('#blocker').css('display', 'none'); // 버튼 클릭 시 버튼과 blocker 없앰
        $('input[type="text"]').focus();
        $('#comboBoard').show(); // = 시작 전 카운트다운
        $('#comboBoard>#combo').animate({ // setInterval 이전에 한번 실행
            fontSize: "350px",
            opacity: "0"
        },750)

        let cnt = 4;
        const countDown = setInterval(() => {
            $('#comboBoard>#combo').css('font-size', '400px');
            $('#comboBoard>#combo').css( 'opacity', '1');
            if (cnt <= 0) {
                clearInterval(countDown);
                $('#comboBoard').hide();
                $('#comboTxt').text('COMBO'); // 공백 에서 변경
                startTime = performance.now();

                $('#typingForm').addClass('formActive'); // 시작할 때 formActive 클래스 부여
                spawnBox();
                gameStart = setInterval(() => {
                    spawnBox();
                }, 1500);
            } else {
                $('#comboBoard>#combo').text(cnt--);
                $('#comboBoard>#combo').animate({ // 카운트다운 점점 작아지면서 사라지게
                    fontSize: "350px",
                    opacity: "0"
                }, 750)
            }
        }, 1000);
    })

    $('#typingForm').on('submit', function (e) {
        e.preventDefault();
        if(!$(this).hasClass('formActive') || $('input[type=text]').val() == "") { // formActive 클래스가 없으면 그냥 리턴해버려
            $('input[type=text]').val('');   
            return;
        }
        const inputTxt = $(this).find('input[type="text"]').val();
        $('input[type=text]').val('');

        let found = false;


        $('.textBox').each(function () {
            if ($(this).data('value') === inputTxt) {
                found = true;

                let lineClearSound = new Audio(`sound/clearline.wav`);
                lineClearSound.currentTime = 0.15;
                lineClearSound.play();

                let comboSound = new Audio(`sound/combo_${comboStack}.wav`);
                if (comboStack < 16) {
                    if (comboSound) {
                        comboSound.currentTime = 0.15;
                        comboSound.play();
                    }
                } else {
                    comboSound = new Audio(`sound/combo_16.wav`);
                    comboSound.currentTime = 0.15;
                    comboSound.play();
                }

                const bonus = comboStack <= 0 ? 0 : comboStack >= 16 ? 16 * 50 : comboStack * 50;
                score += 550 + bonus;
                if (comboStack > 0) {
                    $('#bonusNum').text(bonus)
                    $('#bonusBoard').show();
                    $('#bonusBoard').fadeOut();
                }

                comboStack++;
                if (comboStack > maxCombo) {
                    maxCombo = comboStack; // 현콤보가 맥콤보 보다 높으면 현콤보를 맥콤보로 지정 
                }

                $('#combo').text(comboStack);
                $('#comboBoard').fadeIn();
                $('#score').text(score);
                $(this).remove();
                return false;
            }
        });

        if (!found) {
            comboStack = 0;
            $('#comboBoard').fadeOut();
            let comboBreakSound = new Audio(`sound/combobreak.wav`);
            comboBreakSound.currentTime = 0.12;
            comboBreakSound.play();
        }

        if (score >= 50000) {
            clearInterval(gameStart);
            $('.textBox').each(function () {
                $(this).remove();
            })

            const endTime = performance.now();
            const lateTime = ((endTime - startTime) / 1000);
            let timeText = "";
            if (lateTime > 60) {
                timeText = `${Math.floor(lateTime / 60)}분 ${(lateTime % 60).toFixed(5)}초`;
            } else {

                timeText = `${(lateTime % 60).toFixed(5)}초`;
            }

            alert(`50,000점까지 걸린 시간 ${timeText}\n최고 콤보 횟수 : ${maxCombo}`);
            let addLead = confirm("리더보드에 기록을 등록하시겠습니까?");
            if(addLead) {
                while(true) {
                    let name = prompt("이름 입력");

                    if (name) {
                        let form = document.forms["leadForm"];
                        form.name.value = name;
                        form.time_text.value = timeText;
                        form.record.value = endTime - startTime;
                        form.max_combo.value = maxCombo;
                        form.submit();
                        break;
                    } else {
                        alert("이름을 입력해주세요");
                    }
                }
            }
        }
    });
});
