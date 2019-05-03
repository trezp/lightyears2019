
<template>
  <div>
    Game: {{gameId}}
    <h1>Light Years</h1>

    <div :key="player.id" v-for="player in players">
      <h2 v-if="!gameHasStarted">
        <span>Hello, {{player.name}}! Let your journey begin!</span>
      </h2>
      <button v-if="!gameHasStarted" @click="startGame()">Start Game</button>
      <div v-if="gameHasStarted">
        <h3 class="title">Name: {{player.name}}</h3>
        <h2 class="subtitle">Light Years Traveled: {{player.score}}</h2>
        <h2>{{message}}</h2>
        <button @click="drawCard">Draw a card</button>
        <ul class="hand">
          <li :key="card._id" class="card" v-for="card in hand">
            <div>
              <strong>{{card.name}}</strong>
            </div>
            <span v-if="card.value">{{card.value}}</span>
            <h5 v-if="card.special">{{card.special.description}}</h5>
            <button @click="playCard(card)">Play</button>
            <button @click="discard(card._id)">Discard</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import game from "./Game/Game";
import message from "./Game/gameMessages";

export default Vue.extend({
  data() {
    return {
      gameId: game.deck.deckId,
      gameHasStarted: false,
      players: game.players,
      player: game.players[0],
      deck: game.deck,
      activeDeck: [],
      message: null
    };
  },
  methods: {
    startGame() {
      this.message = message.startMessage;
      this.updateActiveDeck();
      this.dealCard(6);
      this.gameHasStarted = true;
    },
    updateActiveDeck() {
      this.message = "Shuffling the deck...";
      if (this.activeDeck.length < 1) {
        this.activeDeck = this.deck;
      } else {
        this.activeDeck = [];
        this.deck.deck.forEach(card => {
          if (card.discarded === false) {
            this.activeDeck.push(card);
          }
        });
      }
    },
    playCard(card) {
      if (card.value && this.player) {
        this.player.score += card.value;
        this.discard(card._id);
        card.discarded = true;
        this.message = `You just traveled ${
          card.value
        } light years. Keep going!`;
        this.updateActiveDeck();
      } else {
      }
    },
    drawCard() {
      this.dealCard(1);
      this.gameHasStarted = true;
    },
    discard(id) {
      this.deck.deck.forEach(card => {
        if (card._id === id) {
          card.inHand = false;
          card.discarded = true;
        }
      });
      this.updateActiveDeck();
    },
    getRandomNum(length) {
      return Math.floor(Math.random() * length);
    },
    getRandomCard() {
      let randNum = this.getRandomNum(this.activeDeck.length);
      let card = this.activeDeck[randNum];
      return card;
    },
    dealCard(num) {
      for (let i = num; i > 0; i--) {
        let card = this.getRandomCard();
        card.inHand = true;
        console.log(card._id);
        this.player.hand.push(card);
        //console.log(this.player.hand);
      }
    }
  },
  computed: {
    hand: function() {
      const hand = [];

      console.log(this.deck.deck);

      this.deck.deck.forEach(card => {
        console.log(card);
        if (card.inHand) {
          hand.push(card);
        }
      });
      return hand;
    }
  },
  mounted() {}
});
</script>

<style lang="scss">
body {
  font-family: "Source Sans Pro", sans-serif;
}
ul {
  list-style-type: none;
  padding-left: 0;
}

.hand {
  display: grid;
  grid-template-columns: repeat(6, 15%);
  grid-template-rows: 200px;
  grid-column-gap: 1%;
  grid-row-gap: 1%;

  .card {
    display: flex;
    border: 1px solid black;
    padding: 1.5em;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    span {
      font-weight: bold;
      font-size: 2em;
    }
    button {
      border: none;
      border: 1px solid black;
      margin-bottom: 0.5em;
      width: 80%;
      padding: 2%;
    }
  }
}
</style>