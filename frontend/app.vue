// app.vue
<template>
  <div>
  Game: {{gameId}}
    <h1>Players</h1>
    <ul v-for="player in players">
      <li>Name: {{player.name}}</li>
      <li>Score: {{player.score}}</li>
      <li>Hand: 
      <ul v-for="card in player.hand">
        <li>
          <div><strong>{{card.name}}</strong></div>
          <span v-if="card.value"> Value: {{card.value}}</span></li>
      </ul>
      <li>
    </ul>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
export default Vue.extend({
  data() {
    return {
      gameId: "",
      players: null,
      deck: null
    };
  },
  mounted(){
    axios.get('http://localhost:3000')
      .then(response => {
        this.gameId = response.data.gameId, 
        this.players = response.data.players,
        this.deck = response.data.deck
      })
  }
});
</script>

<style lang="scss" scoped>
.container {
  color: green;
}
</style>