<template>
  <div>
    <dashboard :player="player" :message="message"></dashboard>
    <player-hand :hand="hand"></player-hand>
  </div>
</template>

<script>
import Vue from "vue";
import store from "./store";
import deck from "./Game/Deck";
import player from "./Game/Player";
import message from "./Game/gameMessages";
import playerHand from "./components/playerHand";
import dashboard from "./components/dashboard";

import _ from "lodash";

export default Vue.extend({
  name: "App",
  components: {
    playerHand,
    dashboard
  },
  store: store,
  methods: {
    examineDeck() {
      this.deck.forEach(card => console.log(card.name, card.value));
    },
    startGame() {
      this.$store.commit("startGame");
    },
    dealCard() {
      this.$store.commit("dealCard");
    }
  },
  computed: {
    player() {
      return store.state.player;
    },
    message() {
      return store.state.message;
    },
    hand() {
      return store.state.player.hand;
    }
  },
  mounted() {
    this.startGame();
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

button {
  border: none;
  border: 1px solid black;
  margin-bottom: 0.5em;
  width: 80%;
  padding: 2%;
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
  }
}
</style>
