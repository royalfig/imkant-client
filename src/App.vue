<template>
  <div id="app">
    <b-header />
    <post-control />
  </div>
</template>

<script>
import PostControl from "./components/PostControl.vue";
import Header from "./components/Header.vue";

export default {
  name: "App",
  components: {
    PostControl,
    "b-header": Header
  }
};
</script>

<style lang="scss">
@import "~bulma/sass/utilities/_all";
#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>
