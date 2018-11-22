const uniqueID = require('unique-string');

class Card {
  constructor(value, name){
    this._id = uniqueID();
    this.name = name;
    this.inHand = false; 
    this.discarded = false;
    this.value = value
  }

  makeNewCard(){
    return new Card(value, "Light Years");
  }
}

class SpecialCard extends Card {
  constructor(description, group, ...args){
    super(...args);
    this.description = description; 
    this.isHazard = false;
    this.group = group;
  }
}

const card = new SpecialCard("This is a card", "No gas", 0, "Out of Gas");
console.log(card)

module.exports = {
  Card,
  MileageCard, 
  SpecialCard
}