<template>
  <div>
    <div v-if="inHazardMode">
      <h2>{{ hazard.name }}</h2>
      <p>{{ hazard.description }}</p>
    </div>
    <h2 v-else>{{ displayMessage }}</h2>
  </div>
</template>

<script>
import store from "../store";

import _ from "lodash";

export default {
  props: ["message"],
  name: "gamemessages",
  computed: {
    inHazardMode() {
      return store.state.inHazardMode;
    },
    hazard() {
      return store.state.hazard;
    },
    displayMessage() {
      return store.state.message;
    }
  }
};
</script>
