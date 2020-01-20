/* eslint-disable no-shadow */
const state = {
  funds: 10000
};

const getters = {
  getFunds: () => state.funds,
  fundsFormat: () => {
    const fundsRound = Math.round(state.funds);
    const fundsArray = fundsRound.toString().split("");
    if (fundsArray.length > 3) {
      fundsArray.splice(fundsArray.length - 3, 0, ".");
    }
    return fundsArray.join("");
  }
};

const mutations = {
  buy: (state, payload) => {
    state.funds -= payload.price * payload.quantity;
  },
  setFunds: (state, fund) => {
    console.log(fund);
    state.funds = fund;
  }
};

export default {
  state,
  getters,
  mutations
};
