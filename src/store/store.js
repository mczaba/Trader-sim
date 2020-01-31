import Vue from "vue";
import Vuex from "vuex";
import funds from "./modules/funds";
import favorites from "./modules/favorites";
import owned from "./modules/owned";
import rate from "./modules/rate";
import auth from "./modules/auth";
import status from "./modules/status";
import currentPrice from "./modules/currentPrice";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    funds,
    favorites,
    owned,
    rate,
    auth,
    status,
    currentPrice
  },
  mutations: {
    reset: state => {
      state.funds.funds = 10000;
      state.favorites.favorites = [];
      state.owned.owned = [];
    }
  },
  actions: {
    buy: ({ commit, state, dispatch }, payload) => {
      if (payload.quantity < 0) {
        alert("can't buy a negative amount");
      } else {
        const totalPrice = payload.price * payload.quantity;
        if (totalPrice > state.funds.funds) {
          alert("you do not have enough money to buy these stocks");
        } else {
          commit("buy", {
            price: payload.price,
            quantity: payload.quantity
          });
          commit("addStock", {
            symbol: payload.symbol,
            quantity: payload.quantity
          });
          dispatch(
            "setStatus",
            `You bought ${payload.quantity} ${payload.symbol} stocks for a total of ${totalPrice}`
          );
        }
      }
    },
    sell: ({ commit, getters, dispatch }, payload) => {
      if (payload.quantity < 0) {
        alert("can't sell a negative amount");
      } else if (payload.quantity > getters.stockQuantity(payload.symbol)) {
        alert("can't sell more stocks than you own");
      } else {
        commit("buy", {
          price: -1 * payload.price,
          quantity: payload.quantity
        });
        commit("sellStock", {
          symbol: payload.symbol,
          quantity: payload.quantity
        });
        const totalPrice = payload.quantity * payload.price;
        dispatch(
          "setStatus",
          `You sold ${payload.quantity} ${payload.symbol} stocks for a total of ${totalPrice}`
        );
      }
    },
    save: ({ dispatch, state }) => {
      fetch(`${process.env.VUE_APP_API_ADRESS}/save`, {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${state.auth.token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          funds: state.funds.funds,
          favorites: state.favorites.favorites,
          owned: state.owned.owned
        })
      })
        .then(response => response.json())
        .then(response => {
          if (response.status !== 200) {
            dispatch("setStatus", `Couldn't save : ${response.message}`);
          } else {
            dispatch("setStatus", "Successfully saved !");
          }
        })
        .catch(() => {
          dispatch("setStatus", "Couldn't save : can't reach the server");
        });
    },
    load: ({ commit, dispatch, state }) => {
      fetch(`${process.env.VUE_APP_API_ADRESS}/save`, {
        mode: "cors",
        headers: {
          Authorization: `Bearer ${state.auth.token}`
        }
      })
        .then(response => response.json())
        .then(response => {
          commit("setFunds", response.funds);
          commit("setOwned", response.owned);
          commit("setFav", response.favorites);
        })
        .catch(() => {
          dispatch("setStatus", "Couldn't load data : can't reach the server");
        });
    },
    changeName: ({ commit }, payload) => {
      commit("changeNameFav", payload);
      commit("changeNameOwned", payload);
    }
  }
});
