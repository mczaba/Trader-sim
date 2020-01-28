import Vue from "vue";
import Vuex from "vuex";
import funds from "./modules/funds";
import favorites from "./modules/favorites";
import owned from "./modules/owned";
import rate from "./modules/rate";
import auth from "./modules/auth";
import status from "./modules/status";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    funds,
    favorites,
    owned,
    rate,
    auth,
    status
  },
  mutations: {
    reset: state => {
      state.funds.funds = 10000;
      state.favorites.favorites = [];
      state.owned.owned = [];
    }
  },
  actions: {
    save: context => {
      context.commit("setStatus", { message: "Saving...", status: "pending" });
      fetch("http://localhost:5000/save", {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${context.state.auth.token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          funds: context.state.funds.funds,
          favorites: context.state.favorites.favorites,
          owned: context.state.owned.owned
        })
      })
        .then(response => response.json())
        .then(response => {
          if (response.status !== 200) {
            context.dispatch("setStatus", {
              message: `Couldn't save : ${response.message}`,
              status: "error"
            });
          } else {
            context.dispatch("setStatus", {
              message: "Successfully saved !",
              status: "success"
            });
          }
        })
        .catch(() => {
          context.dispatch("setStatus", {
            message: "Couldn't save : can't reach the server",
            status: "error"
          });
        });
    },
    load: context => {
      context.commit("setStatus", {
        message: "Loading your save...",
        status: "pending"
      });
      fetch("http://localhost:5000/save", {
        mode: "cors",
        headers: {
          Authorization: `Bearer ${context.state.auth.token}`
        }
      })
        .then(response => response.json())
        .then(response => {
          context.commit("setFunds", response.funds);
          context.commit("setOwned", response.owned);
          context.commit("setFav", response.favorites);
        })
        .catch(() => {
          context.dispatch("setStatus", {
            message: "Couldn't load data : can't reach the server",
            status: "error"
          });
        });
    }
  }
});
