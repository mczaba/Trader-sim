const state = {
  price: null
};

const getters = {
  price: () => state.price
};

const mutations = {
  setPrice: (state, price) => {
    state.price = price;
  }
};

export default {
  state,
  getters,
  mutations
};
