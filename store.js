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
    hazard: null,
    inHazardMode: false,
    hazardGroup: null,
    currentHazardCard: null
  },
  mutations: {
    startGame(state) {
      state.message = message.startMessage;
      state.gameHasStarted = true;

      for (let i = 0; i < 5; i++) {
        store.commit("dealCard");
      }

      store.commit("enterHazardMode");
    },
    dealCard(state) {
      if (state.player.hand.length != 6) {
        store.commit("updateDeck");
        let card = state.deck.pop();
        card.inHand = true;
        state.player.hand.push(card);

        if (state.hazardMode && card.group === state.hazardGroup) {
          card.playable = "true";
        }
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
      }
      console.log(state.inHazardMode);
      console.log(card.group);
      console.log(state.hazardGroup);
      if (state.inHazardMode && card.group === state.hazardGroup) {
        console.log("end hazardmode");
        store.commit("endHazardMode", card);
        store.commit("discard", card);
      }

      //state.player.hand.push(card);
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
    enterHazardMode(state) {
      console.log("hazard mode entered");
      state.inHazardMode = true;
      state.hazard = hazards[_.random(0, hazards.length)];
      state.hazardGroup = state.hazard.group;

      state.player.hand.forEach(card => {
        if (card.group === state.hazardGroup) {
          card.playable = true;
        }
      });
    },
    playHazardMode(state, card) {
      state.player.hand.forEach(card => (card.playable = false));

      if (card.group === state.hazardGroup) {
        console.log("played a hazard card");
        store.commit("endHazardMode", card);
        store.commit("discard", card);
        //card.playable = true;
        // state.inHazardMode = false;
        // state.hazardGroup = null;
      }
    },
    endHazardMode(state, card) {
      card.playable = true;
      state.inHazardMode = false;
      state.hazardGroup = null;
    }
  }
});

export default store;
