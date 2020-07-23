<template>
  <ul class="hand">
    <li :key="index" v-for="(card, index) in hand" class="card">
      <div>
        <strong>{{ card.name }}</strong>
      </div>
      <span v-if="card.value">{{ card.value }}</span>
      <h5 v-if="card.special">{{ card.special.description }}</h5>
      <button @click="playCard(card)" :disabled="!card.playable">
        Play
      </button>
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
  data: () => {
    return {
      cardHazard: null
    };
  },
  methods: {
    playCard(card) {
      console.log("play cardddd");
      console.log(store.state.inHazardMode);
      if (store.state.inHazardMode === false) {
        console.log("not in hazard mode");
        let rand = _.random(0, 500);
        if (rand % 4 === 0) {
          store.commit("enterHazardMode", card);
        } else {
          store.commit("playCard", card);
        }
      } else {
        store.commit("playHazardMode", card);
      }
    },
    discard(card) {
      store.commit("discard", card);
    }
  },
  computed: {
    hazardGroup() {
      return store.state.hazardGroup;
    }
  }
};
</script>
