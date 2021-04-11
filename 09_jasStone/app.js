'use strict';
const myContainer = document.querySelector('#my');
const rivalContainer = document.querySelector('#rival');
const prototype_card = document.querySelector('.hide .card');
const my = {
    deck: myContainer.querySelector('.deck'),
    deckData: [],
    hero: myContainer.querySelector('.hero'),
    heroData: null,    
    cost: myContainer.querySelector('.current-cost span'),
};
const rival = {
    deck: rivalContainer.querySelector('.deck'),
    deckData: [],
    hero: rivalContainer.querySelector('.hero'),
    heroData: null,    
    cost: rivalContainer.querySelector('.current-cost span'),
};

function heroProduce(obj) {    
    const card = prototype_card.cloneNode(true);
    const data = cardPlant(true);
    card.querySelector('.att').textContent = data.att;
    card.querySelector('.hp').textContent = data.hp;    
    obj.heroData = data;
    obj.hero.append(card);            
}

function deckProuduce(length, obj) {    
    for (let i = 0; i < length; i++) {
        const card = prototype_card.cloneNode(true);
        const data = cardPlant();
        card.querySelector('.att').textContent = data.att;
        card.querySelector('.hp').textContent = data.hp;
        card.querySelector('.cost').textContent = data.cost;
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

setting();