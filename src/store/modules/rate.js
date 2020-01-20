const state = {
  rate: 0
};

const getters = {
  rate: () => state.rate
};

const mutations = {
  updateRate: (state, newRate) => {
    state.rate = newRate;
  }
};

const actions = {
  updateRate: context => {
    fetch("https://api.exchangeratesapi.io/latest")
      .then(response => response.json())
      .then(response => {
        context.commit("updateRate", response.rates["USD"]);
      });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
