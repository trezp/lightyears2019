import Vue from "vue";
import Vuex from "vuex";

import _ from "lodash";

import deck from "./Game/Deck";
import player from "./Game/Player";
import message from "./Game/gameMessages";
import hazards from "./Game/hazards";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 0,
    gameHasStarted: false,
    player: player,
    deck: _.shuffle(deck.deck),
    discardedDeck: [],
    message: null,
    hazardMessage: null,
    hazard: false
  },
  mutations: {
    startGame(state) {
      state.message = message.startMessage;
      state.gameHasStarted = true;

      for (let i = 0; i < 5; i++) {
        store.commit("dealCard");
      }
    },
    dealCard(state) {
      if (state.player.hand.length != 6) {
        store.commit("updateDeck");
        let card = state.deck.pop();
        card.inHand = true;
        state.player.hand.push(card);
      }
    },
    updateDeck(state) {
      if (state.deck.length < 2) {
        state.deck = _.shuffle(this.discardedDeck);
        state.deck.forEach(card => (card.discarded = false));
        state.discardedDeck = [];
      }
      state.deck = state.deck.filter(card => !card.inHand);
    },
    playCard(state, card) {
      store.commit("updateDeck");
      if (card.value) {
        state.player.score += card.value;

        // state.message = `You just traveled ${
        //   card.value
        // } light years. Keep going!`;
      }
      state.player.hand.push(card);
      store.commit("discard", card);
    },
    discard(state, card) {
      card.inHand = false;
      card.discarded = true;
      state.discardedDeck.push(card);
      state.player.hand = state.player.hand.filter(
        used => used._id !== card._id
      );
    },
    dealPeril(state) {
      state.hazard = true;
      console.log("HAZARD");
      state.hazardMessage = hazards[_.random(0, hazards.length)];
    }
  }
});

export default store;
