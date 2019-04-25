// app.vue
<template>
  <div>
  Game: {{gameId}}
    <h1>Players</h1>
    <div v-for="player in players">
      <h1 class="title">Name: {{player.name}}</h1>
      <h2 class="subtitle">Score: {{player.score}}</h2>
      <ul class="hand"> 
        <li class="card" v-for="card in player.hand">
          <div><strong>{{card.name}}</strong></div>
          <span v-if="card.value">{{card.value}}</span></li>
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
      });
  }
});
</script>

<style lang="scss">
  body {
    font-family: 'Source Sans Pro', sans-serif;
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
      padding: 4%;
      margin: 1%;
      font-size: 1.5em;
      text-align: center;
      min-width: 20%;

      span {
        font-weight: bold;
        font-size: 2em;
      }
    }
  }

</style>