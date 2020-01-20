import Vue from "vue";
import Vuex from "vuex";
import funds from "./modules/funds";
import favorites from "./modules/favorites";
import owned from "./modules/owned";
import rate from "./modules/rate";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    funds,
    favorites,
    owned,
    rate
  }
});
