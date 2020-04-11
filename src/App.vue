<template>
  <div id="app">
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
    PostControl
  }
};
</script>

<style lang="scss">
@import "~bulma/sass/utilities/_all";

$primary: #80deea;

$primary-invert: findColorInvert($primary);
$dark: #0d0e0f;
$primary-invert: findColorInvert($dark);
$danger: #fd3c01;
$danger-invert: findColorInvert($danger);
$colors: (
  // "text": #f5f5f5,
    // "textInverse": rgb(10, 10, 10),
    // "text1": #e8e9e9,
    // "text2": #c7c7c8,
    // "text3": #a5a5a7,
    // "text4": #616264,
    // "surface": #09090a,
    // "surface1": #0d0e0f,
    // "surface2": #111214,
    // "surface3": #1a1b1f,
    // "surface4": #1d1e22,
    "dark": ($dark, $dark-invert),
  "primary": ($primary, $primary-invert),
  "info": ($primary, $primary-invert),
  "danger": ($danger, $danger-invert)
);

$link: $primary;

@import "~bulma";
@import "~buefy/src/scss/buefy";
html {
}
#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
