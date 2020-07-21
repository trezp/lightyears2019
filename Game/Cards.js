const uniqueID = require("unique-string");

class Card {
  constructor(value, name) {
    this.name = name || "Light Years";
    this.inHand = false;
    this.discarded = false;
    this.value = value;
    this.playable = true;
    this.group = null;
  }
}

class SpecialCard extends Card {
  constructor(traits, ...args) {
    super(...args);
    this.group = traits.group;
    this.playable = false;
    this.description = traits.description;
  }
}

module.exports = {
  Card,
  SpecialCard
};
