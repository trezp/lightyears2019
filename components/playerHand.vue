<template>
  <ul class="hand">
    <li :key="index" v-for="(card, index) in hand" class="card">
      <div>
        <strong>{{ card.name }}</strong>
      </div>
      <span v-if="card.value">{{ card.value }}</span>
      <h5 v-if="card.special">{{ card.special.description }}</h5>
      <button @click="playCard(card)" :disabled="!isPlayableCard">
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
      // decide whether to
      // add to score
      // enter hazard mode
      // change name of dealPeril to Enter Hazard Mode
      // if inHazardMode
      // call function to compare cards and send appropriate messages
      // else
      // continue to play cards

      let rand = _.random(0, 500);

      if (rand % 4 === 0) {
        store.commit("dealPeril", card);
      } else {
        store.commit("playCard", card);
      }
    },
    discard(card) {
      store.commit("discard", card);
    }
  },
  computed: {
    inHazardMode() {
      return store.state.hazard;
    },
    hazardGroup() {
      return store.state.hazardGroup;
    },
    isPlayableCard() {
      // disable cards that aren't playable
    }
  }
};
</script>
