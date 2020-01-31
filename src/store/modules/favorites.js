/* eslint-disable no-shadow */
const state = {
  favorites: []
};

const getters = {
  favorites: () => state.favorites
};

const mutations = {
  addToFavorites: (state, symbol) => {
    const index = state.favorites.map(stock => stock.symbol).indexOf(symbol);
    if (index < 0) {
      state.favorites.push({
        symbol: symbol
      });
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

export default {
  state,
  getters,
  mutations
};
