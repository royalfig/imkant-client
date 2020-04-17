<template>
  <div class="font-sans text-base" id="app">
    <b-header />
    <get-and-post-content />
    <post-control />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import GetAndPostContent from "./components/GetAndPostContent";
import PostControl from "./components/PostControl.vue";

export default {
  name: "App",
  components: {
    "b-header": Header,
    GetAndPostContent,
    PostControl,
  },
};
</script>

<style lang="scss"></style>
