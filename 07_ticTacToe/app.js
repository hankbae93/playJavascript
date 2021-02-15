'use strict';
const row = [...document.querySelectorAll('.row')];
const box = Array(row.length)
    .fill()
    .map((box, i) => box = [...row[i].querySelectorAll('.box')]);
const BOX = document.querySelectorAll('.box');
let turn = 'X';
let fullCheck = 0;
let win = false;

function winCheckLogic(turn) {   
    if (box[0][0].textContent === turn &&
        box[0][1].textContent === turn &&
        box[0][2].textContent === turn
    ) {
            win = true;
    } else if (box[1][0].textContent === turn &&
        box[1][1].textContent === turn &&
        box[1][2].textContent === turn
    ) {
            win = true;
    } else if (box[2][0].textContent === turn &&
        box[2][1].textContent === turn &&
        box[2][2].textContent === turn
    ) {
            win = true;
    } else if (box[2][0].textContent === turn &&
        box[1][1].textContent === turn &&
        box[0][2].textContent === turn
    ) {
            win = true;
    } else if (box[0][0].textContent === turn &&
        box[1][1].textContent === turn &&
        box[2][2].textContent === turn
    ) {
            win = true;
    } else if (fullCheck === BOX.length) {
        alert('비기셨습니다.')
    }    
}


BOX.forEach((item) => {
    item.addEventListener('click', (e) => {     
        if (win) return;
       
        if (item.textContent === '') {
            item.textContent = turn;
            item.classList.add('clicked');
            fullCheck++;
            winCheckLogic(turn); 
            if (!win) {
                if (turn === 'X') {
                    turn = 'O';
                } else {
                    turn = 'X';
                } 
            } else {
                alert(`${turn} 님의 승리! VVVVVVVVVV`);
                turn = 'X';
            }                          
        } 
    });
});

