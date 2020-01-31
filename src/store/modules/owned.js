/* eslint-disable no-shadow */
const state = {
  owned: []
};

const getters = {
  owned: state => state.owned,
  stockQuantity: state => symbol => {
    const index = state.owned.map(stock => stock.symbol).indexOf(symbol);
    if (index < 0) {
      return 0;
    } else {
      return state.owned[index].quantity;
    }
  }
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
      if (state.owned[index].quantity === 0) {
        state.owned.splice(index, 1);
      }
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
