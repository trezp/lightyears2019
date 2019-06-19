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

module.exports = {
  Card,
  SpecialCard
};
