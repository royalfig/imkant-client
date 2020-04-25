<template>
  <div class="font-sans text-base" id="app">
    <nav-bar />
    <kb-header />
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import Header from "./components/Header.vue";
// import Dashboard from "./components/Dashboard";
// // import GetAndPostContent from "./components/GetAndPostContent";
// import PostControl from "./components/PostControl.vue";
// import PostQuery from "./components/PostQuery.vue";

export default {
  name: "App",
  components: {
    NavBar,
    "kb-header": Header
    // "kb-dashboard": Dashboard,
    // // GetAndPostContent,
    // PostControl,
    // PostQuery
  }
};
</script>

<style lang="scss">
#app {
  min-height: 100vh;
  background-image: linear-gradient(
    to bottom,
    #00071a,
    #112f45,
    #115773,
    #00849e,
    #00b3c2
  );
  font-family: -apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
</style>
