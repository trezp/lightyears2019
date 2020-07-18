<template>
  <ul class="hand">
    <li :key="index" v-for="(card, index) in hand" class="card">
      <div>
        <strong>{{ card.name }}</strong>
      </div>
      <span v-if="card.value">{{ card.value }}</span>
      <h5 v-if="card.special">{{ card.special.description }}</h5>
      <button @click="playCard(card)">Play</button>
      <button @click="discard(card)">Discard</button>
    </li>
  </ul>
</template>

<script>
import store from "../store";

import _ from "lodash";

export default {
  props: ["hand"],
  name: "playerHand",
  methods: {
    playCard(card) {
      let rand = _.random(0, 500);
      console.log(rand);
      if (rand % 4 === 0) {
        store.commit("dealPeril");
      } else {
        store.commit("playCard", card);
      }
    },
    discard(card) {
      store.commit("discard", card);
    }
  }
};
</script>
