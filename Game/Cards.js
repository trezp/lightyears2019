const uniqueID = require("unique-string");

class Card {
  constructor(value, name) {
    this.name = name || "Light Years";
    this.inHand = false;
    this.discarded = false;
    this.value = value;
  }
}

class SpecialCard extends Card {
  constructor(traits, ...args) {
    super(...args);
    this.special = {
      description: traits.description,
      isHazard: traits.isHazard,
      group: traits.group
    };
  }
}

// class GoCard extends Card {
//   constructor(...args) {
//     super(...args);
//     this.description = "Go!";
//     this.name = "Go!";
//   }
// }

// class StopCard extends Card {
//   constructor(...args) {
//     super(...args);
//     this.description = "Stop! You cannot proceed without a Go card.";
//     this.name = "Stop!";
//   }
// }

module.exports = {
  Card,
  SpecialCard
  // GoCard,
  // StopCard
};
