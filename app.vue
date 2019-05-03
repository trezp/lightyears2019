
<template>
  <div>
    Game: {{gameId}}
    <h1>Light Years</h1>
    <div :key="player.id" v-for="player in players">
      <h1 class="title">Name: {{player.name}}</h1>
      <h2 class="subtitle">Light Years Traveled: {{player.score}}</h2>
      <p>
        <span v-if="!gameHasStarted">Hello, {{player.name}}!</span>
        {{message}}
      </p>
      <button v-if="!gameHasStarted" @click="startGame()">Start Game</button>
      <button v-if="gameHasStarted" @click="drawCard">Draw a card</button>
      <ul class="hand">
        <li
          :key="card._id"
          class="card"
          v-for="card in hand"
          @click="playCard(card.value, card._id)"
        >
          <div>
            <strong>{{card.name}}</strong>
          </div>
          <span v-if="card.value">{{card.value}}</span>
          <h5 v-if="card.special">{{card.special.description}}</h5>
          <button>Play</button>
          <button>Discard</button>
        </li>
      </ul>
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
      deck: game.deck,
      message: null
    };
  },
  methods: {
    startGame() {
      this.message = message.startMessage;
      this.dealCard(6);
      this.gameHasStarted = true;
    },
    go(id) {
      if (card._id === id && card) {
      }
    },
    stop() {},
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
    },
    playCard(score, id) {
      if (event.target.innerHTML === "Play") {
        this.players[0].score += score;
      } else if (event.target.innerHTML === "Discard") {
        this.discard(id);
      }
    },
    throwHazard() {},
    getRandomNum(length) {
      return Math.floor(Math.random() * length);
    },
    dealCard(num) {
      for (let i = num; i > 0; i--) {
        let randNum = this.getRandomNum(this.deck.length);
        let card = this.deck.deck[randNum];
        card.inHand = true;
        this.players[0].hand.push(card.id);
      }
    }
  },
  computed: {
    hand: function() {
      const hand = [];
      this.deck.deck.forEach(card => {
        if (card.inHand) {
          hand.push(card);
        }
      });
      return hand;
    }
  },
  mounted() {
    console.log(this.message);
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