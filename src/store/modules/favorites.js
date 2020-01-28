/* eslint-disable no-shadow */
const state = {
  favorites: []
};

const getters = {
  favorites: () => state.favorites
};

const mutations = {
  addToFavorites: (state, payload) => {
    if (!state.favorites.includes(payload.symbol)) {
      state.favorites.push(payload.symbol);
    }
  },
  removeFromFav: (state, payload) => {
    const index = state.favorites.indexOf(payload);
    state.favorites.splice(index, 1);
  },
  setFav: (state, favorites) => {
    state.favorites = [...favorites];
  }
};

export default {
  state,
  getters,
  mutations
};
