const player = require("./Player");
const deck = require("./Deck");
const uniqueID = require("unique-string");
const helpers = require("./helpers");

class Game {
  constructor() {
    this.game = {
      gameId: uniqueID(),
      players: [],
      active: true,
      deck: deck
    };
  }
  // dealHand() {
  //   this.game.players.forEach(player => {
  //     if (!player.inHand) {
  //       for (let i = 7; i > 0; i--) {
  //         let randNum = helpers.getRandomNum(deck.length);
  //         let card = deck.deck[randNum];
  //         card.inHand = true;
  //         player.hand.push(card);
  //       }
  //     }
  //   });
  // }

  startGame() {
    this.game.players.push(player);
    //this.game.players.push(player);
    //this.dealHand();
    return this.game;
  }
}

module.exports = new Game().startGame();
