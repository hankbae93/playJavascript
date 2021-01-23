'use strict';
const 
    container = document.querySelector('.container'),
    table = container.querySelector('table'),
    start = container.querySelector('#start'),
    scoreBox = container.querySelector('#score');
const 
    rule = {
        row : 12,
        column : 12       
    };
// 세팅
for (let i = 0; i < rule.column; i++) { // 열
    let tr = document.createElement('tr');    
    for (let i = 0; i < rule.row; i++) { // 행
        let td = document.createElement('td');
        tr.append(td);        
    }
    table.append(tr);
}

// 게임 세팅    
const blocks = table.querySelectorAll('td');
let currentSnake = [3, 2, 1, 0]; // [0] head , [마지막] tail    
let direction = 1;
let intervals;
let score = 0;


function startGame() {        
    direction = 1;
    currentSnake = [3, 2, 1, 0];
    score = 0;
    scoreBox.innerText = '점수 : 0점';
    paintSnake();
    randomApple();
    intervals = setInterval(moveSnake, 800);
}

function moveSnake() {  
    if (
        currentSnake[0] + direction < 0 || // 윗벽에 부딪힌 경우     
        currentSnake[0] + direction > rule.row * rule.column - 1 || // 아랫벽에 부딪힌 경우
        (currentSnake[0] + direction) % rule.row === 0 && direction === 1 ||  // 오른쪽 벽에 부딪힌 경우 
        (currentSnake[0] + direction) % rule.row === rule.row - 1 && direction === -1 || //완쪽 벽
        blocks[currentSnake[0] + direction].classList.contains('snake') // 자기 몸통쪽으로 방향키 눌렀을 때
    ) {
        return clearInterval(intervals);
    }
    const tail = currentSnake.pop();
    blocks[tail].classList.remove('snake');
    currentSnake.unshift(currentSnake[0] + direction);    
    paintSnake();

    // 사과를 먹으면 뱀이 한칸 길어짐
    if (blocks[currentSnake[0]].classList.contains('apple')) {        
        blocks[currentSnake[0]].classList.remove('apple');
        currentSnake.push(tail);
        score++;
        scoreBox.innerText = `점수 : ${score}점`;
        paintSnake();
        randomApple();
    }
}

// 사과 등장 
function randomApple() {
    const random = Math.floor(Math.random() * (blocks.length - 1));
    blocks[random].classList.add('apple');
}

// 방향키 입력
function controlSnake(e) {    
    switch (e.keyCode) {
        case 37 : // 좌 
            direction = -1;                      
            break;
        case 39 : // 우 
            direction = 1;                      
            break;
        case 38 : // 상 
            direction = -rule.column;                      
            break;
        case 40 :// 하  
            direction = rule.column;                     
            break;                
    }
    moveSnake();
}

// 뱀 출력
function paintSnake() {    
    blocks.forEach(block => block.classList.remove('snake'));
    for(let i of currentSnake) {
        blocks[i].classList.add('snake');
    }
}


document.addEventListener('keyup',controlSnake);
start.addEventListener('click',startGame);








