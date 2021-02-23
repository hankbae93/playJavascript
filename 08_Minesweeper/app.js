'use strict';
const     
    create_game = document.querySelector('.create_game'),
    select = create_game.querySelector('select'),    
    create = create_game.querySelector('#create'),
    board = document.querySelector('#board'),
    result = document.querySelector('#result');

const mode = {
    easy : {
        ver : 10,
        hor: 10,
        mine: 20
    },
    normal : {
        ver : 15,
        hor: 15,
        mine: 40
    },
    hard : {
        ver : 20,
        hor: 20,
        mine: 60
    },
    hell : {
        ver : 30,
        hor: 30,
        mine: 80
    },
};
const data = {
    mine : {
        num: -1,
        str: 'X'
    },
    normal : {
        num: 0,
        str: ''
    },
    flag : {
        num: 1,
        str: '🚩'
    },        
};
let 
    dataset = [],
    sw = false,
    openbox = 0;


function createGame() {   
    // 초기화
    board.innerHTML = result.innerHTML = '';
    dataset = [];    
    openbox = 0;
    sw = false;
    const ver = mode[select.value].ver;
    const hor = mode[select.value].hor;
    const mineCount = mode[select.value].mine;

    for (let i = 0; i < hor; i++) {
        const arr = [];
        const tr = document.createElement('tr');
        for (let j = 0; j < ver; j++) {
            const td = document.createElement('td');
            td.addEventListener('click', leftClick);
            td.addEventListener('contextmenu', rightClick);
            arr.push(data.normal.num);
            tr.appendChild(td);
        }
        board.appendChild(tr);
        dataset.push(arr);
    }    

    shuffleMine(ver, hor, mineCount);
}

function shuffleMine(ver, hor, mineCount) {
    const shuffle = fysAlgorithm(Array(ver * hor)
        .fill()
        .map((v, i) => v = i))    
        .slice(0, mineCount);
    
    for (let i = 0; i < mineCount; i++) {
        const row = Math.floor(shuffle[i] / ver);
        const col = shuffle[i] % ver;
        dataset[col][row] = data.mine.num;        
        // board.children[col].children[row].classList.add('mine');
    }    
}

function fysAlgorithm(arr) {
    const strikeOut = [];
    while (arr.length) {
        const lastIdx = arr.length - 1;
        let roll = Math.floor(Math.random() * arr.length);
        let temp = arr[lastIdx];
        arr[lastIdx] = arr[roll];
        arr[roll] = temp;
        strikeOut.push(arr.pop());
    }  
    return strikeOut;
}

function leftClick(e) {     
    if (sw) return;
    const target = e.currentTarget;
    if(target.classList.contains('open')) return;    
    const eTr = target.parentNode;    
    const col = [...board.children].indexOf(eTr);
    const row = [...eTr.children].indexOf(target);
    
    // 깃발 클릭시
    if (target.textContent === data.flag.str) {
        return;        
    // 지뢰 클릭시
    } else if (dataset[col][row] === data.mine.num){
        target.textContent = '펑!';
        sw = true;
        result.innerText = '실패하셨습니다.';
    // 노멀 클릭시
    } else {        
        openbox++;
        const datasetCheck = [ dataset[col][row - 1], dataset[col][row + 1] ];
        const boardCheck = [ board.children[col].children[row - 1], board.children[col].children[row + 1] ];

        if (dataset[col - 1]) { // 아랫줄이 있으면
            datasetCheck.push(
                dataset[col - 1][row - 1], dataset[col - 1][row], dataset[col - 1][row + 1],
            );
            boardCheck.push(
                board.children[col - 1].children[row - 1], board.children[col - 1].children[row], board.children[col - 1].children[row + 1],
            );
        }     
        if (dataset[col + 1]) { // 윗줄이 있으면
            datasetCheck.push(
                dataset[col + 1][row - 1], dataset[col + 1][row], dataset[col + 1][row + 1],
            );
            boardCheck.push(
                board.children[col + 1].children[row - 1], board.children[col + 1].children[row], board.children[col + 1].children[row + 1],
            );
        }
        const minecount = datasetCheck.filter((v) => {
            return v === data.mine.num
        }).length;               
        target.textContent = minecount || '';
        target.classList.add('open');        

        // 재귀함수
        if (minecount === 0) {
            const reClickList = boardCheck.filter((v) => { return !!v });       
            reClickList.forEach((v) => {                       
                v.click();                                                         
            });                
        }
        // 모든칸 클릭시
        const ver = mode[select.value].ver;
        const hor = mode[select.value].hor;
        const mine = mode[select.value].mine;
        
        if (openbox === ver * hor - mine) {
            sw = true;
            result.innerText = '성공하셧습니다.';
        }
    }
} 
        
function rightClick(e) {
    e.preventDefault();
    if (sw) return;
    const target = e.currentTarget;    
    
    if (!target.textContent) {
        target.textContent = data.flag.str;        
    } else {
        target.textContent = '';        
    }
}

create.addEventListener('click', createGame);
            
                     
                               

        
    
    

