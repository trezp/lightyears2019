const player = require('./Player');
const deck = require('./Deck');
const uniqueID = require('unique-string');
const helpers = require('./helpers');

class Game {
  constructor(){
    this.game = {
      gameId: uniqueID(),
      players: [],
      active: true
    }
  }
  makeHand(){
    this.game.players.forEach((player)=>{
      for(let i = 7; i > 0; i-- ) {
        let randNum = helpers.getRandomNum(deck.length);
        player.hand.push(deck.deck[randNum]);
        console.log(this.hand)
      }
    });
  }

  startGame(){
    this.game.players.push(player);
    this.game.players.push(player);
    this.makeHand();
    return this.game
  }
}

module.exports = new Game().startGame();