import uniqueID from "unique-string";
import cards from "./Cards";
import remedies from "./remedies";

import _ from "lodash";

class Deck {
  constructor() {
    this.deckId = uniqueID();
    this.deck = [];
  }
  makeNewCard(type, quantity, value) {
    for (let i = 0; i < quantity; i++) {
      let card = new type(value);
      this.deck.push(card);
    }
  }
  makeSpecialCard(quantity, description) {
    description.forEach(des => {
      let card = new cards.SpecialCard(des, 0, des.name);

      for (let i = 0; i < quantity; i++) {
        this.deck.push(card);
      }
    });
    this.deck.forEach(card => {
      card._id = uniqueID();
    });
  }

  fillDeck() {
    this.makeNewCard(cards.Card, 10, 25);
    this.makeNewCard(cards.Card, 10, 50);
    this.makeNewCard(cards.Card, 10, 75);
    this.makeNewCard(cards.Card, 7, 100);
    this.makeNewCard(cards.Card, 4, 200);
    this.makeSpecialCard(2, remedies);
  }
}

const deck = new Deck();
deck.fillDeck();

export default deck;
