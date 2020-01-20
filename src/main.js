import Vue from "vue";
import VueRouter from "vue-router";
import { routes } from "./routes";
import store from "./store/store";
import App from "./App.vue";

Vue.config.productionTip = false;

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: "history"
});

Vue.directive("click-outside", {
  bind: (el, binding, vnode) => {
    el.clickOutside = event => {
      if (!(el === event.target || el.contains(event.target))) {
        vnode.context[binding.expression]();
      }
    };
    document.body.addEventListener("click", el.clickOutside);
  },
  unbind: el => {
    document.body.removeEventListener("click", el.clickOutside);
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
