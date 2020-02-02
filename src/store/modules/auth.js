const state = {
  token: "",
  username: null,
  signError: null
};

const getters = {
  username: () => state.username,
  signError: () => state.signError
};

const mutations = {
  logIn: (state, payload) => {
    state.token = payload.token;
    state.username = payload.username;
  },
  logOut: state => {
    state.token = "";
    state.username = null;
  },
  setSignError: (state, error) => {
    state.signError = error;
  }
};

export default {
  state,
  getters,
  mutations
};
