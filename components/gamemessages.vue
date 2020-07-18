<template>
  <div>
    <div v-if="hazard">
      <h2>{{ hazardMessage.name }}</h2>
      <p>{{ hazardMessage.description }}</p>
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
    hazard() {
      return store.state.hazard;
    },
    hazardMessage() {
      return store.state.hazardMessage;
    },
    displayMessage() {
      return store.state.message;
    }
  }
};
</script>
