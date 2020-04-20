<template>
  <div class="font-sans text-base" id="app">
    <kb-header />
    <kb-dashboard />
    <!-- <get-and-post-content /> -->
    <!-- <post-control /> -->
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Dashboard from "./components/Dashboard";
// import GetAndPostContent from "./components/GetAndPostContent";
// import PostControl from "./components/PostControl.vue";

export default {
  name: "App",
  components: {
    "kb-header": Header,
    "kb-dashboard": Dashboard
    // GetAndPostContent,
    // PostControl
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
}
</style>
