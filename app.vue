<template>
  <div>
    <h1>Light Years</h1>
    <div>
      <h2 v-if="!gameHasStarted">
        <span>Hello, {{player.name}}! Let your journey begin!</span>
      </h2>
      <button v-if="!gameHasStarted" @click="startGame()">Start Game</button>
      <div v-if="gameHasStarted">
        <messageConsole :player="player" :message="message" />
        <!-- <h3 class="title">Name: {{player.name}}</h3>
        <h2 class="subtitle">Light Years Traveled: {{player.score}}</h2>
        <h2>{{message}}</h2>-->
        <button @click="dealCard">Draw a card</button>

        <ul class="hand">
          <li :key="index" v-for="(card, index) in player.hand" class="card">
            <div>
              <strong>{{card.name}}</strong>
            </div>
            <span v-if="card.value">{{card.value}}</span>
            <h5 v-if="card.special">{{card.special.description}}</h5>
            <button @click="playCard(card)">Play</button>
            <button @click="discard(card)">Discard</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import deck from "./Game/Deck";
import player from "./Game/Player";
import message from "./Game/gameMessages";
import MessageConsole from "./Game/MessageConsole";
import Hand from "./Hand";
import _ from "lodash";

export default Vue.extend({
  components: {
    MessageConsole
  },
  data() {
    return {
      gameHasStarted: false,
      player: player,
      deck: _.shuffle(deck.deck),
      discardedDeck: [],
      message: null
    };
  },
  methods: {
    examineDeck() {
      this.deck.forEach(card => console.log(card.name, card.value));
    },
    startGame() {
      this.message = message.startMessage;
      this.gameHasStarted = true;

      for (let i = 0; i < 6; i++) {
        this.dealCard();
      }
    },
    dealCard() {
      this.updateDeck();
      let card = this.deck.pop();
      card.inHand = true;
      this.player.hand.push(card);
    },
    playCard(card) {
      this.updateDeck();
      if (card.value) {
        this.player.score += card.value;

        this.message = `You just traveled ${card.value} light years. Keep going!`;
      }
      this.player.hand.push(card);
      this.discard(card);
    },
    discard(card) {
      card.inHand = false;
      card.discarded = true;
      this.discardedDeck.push(card);
      this.player.hand = this.player.hand.filter(used => used._id !== card._id);
    },
    updateDeck() {
      if (this.deck.length < 2) {
        this.deck = _.shuffle(this.discardedDeck);
        this.deck.forEach(card => (card.discarded = false));
        this.discardedDeck = [];
      }
      this.deck = this.deck.filter(card => !card.inHand);
    }
  },
  mounted() {
    //this.examineDeck();
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