const state = {
  message: "",
  loading: false
};

const getters = {
  message: () => state.message,
  loading: () => state.loading
};

const mutations = {
  setStatus: (state, message) => {
    state.message = message;
  },
  resetStatus: state => {
    state.message = "";
  },
  toggleLoading: state => {
    state.loading = !state.loading;
  }
};

const actions = {
  setStatus: (context, message) => {
    context.commit("setStatus", message);
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
