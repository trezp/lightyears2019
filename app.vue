
//TO DO 
// use player.hand instead of computed property for now
<template>
  <div>
    <h1>Light Years</h1>

    <div>
      <h2 v-if="!gameHasStarted">
        <span>Hello, {{player.name}}! Let your journey begin!</span>
      </h2>
      <button v-if="!gameHasStarted" @click="startGame()">Start Game</button>
      <div v-if="gameHasStarted">
        <h3 class="title">Name: {{player.name}}</h3>
        <h2 class="subtitle">Light Years Traveled: {{player.score}}</h2>
        <h2>{{message}}</h2>
        <button @click="dealCard">Draw a card</button>
        <ul class="hand">
          <li :key="card._id" class="card" v-for="(card, index) in player.hand">
            <div>
              <strong>{{card.name}}</strong>
            </div>
            <span v-if="card.value">{{card.value}}</span>
            <h5 v-if="card.special">{{card.special.description}}</h5>
            <button @click="playCard(card, index)">Play</button>
            <button @click="discard(card, index)">Discard</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import deck from "./Game/Deck";
import player from "./Game/Player";
import message from "./Game/gameMessages";

export default Vue.extend({
  data() {
    return {
      gameHasStarted: false,
      player: player,
      deck: deck,
      discardedDeck: [],
      hand: [],
      activeDeckLength: 0,
      message: null
    };
  },
  methods: {
    startGame() {
      this.message = message.startMessage;
      this.gameHasStarted = true;

      for (let i = 0; i < 6; i++) {
        this.dealCard();
      }
    },
    getRandomNumber() {
      return Math.floor(Math.random() * this.deck.deck.length);
    },
    getRandomCard() {
      return this.deck.deck[this.getRandomNumber()];
    },
    dealCard() {
      let card = this.getRandomCard();
      // If less than one card in the deck, refill deck
      if (this.deck.deck.length <= 1) {
        this.deck.deck = this.discardedDeck;
        this.deck.deck.forEach(card => (card.discarded = false));
        this.discarded.deck = [];
      }
      card.inHand = true;
      this.player.hand.push(card);
    },
    playCard(card, index) {
      if (card.value) {
        this.player.score += card.value;

        this.message = `You just traveled ${
          card.value
        } light years. Keep going!`;
      }
      card.discarded = true;
      card.inHand = false;
      this.discard(card, index);
    },
    discard(card, index) {
      card.inHand = false;
      card.discarded = true;
      this.discardedDeck.push(card);
      this.deck.deck.splice(index, 1);
    }
  },
  computed: {
    computedHand: function() {
      const hand = [];
      this.player.hand.forEach(card => {
        if (card.inHand) {
          hand.push(card);
        }
      });
      this.hand = hand;
      return hand;
    }
  }
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