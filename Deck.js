const uniqueID = require('unique-string');
const cards = require('./Cards');

class Deck {
  constructor(){
    this.deck = {
      deckId: uniqueID(), 
      length: 0,
      deck: [], 
    }; 
    this.lightyears50 = 10,
    this.lightyears100 = 7, 
    this.lightyears150 = 5, 
    this.lightyears200 = 4
  }

  makeNewCard(quantity, value){
    for (let i = 0; i < quantity; i++) {
      let card = new cards.Card(value);
      this.deck.deck.push(card);
    }
  }

  makeSpecialCards(){
    for (let i = 0; i < 6; i++) {
      cards.specialDescriptions.forEach((des)=>{
        let card = new cards.SpecialCard(des, 0, des.name);
        this.deck.deck.push(card);
      });
    }
    
  }
  createDeck(){
    this.makeNewCard(this.lightyears50, 50);
    this.makeNewCard(this.lightyears100, 100);
    this.makeNewCard(this.lightyears150, 150);
    this.makeNewCard(this.lightyears200, 200);
    this.makeSpecialCards();

    this.deck.length = this.deck.deck.length;
    return this.deck;
  }
}

const deck = new Deck();
console.log(deck.createDeck())
module.exports = new Deck().createDeck();