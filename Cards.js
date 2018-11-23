const uniqueID = require('unique-string');

class Card {
  constructor(value, name){
    this._id = uniqueID();
    this.name = name || "Light Years";
    this.inHand = false; 
    this.discarded = false;
    this.value = value;
  }
}

class SpecialCard extends Card {
  constructor(traits, ...args){
    super(...args);
    this.special = {
      description: traits.description,
      isHazard: traits.isHazard,
      group: traits.group
    }
  }
}


const specialDescriptions = [
  {
    name: "Out of Jet Fuel",
    description: "Oops, you've run out of gas! You'll need a refueling ship", 
    isHazard: true, 
    group: "fuel"
  },
  {
    name: "Refueling ship",
    description: "Oops, you've run out of gas! You'll need a refueling ship", 
    isHazard: false, 
    group: "fuel"
  },
  {
    name: "Lost in Space",
    description: "Oh no! You're lost in the ether! You'll have to wait for a search party", 
    isHazard: true, 
    group: "lost"
  },
  {
    name: "Search Party!",
    description: "You've been located by the  Global Lost Persons Federation", 
    isHazard: false, 
    group: "lost"
  }, 
  {
    name: "Black Hole",
    description: "Oh crap, you've been sucked into the event horizon. You'll need a physics miracle to escape!", 
    isHazard: true, 
    group: "black hole"
  },
  {
    name: "Cosmic Miracle",
    description: "Oh Man, somehow you've escaped the black hole. I'd thank my lucky stars if I were you.", 
    isHazard: false, 
    group: "lost"
  }
]


module.exports = {
  Card,
  SpecialCard,
  specialDescriptions
}