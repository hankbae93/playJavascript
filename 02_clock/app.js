'use strict';
const
    container = document.querySelector('.container'),
    content = container.querySelector('.content'),  
    // 버튼  
    btnsBox = container.querySelector('.btns'),
    btns = btnsBox.querySelectorAll('button'),
    // 디지털 시계
    digitalClock = content.querySelector('#digital_clock'),
    day = digitalClock.querySelectorAll('span'),
    // 아날로그 시계
    analogClock = content.querySelector('#analog_clock'),
    hrs = analogClock.querySelector('.hrs'),
    min = analogClock.querySelector('.min'),
    sec = analogClock.querySelector('.sec'),
    // 타이머
    timer = content.querySelector('#timer'),
    timerWatch = timer.querySelector('span'),
    timerStart = timer.querySelector('.start'),
    timerReset = timer.querySelector('.reset');
    

//버튼 슬라이드 조작
btns.forEach((btn, idx) => btn.addEventListener('click', (e) => {
    const contentWidth = content.querySelector('div').clientWidth;           
    const clickBtn = btnsBox.querySelector('.clicked');
    clickBtn.classList.remove('clicked');
    btn.classList.add('clicked');
    content.style.transform = `translateX(-${contentWidth * idx}px)`;
}));

// 디지털 시계
function setDay() {
    const now = new Date();
    const today = now.getDay();
    day[today].classList.add('today');
}

function digitalTickin() {
    const now = new Date();
    const timeBox = digitalClock.querySelector('p');
    timeBox.innerHTML = `${
        now.getHours() < 10 ? '0' + now.getHours() : now.getHours()
    } : ${
        now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()
    } : ${
        now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds()
    }`;
    
}
setDay();
setInterval(digitalTickin, 1000);

// 아날로그 시계
function analogTickin() {
    const now = new Date();
    const seconds = now.getSeconds();
    const secondsDegrees = ((seconds / 60) * 360);      
    sec.style.transform = `translate(-50%, -50%) rotate(${secondsDegrees}deg)`;
    
    const mins = now.getMinutes();
    const minsDegrees = ((mins / 60) * 360);
    min.style.transform = `translate(-50%, -50%)  rotate(${minsDegrees}deg)`;

    const hours = now.getHours();
    const hoursDegrees = ((hours / 12) * 360);
    hrs.style.transform = `translate(-50%, -50%)  rotate(${hoursDegrees}deg)`;    
}
setInterval(analogTickin, 1000);

// 타이머
let hour = 0;
let minute = 0;
let second = 0;
let ms = 0;
let stop = true;
let timerSW;
function timerTickin() {
    if (ms > 98) {
        ms = 0;
        second++;
    } else if (second > 58) {
        second = 0;
        minute++;
    } else if (minute > 58) {
        minute = 0;
        hour++;
    } else {
        ms++;
    }               
    
    timerWatch.innerText = `${
        hour < 10 ? '0'+hour : hour
    } : ${
        minute < 10 ? '0'+minute : minute
    } : ${
        second < 10 ? '0'+second : second
    } : ${
        ms < 10 ? '0'+ms : ms
    }`;
}

function timerOn(e) {
    if (stop) {
        this.classList.add('off');
        timerSW = setInterval(timerTickin, 10);
        stop = false;
    } else {
        this.classList.remove('off');
        clearInterval(timerSW);
        stop = true;
    }
}

function timeReset() {
    timerWatch.innerText = "00 : 00 : 00 : 00";
}

timerStart.addEventListener('click',timerOn);
timerReset.addEventListener('click', timeReset);