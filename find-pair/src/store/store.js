import Vue from "vue";
import vuex from "vuex";

Vue.use(vuex);

export const store = new vuex.Store({
  state: {
    box: $cookies.get("difficulty") == "4 X 4" ? 4 : 6,
    possibleColors: [
      "#079992",
      "#0a3d62",
      "#0c2461",
      "#b71540",
      "#e58e26",
      "#eb2f06",
      "#b8e994",
      "#e55039",
      "#ffa502",
      "#4b6584",
      "#a5b1c2",
      "#fc5c65",
      "#BDC581",
      "#55E6C1",
      "#cd6133",
      "#f7f1e3",
      "#a29bfe",
      "#fab1a0",
      "#2c2c54",
      "#58B19F"
    ],
    boxColors: [],
    boxBackgrounds: {},
    selectedDifficulty: $cookies.get("difficulty")
  },

  getters: {
    getNumberOfBoxes(state) {
      return state.box;
    },
    getselectedDifficulty(state) {
      return state.selectedDifficulty;
    },
    getBoxColors(state) {
      return state.boxColors;
    },
    getMusicPlay(state) {
      return state.music;
    }
  },

  mutations: {
    setDifficulty: (state, { value }) => {
      state.selectedDifficulty = value;
      if (state.selectedDifficulty === "4 X 4") {
        state.box = 4;
      } else if (state.selectedDifficulty === "6 X 6") {
        state.box = 6;
      }
    },

    generateGame: state => {
      state.boxColors = [];
      const boxes = (state.box * state.box) / 2;
      let pickedColor;
      for (let i = 1; i <= boxes; i++) {
        pickedColor = Math.floor(Math.random() * state.possibleColors.length);
        if (state.boxColors.includes(pickedColor)) {
          pickedColor = Math.floor(Math.random() * state.possibleColors.length);
        }
        state.boxColors.push(state.possibleColors[pickedColor]);
      }
    }
  },

  actions: {
    setDifficulty: ({ commit, state }, value) => {
      commit("setDifficulty", value);
    },
    generateGame: ({ commit }, state) => {
      commit("generateGame");
    }
  }
});
