const state = {
  token: localStorage.getItem("token") || null,
  username: null
};

const getters = {
  username: () => state.username,
  token: () => state.token
};

const mutations = {
  logIn: (state, payload) => {
    state.token = payload.token;
    state.username = payload.username;
    localStorage.setItem("token", payload.token);
  },
  logOut: state => {
    state.token = "";
    state.username = null;
    localStorage.removeItem("token");
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
