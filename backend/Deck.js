const uniqueID = require("unique-string");
const cards = require("./Cards");
const hazards = require("./hazards");
const remedies = require("./remedies");

class Deck {
  constructor() {
    this.deck = {
      deckId: uniqueID(),
      length: 0,
      deck: []
    };
    this.ly25 = 10;
    this.ly50 = 10;
    this.ly75 = 10;
    this.ly100 = 7;
    this.ly100 = 12;
    this.ly200 = 4;
    this.go = 14;
    this.stop = 5;
    this.hazardsCards = 6;
    this.remedyCards = 6;
  }

  makeNewCard(type, quantity, value) {
    for (let i = 0; i < quantity; i++) {
      let card = new type(value);
      this.deck.deck.push(card);
    }
  }

  makeSpecialCard(quantity, description) {
    for (let i = 0; i < quantity; i++) {
      description.forEach(des => {
        let card = new cards.SpecialCard(des, 0, des.name);
        this.deck.deck.push(card);
      });
    }
  }

  createDeck() {
    this.makeNewCard(cards.Card, this.ly25, 25);
    this.makeNewCard(cards.Card, this.ly50, 50);
    this.makeNewCard(cards.Card, this.ly75, 75);
    this.makeNewCard(cards.Card, this.ly100, 100);

    this.makeNewCard(cards.GoCard, this.go, 0);
    this.makeNewCard(cards.StopCard, this.stop, 0);
    this.makeNewCard(cards.Card, this.ly200, 200);
    this.makeSpecialCard(this.hazardCards, hazards);
    this.makeSpecialCard(this.remedyCards, remedies);

    this.deck.length = this.deck.deck.length;
    return this.deck;
  }
}

//const deck = new Deck();
module.exports = new Deck().createDeck();
