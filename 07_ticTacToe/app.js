'use strict';
const rows = [...document.querySelectorAll('.row')];
const boxes = Array(rows.length)
    .fill()
    .map((box, i) => box = [...rows[i].querySelectorAll('.box')]);
const BOX = document.querySelectorAll('.box');
let turn = 'X';
let fullCheck = 0;
let win = false;

function winCheckLogic(turn, rowIndex, colIndex) {  
    //가로줄 검사       
    if (boxes[rowIndex][0].textContent === turn && 
        boxes[rowIndex][1].textContent === turn &&
        boxes[rowIndex][2].textContent === turn) { 
            win = true;
    // 세로줄 검사
    } else if (boxes[0][colIndex].textContent === turn && 
            boxes[1][colIndex].textContent=== turn &&
            boxes[2][colIndex].textContent === turn) { 
                win = true;
    // 대각선 검사
    } else if (boxes[0][0].textContent === turn && 
            boxes[1][1].textContent=== turn &&
            boxes[2][2].textContent === turn) { 
                win = true;    
    } else if (boxes[2][0].textContent === turn && 
            boxes[1][1].textContent=== turn &&
            boxes[0][2].textContent === turn) { 
                win = true;    
    // 무승부 
    } else if (fullCheck === BOX.length) {
        alert('! 무승부 !');
    }
}


BOX.forEach((box) => {
    box.addEventListener('click', (e) => {     
        if (win) return;
        const rowIndex = rows.indexOf(e.target.parentNode);
        const colIndex = boxes[rowIndex].indexOf(e.target);
        console.log(`${rowIndex}번째 줄 ${colIndex}번째 칸`);

        if (box.textContent === '') {
            box.textContent = turn;
            box.classList.add('clicked');
            fullCheck++;
            winCheckLogic(turn, rowIndex, colIndex); 
            if (!win) {
                if (turn === 'X') {
                    turn = 'O';
                } else {
                    turn = 'X';
                } 
            } else {
                alert(`${turn} 님의 승리!`);
                turn = 'X';
            }                          
        } 
    });
});

