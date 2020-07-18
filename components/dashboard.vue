<template>
  <div class="dashboard">
    <h1 class="subtitle">Light Years Traveled: {{ player.score }}</h1>
    <div>
      <game-messages></game-messages>
      <button type="button" @click="draw" :disabled="cardsInHand === 6">
        Draw
      </button>
    </div>
  </div>
</template>

<script>
import store from "../store";

import gameMessages from "./gamemessages";

export default {
  name: "dashboard",
  props: ["player", "message"],
  components: {
    gameMessages
  },
  methods: {
    draw() {
      store.commit("dealCard");
    }
  },
  computed: {
    cardsInHand() {
      return store.state.player.hand.length;
    }
  }
};
</script>

<style lang="scss">
.dashboard {
  display: flex;
  h1 {
    font-size: 60px;
  }
  h2 {
    align-self: center;
  }
}
</style>
