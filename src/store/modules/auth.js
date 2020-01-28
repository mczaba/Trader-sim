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
  logIn: (context, payload) => {
    fetch("http://localhost:5000/users/login", {
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
        if (response.message) {
          context.commit("setLogError", response.message);
          context.dispatch("setStatus", {
            message: "Couldn't log in !",
            status: "error"
          });
        } else {
          context.commit("logIn", {
            token: response.token,
            username: response.username
          });
          if (payload.signUp) {
            context.dispatch("save");
          } else {
            router.push("/");
            context.dispatch("load");
            context.commit("setLogError", null);
            context.dispatch("setStatus", {
              message: "Successfully logged in !",
              status: "success"
            });
          }
        }
      })
      .catch(() => {
        context.dispatch("setStatus", {
          message: "Couldn't log in : can't reach the server",
          status: "error"
        });
      });
  },
  signUp: (context, payload) => {
    context.commit("setStatus", {
      message: "Signing up...",
      status: "pending"
    });
    fetch("http://localhost:5000/users/signup", {
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
      .then(response => {
        if (response.status === 200) {
          context.dispatch("setStatus", {
            message: "Successfully signed up !",
            status: "success"
          });
        } else {
          context.dispatch("setStatus", {
            message: "Couldn't sign up",
            status: "error"
          });
        }
        return response.json();
      })
      .then(response => {
        if (response.message === "Success") {
          context.dispatch("logIn", {
            username: payload.username,
            password: payload.password,
            signUp: true
          });
        } else {
          context.commit("setSignError", response.message);
        }
      })
      .catch(() => {
        context.dispatch("setStatus", {
          message: "Couldn't sign up : can't reach the server",
          status: "error"
        });
      });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
