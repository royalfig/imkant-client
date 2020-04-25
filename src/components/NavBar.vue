<template>
  <nav class="text-blue-darkest flex items-center p-4 bg-blue-lightest">
    <div class="flex items-center">
      <div class="w-8 h-8 mr-2">
        <img src="./img/kantbot.png" alt="" />
      </div>
      <h1 class="font-bold"><router-link to="/">Kant Bot</router-link></h1>
    </div>
    <ul class="flex ml-auto">
      <li>
        <router-link
          to="/"
          class="mr-4 border-b border-transparent hover:border-blue-darkest"
          >Home</router-link
        >
      </li>
      <li>
        <router-link
          to="/post-query"
          class="mr-4 border-b border-transparent hover:border-blue-darkest"
          >Scrape</router-link
        >
      </li>
      <li>
        <router-link
          to="/post-control"
          class="border-b border-transparent hover:border-blue-darkest"
          >Posts</router-link
        >
      </li>
    </ul>
  </nav>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
:not(h1) > .router-link-exact-active {
  color: #112f45;
  border-bottom: 1px solid currentColor;
}
</style>
