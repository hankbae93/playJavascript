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
    select: null,
    selectData: null,
    mine: true    
};
const rival = {
    deck: rivalContainer.querySelector('.deck'),
    deckData: [],
    hero: rivalContainer.querySelector('.hero'),
    heroData: null,    
    field: document.querySelector('#field .rival'),
    fieldData: [],
    cost: rivalContainer.querySelector('.current-cost span'),    
    select: null,
    selectData: null, 
    mine: false 
};

let turn = true;



function summonCard(obj, data) { // 덱에서 필드로 카드 넣기
    const currentCost = parseInt(obj.cost.textContent);
    if (currentCost < data.cost) {
        return "end";
    }
    const index = obj.deckData.indexOf(data);
    obj.deckData.splice(index, 1);
    obj.fieldData.push(data);
    repaintDeck(obj);
    repaintField(obj);
    data.field = true;
    obj.cost.textContent = currentCost - data.cost;
}

function repaintScreen(obj) { 
    repaintDeck(obj);
    repaintField(obj);
    repaintHero(obj);
}

function cardAction(card, data) {
    const attacker = turn ? my : rival;
    const defender = turn ? rival : my;

    if (card.classList.contains('turnover')) return; // 실행끝난 카드 선택시

    const attacked = turn ? !data.mine : data.mine;
    if (attacked && attacker.select) { // 내 카드를 선택하고 상대 카드 누를 때
        data.hp = data.hp - attacker.selectData.att;
        if (data.hp < 1) { // 카드가 공격받고 죽었을 때
            const index = defender.fieldData.indexOf(data);
            if (index > -1) { // 일반 카드 사망 시
                defender.fieldData.splice(index, 1);
            } else { // 상대 영웅 사망 시
                alert('승리하셨습니다.');
                basicSettings();
            }            
        }
        repaintScreen(defender);
        if (attacker.select) {
            attacker.select.classList.remove('select');
            attacker.select.classList.add('turnover');
            attacker.select = null;
            attacker.selectData = null;
        }        
        return;
    } else if (attacked) {
        return;
    }

    if (data.field) { // 필드에 있는 카드 클릭
        document.querySelectorAll('.select').forEach(card => {
            card.classList.remove('select');
        });
        card.classList.add('select');
        attacker.select = card;
        attacker.selectData = data;
    } else { // 덱에 있는 카드 클릭        
        if (summonCard(attacker, data) !== "end") {
            deckProduce(1, attacker);
        }
    }
}


function reflectDOM(data, dom) { // 바뀐 데이터 반영해서 DOM 재배치하기
    const card = prototype_card.cloneNode(true);
    card.querySelector('.cost').textContent = data.cost;
    card.querySelector('.att').textContent = data.att;
    card.querySelector('.hp').textContent = data.hp;  

    card.addEventListener('click', function() {
        // 턴액션수행(카드, 데이터, 턴);
        cardAction(card, data);
    });
    dom.appendChild(card);
}

function repaintField(obj) {
    obj.field.innerHTML = '';
    obj.fieldData.forEach(data => {
        reflectDOM(data, obj.field);
    });
}

function repaintDeck(obj) { // 덱 다시 그리기
    obj.deck.innerHTML = '';
    obj.deckData.forEach(data => {
        reflectDOM(data, obj.deck);
    });
}

function repaintHero(obj) {
    obj.hero.innerHTML = '';
    reflectDOM(obj.heroData, obj.hero);
}

function deckProduce(length, obj) {
    for(let i = 0; i < length; i++) {
        const data = cardPlant(false, obj.mine);
        obj.deckData.push(data);
    }
    repaintDeck(obj);
}

function heroProduce(obj) {
    const data = cardPlant(true, obj.mine);
    obj.heroData = data;
    reflectDOM(obj.heroData, obj.hero);
}

function Card(hero, mine) {
    if (hero) {
        this.att = Math.ceil(Math.random() * 2);
        this.hp = Math.ceil(Math.random() * 5) + 25;
        this.hero = true;
        this.field = true;
    } else {
        this.att = Math.ceil(Math.random() * 5);
        this.hp = Math.ceil(Math.random() * 5);
        this.cost = Math.floor((this.att + this.hp) / 2);
    }
    if (mine) {
        this.mine = true;
    }
}

function cardPlant(hero, mine) {
    return new Card(hero, mine);
}

function basicSettings() {
    [my, rival].forEach(item => {
        item.deckData = [];
        item.heroData = [];
        item.fieldData = [];
        item.select = null;
        item.selectData = null;
    });
    deckProduce(5, my);
    heroProduce(my);
    deckProduce(5, rival);
    heroProduce(rival);
    repaintScreen(my);
    repaintScreen(rival);
}
turnBtn.addEventListener('click', () => {
    turn = !turn;
    myContainer.classList.toggle('turn');
    rivalContainer.classList.toggle('turn');
    document.querySelectorAll('.turnover').forEach(card => {
        card.classList.remove('turnover');
    });
    my.cost.textContent = 10;
    rival.cost.textContent = 10;

});
basicSettings();
