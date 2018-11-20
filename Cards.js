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

module.exports = {
  MileageCard, 
  SpecialCard
}