'use strict';
const
    container = document.querySelector('.container'),
    content = container.querySelector('.content'),    
    btnsBox = container.querySelector('.btns'),
    btns = btnsBox.querySelectorAll('button'),
    digitalClock = content.querySelector('#digital_clock'),
    day = digitalClock.querySelectorAll('span');
    

//버튼 슬라이드 조작
btns.forEach((btn, idx) => btn.addEventListener('click', (e) => {
    const contentWidth = content.querySelector('div').clientWidth;           
    btns.forEach(btn => {
        if (btn.classList.contains('clicked')) btn.classList.remove('clicked');
    });
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
