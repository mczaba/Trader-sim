/* eslint-disable no-shadow */
const state = {
  owned: []
};

const getters = {
  owned: () => state.owned
};

const mutations = {
  addStock: (state, payload) => {
    const index = state.owned
      .map(stock => stock.symbol)
      .indexOf(payload.symbol);
    if (index < 0) {
      state.owned.push({
        symbol: payload.symbol,
        quantity: payload.quantity
      });
    } else {
      state.owned[index].quantity += payload.quantity;
    }
  },
  sellStock: (state, payload) => {
    const index = state.owned
      .map(stock => stock.symbol)
      .indexOf(payload.symbol);
    if (state.owned[index].quantity >= payload.quantity) {
      state.owned[index].quantity -= payload.quantity;
    }
  },
  setOwned: (state, owned) => {
    state.owned = [...owned];
  }
};

export default {
  state,
  getters,
  mutations
};
