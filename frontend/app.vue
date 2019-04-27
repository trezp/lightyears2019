
<template>
  <div>
    Game: {{gameId}}
    <h1>Players</h1>
    <div :key="player.id" v-for="player in players">
      <h1 class="title">Name: {{player.name}}</h1>
      <h2 class="subtitle">Score: {{player.score}}</h2>
      <p v-if="!gameHasStarted">
        Welcome, {{player.name}}! Let's get this show on the road.
        Your goal is to navigate your spaceship 1,000 light years through space.
        Many perils will befall you along the way! Good luck!
      </p>
      <button @click="drawCard">Draw a card</button>
      <ul class="hand">
        <li :key="card.id" class="card" v-for="card in hand" @click="updateScore(card.value)">
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

export default Vue.extend({
  data() {
    return {
      gameId: "",
      gameHasStarted: false,
      players: null,
      deck: null
    };
  },
  methods: {
    go() {},
    stop() {},
    drawCard() {
      this.dealCard(1);
    },
    updateScore(score) {
      this.players[0].score += score;
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
    axios
      .get("http://localhost:3000")
      .then(response => {
        this.gameId = response.data.gameId;
        this.players = response.data.players;
        this.deck = response.data.deck;
      })
      .then(() => this.dealCard(6))
      .catch(err => console.log(err));
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
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  .card {
    border: 1px solid black;
    padding: 1%;
    margin: 1%;
    font-size: 1.5em;
    text-align: center;
    flex-basis: 20%;

    span {
      font-weight: bold;
      font-size: 2em;
    }
  }
}
</style>