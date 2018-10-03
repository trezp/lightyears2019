const uniqueID = require('unique-string');

class MileageCard {
  constructor(value){
    this._id = uniqueID();
    this.name = "Light Years"; 
    this.value = value;
    this.inHand = false;
    this.discarded = false;
  }
}

class SpecialCard {
  constructor(name, group, isHazard){
    this._id = uniqueID();
    this.name = name; 
    this.group = group;
    this.isHazard = isHazard;
    this.inHand = false;
    this.discarded = false;
  }
}

class Deck {
  constructor(){
    this.deck = {
      deckId: uniqueID(), 
      length: 0,
      deck: []
    }; 
  }

  makeMilesCard(value, cb){
    let card = new MileageCard(value);
    return cb(card);
  }

  makeSpecialCard(name, group, isHazard, cb){
    let card = new SpecialCard(name, group, isHazard);
    return cb(card);
  }

  pushNewCard(quantity, card){
    for (let i = 0; i < quantity; quantity--) {
      this.deck.deck.push(card);
    }
  }

  createDeck(){
    const miles50 = 10;
    const miles100 = 7; 
    const miles200 = 5;
    const specialCards = 4;

    this.makeMilesCard(50, card => this.pushNewCard(miles50, card));
    this.makeMilesCard(100, card => this.pushNewCard(miles100, card));
    this.makeMilesCard(200, card => this.pushNewCard(miles200, card));

    this.makeSpecialCard("Out of JetFuel", "fuel", true, card => this.pushNewCard(specialCards, card));
    this.makeSpecialCard("JetFuel Ship!", "fuel", false, card => this.pushNewCard(specialCards, card));

    this.makeSpecialCard("Engine Failure", "engine", true, card => this.pushNewCard(specialCards, card));
    this.makeSpecialCard("Engine Repairs", "engine", false, card => this.pushNewCard(specialCards, card));

    this.makeSpecialCard("Lost in Space", "lost", true, card => this.pushNewCard(specialCards, card));
    this.makeSpecialCard("Search Party", "lost", false, card => this.pushNewCard(specialCards, card));

    this.makeSpecialCard("Utopian Planet", "delay", true, card => this.pushNewCard(specialCards, card));
    this.makeSpecialCard("Introduction of Capitalism", "delay", false, card => this.pushNewCard(specialCards, card));

    this.deck.length = this.deck.deck.length;
    return this.deck;
  }
}

module.exports = new Deck().createDeck();
