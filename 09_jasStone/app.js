'use strict';
const myContainer = document.querySelector('#my');
const rivalContainer = document.querySelector('#rival');
const turnBtn = document.querySelector('#turn_btn');
const prototype_card = document.querySelector('.hide .card');
const my = {
    deck: myContainer.querySelector('.deck'),
    deckData: [],
    hero: myContainer.querySelector('.hero'),
    heroData: null,    
    field: document.querySelector('#field .my'),
    fieldData: [],
    cost: myContainer.querySelector('.current-cost span'),
    turn: true
};
const rival = {
    deck: rivalContainer.querySelector('.deck'),
    deckData: [],
    hero: rivalContainer.querySelector('.hero'),
    heroData: null,    
    field: document.querySelector('#field .rival'),
    fieldData: [],
    cost: rivalContainer.querySelector('.current-cost span'),
    turn: false
};
let turn = true;

function heroProduce(obj) {    
    const card = prototype_card.cloneNode(true);
    const data = cardPlant(true);
    card.querySelector('.att').textContent = data.att;
    card.querySelector('.hp').textContent = data.hp;    
    obj.heroData = data;
    obj.hero.append(card);            
}

// const target = e.currentTarget;            
//             


function deckProuduce(length, obj) {    
    for (let i = 0; i < length; i++) {
        const card = prototype_card.cloneNode(true);
        const data = cardPlant();
        card.querySelector('.att').textContent = data.att;
        card.querySelector('.hp').textContent = data.hp;
        card.querySelector('.cost').textContent = data.cost;
        
        card.addEventListener('click', e => {                        
            const target = e.currentTarget;
            const index = [...target.parentNode.querySelectorAll('.card')].indexOf(target);                   
            
            if (turn !== obj.turn) return; // 현재 자기 턴이 아닐 시            
            if (data.field) { // 공격 선택 
                target.parentNode.querySelectorAll('.select').forEach(ele => {
                    ele.classList.remove('select');
                });
                target.classList.add('select');
            } else {
                // 덱에서 필드로 이동
                const costNum = parseInt(obj.cost.textContent);
                if (costNum - data.cost < 0) return; // 남은 코스트보다 카드 코스트가 클 때                
                obj.cost.textContent = costNum - data.cost;                
                data.field = true;
                obj.field.append(target);
                obj.fieldData.push(data);
                obj.deckData.splice(index, 1);
                deckProuduce(1, obj);
            }
            
        });

        obj.deckData.push(data);
        obj.deck.append(card);        
    }        
}

function Card(hero) {
    if (hero) {
        this.att = Math.ceil(Math.random() * 5);
        this.hp = Math.ceil(Math.random() * 5) + 25;
    } else {
        this.att = Math.ceil(Math.random() * 5);
        this.hp = Math.ceil(Math.random() * 5);
        this.cost = Math.ceil(Math.random() * 5);
    }       
}

function cardPlant(hero) {
    return new Card(hero);
}

function setting() {
    deckProuduce(5, my);
    heroProduce(my);
    deckProuduce(5, rival);
    heroProduce(rival);
}


turnBtn.addEventListener('click', () => {
    turn = !turn;
    myContainer.classList.toggle('turn');
    rivalContainer.classList.toggle('turn');
});
setting();