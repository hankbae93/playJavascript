'use strict';
const table = document.querySelector('#table');
const startBtn = document.getElementById('start');
const tr = [...table.querySelectorAll('tr')];
let data = [];

function dataSettings() {
    data = [];
    for (let i = 0; i < 4; i++) {
        const row = [];
        for(let j = 0; j < 4; j++) {
            row.push(0);
        }
        data.push(row);
    }
}

function paintBoard() {
    tr.forEach((row, i) => {
        const cells = [...row.children];
        cells.forEach((cell, j) => {
            const num = data[i][j] === 0 ? '' : data[i][j];
            cell.textContent = num;
            
        });
    })
}

function startGame() {    
    dataSettings();  
    randomNumber();  
    paintBoard();
}

// 액션 
function randomNumber() {
    const emptyCells = [];
    data.forEach((row, i) => {
        row.forEach((cell, j) => {
            if(cell === 0) {
                emptyCells.push([i, j]);
            }
        });
    });

    if (emptyCells.length === 0) {
        alert('게임 끝');
        startGame();
    } else {
        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];        
        data[randomIndex[0]][randomIndex[1]] = 2;        
    }
}

function moveBoard(code) {
    const newData = [
        [], [], [], [] //열이라 생각하자
    ];    
    switch(code) {
        case "ArrowUp": {
            data.forEach((row, i) => {
                row.forEach((cell, j) => {
                    // 여기서 j는 몇번째 열이다라고 생각하자
                    if (cell) {
                        if (newData[j][newData[j].length - 1] && 
                            newData[j][newData[j].length - 1] === cell) {
                            newData[j][newData[j].length - 1] *= 2;
                        } else {
                            newData[j].push(cell);                              
                        }                        
                    } 
                });
            });
            
            data.forEach((row, i) => {
                row.forEach((cell, j) => {                    
                    data[j][i] = newData[i][j] || 0;
                });
            });
            break;
        }            
        case "ArrowDown": {
            data.forEach((row, i) => {
                row.forEach((cell, j) => {
                    if (cell) {
                        if (newData[j][0] && newData[j][0] === cell) {
                            newData[j][0] *= 2;
                        } else {
                            newData[j].unshift(cell);
                        }
                    }
                });
            });
            
            data.forEach((row, i) => {
                row.forEach((cell, j) => {
                    data[3 - j][i] = newData[i][j] || 0;
                });
            });
            break;
        }            
        case "ArrowLeft":{ 
            data.forEach((row, i) => {
                row.forEach((cell, j) => {
                    if (cell) {
                        if (newData[i][newData[i].length - 1] &&
                            newData[i][newData[i].length - 1] === cell) {
                            newData[i][newData[i].length - 1] *= 2;
                        } else {
                            newData[j].push(cell);
                        }
                    }
                });
            });

            data.forEach((row, i) => {
                row.forEach((cell, j) => {
                    data[i][j] = newData[i][j] || 0;
                });
            });
            break;
        }
        case "ArrowRight": 
            data.forEach((row, i) => {
                row.forEach((cell, j) => {
                    if (cell) {
                        if (newData[i][0] && newData[i][0] === cell) {
                            newData[i][0] *= 2;
                        } else {
                            newData[i].unshift(cell);
                        }
                    }
                });
            });

            data.forEach((row, i) => {
                row.forEach((cell, j) => {
                    data[i][3 - j] = newData[i][j] || 0;
                });
            });
            break;
        default:
            return;
    }   
    console.log(newData)
    randomNumber();
    paintBoard();  
}




window.addEventListener('keydown', e => {
    moveBoard(e.key);
});

startBtn.addEventListener('click', startGame);

