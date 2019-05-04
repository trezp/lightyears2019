
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
        <button @click="drawCard">Draw a card</button>
        <ul class="hand">
          <li :key="i+10" class="card" v-for="(card, i) in computedHand">
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
import deck from "./Game/Deck";
import player from "./Game/Player";
import message from "./Game/gameMessages";

export default Vue.extend({
  data() {
    return {
      gameHasStarted: false,
      player: player,
      deck: deck,
      activeDeckLength: 0,
      message: null
    };
  },
  methods: {
    startGame() {
      this.message = message.startMessage;
      this.dealCard(6);
      this.gameHasStarted = true;
    },
    playCard(card) {
      console.log(this.activeDeckLength);
      if (card.value && this.player) {
        this.player.score += card.value;
        this.discard(card._id);
        card.discarded = true;
        this.message = `You just traveled ${
          card.value
        } light years. Keep going!`;
      } else {
      }
    },
    drawCard() {
      console.log(this.activeDeckLength);
      this.dealCard(1);
      this.gameHasStarted = true;
    },
    discard(id) {
      console.log(this.activeDeckLength);
      this.deck.deck.forEach(card => {
        if (card._id === id) {
          card.inHand = false;
          card.discarded = true;
        }
      });
    },
    getRandomNumber(length) {
      return Math.floor(Math.random() * length);
    },
    getRandomCard() {
      const length = this.getActiveDeckLength();
      console.log(length);
      const randNum = this.getRandomNumber(length);
      const card = this.deck.deck[randNum];

      if (!card.inHand && !card.discarded) {
        return card;
      } else {
        this.getRandomCard();
      }
    },
    dealCard(num) {
      for (let i = 0; i < num; i++) {
        let card = this.getRandomCard();
        card.inHand = true;
        this.player.hand.push(card);
      }
    },
    getActiveDeckLength() {
      let count = 0;
      this.deck.deck.forEach(card => {
        if (!card.inHand && !card.discarded) {
          count++;
        }
      });
      this.activeDeckLength = count;
      return count;
    }
  },
  computed: {
    computedHand: function() {
      let hand = [];
      this.player.hand.forEach(card => {
        if (card.inHand && !card.discarded) {
          hand.push(card);
        }
      });
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