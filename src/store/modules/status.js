const state = {
  message: "",
  status: ""
};

const getters = {
  message: () => state.message,
  status: () => state.status
};

const mutations = {
  setStatus: (state, payload) => {
    state.message = payload.message;
    state.status = payload.status;
  },
  resetStatus: state => {
    state.message = "";
    state.status = "";
  }
};

const actions = {
  setStatus: (context, payload) => {
    context.commit("setStatus", payload);
    setTimeout(() => {
      context.commit("resetStatus");
    }, 1500);
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
