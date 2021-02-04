'use strict';
const wrap = document.querySelector('.wrap');
const form = wrap.querySelector('form')
const input = form.querySelector('input');
const result = wrap.querySelector('.result');
const log = wrap.querySelector('.log');

let baseBall = Array(4);
let myBall;
let opportunity = 10;

function pickRandomNumber() {
    for (let i = 0; i < baseBall.length; i++) {
        baseBall[i] = Math.ceil(Math.random()* 8) + 1;
    }    
    baseBall = baseBall.join('');
}


function checkBall(e) {
    e.preventDefault();
    // 사용자 입력 볼 숫자 저장
    myBall = input.value;
    let strike = 0;
    let ball = 0;    

    

    // 비교
    for(let i = 0; i < baseBall.length; i++) {
        if (baseBall === myBall) {            
            result.innerText = `HomeRun!!!`;
            return;
        } else if (baseBall.includes(myBall[i])) {           
            if (baseBall.indexOf(myBall[i]) === i) {
                strike++;
            } else {
                ball++;
            }
        } 
    }    

    // log
    let ballLog = document.createElement('p');
    opportunity--;
    if (strike === 0 && ball === 0) {
        result.innerText = `Out!!!`;
        ballLog.innerText = `${myBall} - Out!!! 남은 기회 :${opportunity}`;
    } else {
        result.innerText = `${strike} 스트라이크 ${ball} 볼 입니다.`;
        ballLog.innerText = `${myBall} - ${strike}strike ${ball}ball 남은 기회 :${opportunity}`;
    }    
    
    log.append(ballLog);
    
    
    if (opportunity < 1) return resetBaseBall();
    input.value = '';
}


function resetBaseBall() {
    result.innerText = `정답은 ${baseBall}~ 실패하셨습니다. 새로운 볼을 뽑습니다. `;
    baseBall = Array(4);
    myBall= '';
    opportunity = 10;
    log.innerHTML = '';
    pickRandomNumber();
}


pickRandomNumber();
form.addEventListener('submit', checkBall);
