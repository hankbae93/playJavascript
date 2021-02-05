'use strict';
const wrap = document.querySelector('.wrap');
const gameBox = wrap.querySelector('.gameBox');
// 게임컨트롤 관련 요소
const gameControl = wrap.querySelector('.gameControl');
const select = gameControl.querySelector('select');
const startBtn = gameControl.querySelector('button');
const scoreBox = gameControl.querySelector('.score');
let RANDOM;
let maxCard;
let firstCard;
let secondCard;
let matchCardArr = [];
let score = 0;
let sw = false;

const startGame = () => {     
    if (document.querySelector('.card')) return
    shuffleCard();    
    playCard();
    // 카드 시작과 동시에 오픈 
    setTimeout(gameStartOpen, 1000);
    setTimeout(() => {sw = true; gameStartOpen()}, 2000);
 
}

const shuffleCard = () => {
    if (select.value === 'normal') {        
        maxCard = 10;
    } else {        
        maxCard = 14;
    }    
    RANDOM = Array(maxCard / 2).fill().map((el, i) => i + 1);
    RANDOM = RANDOM.concat(RANDOM);
    RANDOM.sort(() => Math.random() - Math.random());

    for (let i = 0; i < maxCard; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="./img/thumb-${RANDOM[i]}.jpg" alt="">
            <div class="back">CARD</div>
        `;
        gameBox.append(card);
    }
}

const gameStartOpen = (e) => {    
    const card = document.querySelectorAll('.card');
    card.forEach(item => item.classList.toggle('clicked'));    
};

const playCard = () => {
    const card = document.querySelectorAll('.card');    
    card.forEach((item, idx) => {
        item.addEventListener('click',() => {
            if (!sw) return;
            if (firstCard && secondCard) {                                           
                return;
            } else if (!firstCard) {
                firstCard = {
                    id : idx,
                    match: RANDOM[idx]
                };
                item.classList.add('clicked');
            } else {
                secondCard = {
                    id : idx,
                    match: RANDOM[idx]
                };     
                item.classList.add('clicked');    
                setTimeout(checkMatch,1000);       
            }                
        });
    });
};            

const checkMatch = () => {    
    const card = document.querySelectorAll('.card');   
    if (firstCard.match === secondCard.match) {
        card[firstCard.id].classList.replace('clicked', 'matched');
        card[secondCard.id].classList.replace('clicked', 'matched');
        score++;
        scoreBox.innerText = `${score}`;
    } else {
        card[firstCard.id].classList.remove('clicked');
        card[secondCard.id].classList.remove('clicked');
    }    
    firstCard = secondCard = null;
};

startBtn.addEventListener('click',startGame);
