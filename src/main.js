import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App";
import store from "./store";
import Dashboard from "@/components/Dashboard";
import PostControl from "@/components/PostControl";
import PostQuery from "@/components/PostQuery";

import "@/assets/css/tailwind.css";

Vue.config.productionTip = false;

const router = new VueRouter({
  routes: [
    { path: "/", component: Dashboard },
    { path: "/post-control", component: PostControl },
    { path: "/post-query", component: PostQuery }
  ]
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
