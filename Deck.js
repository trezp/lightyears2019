// class Player {
//   constructor(hand, mileage) {
//     this.name = "Player1"; 
//     this.width = width;
//     this.mileage = 0 || mileage; 
//     this.hand = new Hand();
//   }
// }

class MileageCard {
  constructor(value){
    this.name = "miles"; 
    this.value = value;
    this.inHand = false;
    this.discarded = false;
  }
}

class SpecialCard {
  constructor(name, group, isHazard){
    this.name = name; 
    this.group = group;
    this.isHazard = isHazard;
    this.inHand = false;
    this.discarded = false;
  }
}

class Deck {
  constructor(){
    this.deck = []; 
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
      this.deck.push(card);
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
    this.makeSpecialCard("Out of Gas", "gas", true, card => this.pushNewCard(specialCards, card));
    this.makeSpecialCard("Refill!", "gas", false, card => this.pushNewCard(specialCards, card));

    return this.deck;
  }
}

const deck = new Deck().createDeck();
console.log(deck);

module.exports = deck;
