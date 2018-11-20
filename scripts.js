//const getNewGame = require('api');


new Vue({
  el: "#app",
  data: {
    gameId: "",
    players: null,
    deck: null
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