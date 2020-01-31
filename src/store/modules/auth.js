import router from "../../main.js";

const state = {
  token: "",
  username: null,
  logError: null,
  signError: null
};

const getters = {
  username: () => state.username,
  logError: () => state.logError,
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
  setLogError: (state, error) => {
    state.logError = error;
  },
  setSignError: (state, error) => {
    state.signError = error;
  }
};

const actions = {
  logIn: ({ commit, dispatch }, payload) => {
    commit("toggleLoading");
    fetch(`${process.env.VUE_APP_API_ADRESS}/users/login`, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: payload.username,
        password: payload.password
      })
    })
      .then(response => response.json())
      .then(response => {
        commit("toggleLoading");
        if (response.message) {
          commit("setLogError", response.message);
        } else {
          commit("logIn", {
            token: response.token,
            username: response.username
          });
          if (payload.signUp) {
            dispatch("save");
          } else {
            router.push("/");
            dispatch("load");
            commit("setLogError", null);
          }
        }
      })
      .catch(() => {
        commit("toggleLoading");
        dispatch("setStatus", "Couldn't log in : can't reach the server");
      });
  },
  signUp: ({ commit, dispatch }, payload) => {
    commit("toggleLoading");
    fetch(`${process.env.VUE_APP_API_ADRESS}/users/signup`, {
      mode: "cors",
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: payload.username,
        email: payload.email,
        password: payload.password,
        passwordConf: payload.passwordConf
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response.message === "Success") {
          dispatch("logIn", {
            username: payload.username,
            password: payload.password,
            signUp: true
          });
        } else {
          commit("setSignError", response.message);
        }
      })
      .catch(() => {
        dispatch("setStatus", "Couldn't sign up : can't reach the server");
      });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
