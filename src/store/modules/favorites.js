/* eslint-disable no-shadow */
const state = {
  favorites: []
};

const getters = {
  favorites: () => state.favorites
};

const mutations = {
  addToFavorites: (state, payload) => {
    const index = state.favorites
      .map(stock => stock.symbol)
      .indexOf(payload.symbol);
    if (index < 0) {
      state.favorites.push(payload);
    }
  },
  removeFromFav: (state, payload) => {
    const index = state.favorites.indexOf(payload);
    state.favorites.splice(index, 1);
  },
  setFav: (state, favorites) => {
    state.favorites = [...favorites];
  },
  changeNameFav: (state, payload) => {
    const index = state.favorites
      .map(stock => stock.symbol)
      .indexOf(payload.symbol);
    if (index >= 0) {
      state.favorites[index].customName = payload.newName;
    }
  }
};

const actions = {
  addToFavorites: ({ commit, rootState }, payload) => {
    const ownedIndex = rootState.owned.owned
      .map(stock => stock.symbol)
      .indexOf(payload.symbol);
    if (ownedIndex >= 0) {
      const customName = rootState.owned.owned[ownedIndex].customName;
      if (customName) {
        const newStock = { ...payload, customName };
        commit("addToFavorites", newStock);
      } else {
        commit("addToFavorites", payload);
      }
    } else {
      commit("addToFavorites", payload);
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
