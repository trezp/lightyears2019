
const uniqueID = require('unique-string');

class Player {
  constructor(name) {
    this.playerID = uniqueID(),
    this.name = name || "Player" + this.playerID; 
    this.score = 0,
    this.isTurn = false,
    this.hand = [];
  }

  makePlayer(name){
    const player = new Player(name);
    return player
  }

  updateScore(score){
    this.score = score;
  }
}

module.exports = new Player().makePlayer();