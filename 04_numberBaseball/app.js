'use strict';
const wrap = document.querySelector('.wrap');
const form = wrap.querySelector('form')
const input = form.querySelector('input');
const result = wrap.querySelector('.result');

let baseBall = Array(4);
let myBall;
let opportunity = 0;

function pickRandomNumber() {
    for (let i = 0; i < baseBall.length; i++) {
        baseBall[i] = Math.ceil(Math.random()* 8) + 1;
    }    
    baseBall = baseBall.join('');
}

pickRandomNumber();

function checkBall(e) {
    e.preventDefault();
    // 사용자 입력 볼 숫자 저장
    myBall = input.value;
    let strike = 0;
    let ball = 0;

    if (opportunity > 10) {
        result.innerText = `실패하셨습니다 새로고침해주세요~`;
        return
    }

    // 비교
    for(let i = 0; i < baseBall.length; i++) {
        if (baseBall === myBall) {
            result.innerText = `정답입니다!`;
            return;
        } else if (baseBall.includes(myBall[i])) {           
            if (baseBall.indexOf(myBall[i]) === i) {
                strike++;
            } else {
                ball++;
            }
        }
    }

    result.innerText = `${strike} 스트라이크 ${ball} 볼 입니다.`
    opportunity++;
    input.value = '';
}
console.log(baseBall)

form.addEventListener('submit', checkBall);
