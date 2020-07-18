import Vue from "vue";
import Vuex from "vuex";

import _ from "lodash";

import deck from "./Game/Deck";
import player from "./Game/Player";
import message from "./Game/gameMessages";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 0,
    gameHasStarted: false,
    player: player,
    deck: _.shuffle(deck.deck),
    discardedDeck: [],
    message: null
  },
  mutations: {
    startGame(state) {
      state.message = message.startMessage;
      state.gameHasStarted = true;

      for (let i = 0; i < 6; i++) {
        store.commit("dealCard");
      }
    },
    dealCard(state) {
      store.commit("updateDeck");
      let card = state.deck.pop();
      card.inHand = true;
      state.player.hand.push(card);
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

        this.message = `You just traveled ${
          card.value
        } light years. Keep going!`;
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
    }
  }
});

export default store;
