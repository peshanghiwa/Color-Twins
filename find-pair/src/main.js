import Vue from "vue";
import App from "./App.vue";
import VueCookies from "vue-cookies";
import vueRouter from "vue-router";
import { routes } from "./routes";
require("babel-core/register");
require("babel-polyfill");

import { store } from "./store/store.js";

Vue.use(vueRouter);
Vue.use(VueCookies);
Vue.$cookies.config("10h");

const router = new vueRouter({
  mode: "history",
  routes
});

Vue.directive("lock", {
  bind(el, binding, vnode) {
    if (binding.value == true) el.style.pointerEvents = "none";
  }
});

new Vue({
  el: "#app",
  store,
  router,
  render: h => h(App)
});
