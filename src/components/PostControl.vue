<template>
  <section class="hero flex justify-center items-center">
    <div class="container flex justify-center flex-col px-20 m-8">
      <h2 class="font-bold text-2xl text-white">Posts</h2>

      <kb-gauge>
        <template #title>Read 'Em and Weep</template>
        <template #data-1>
          <span style="font-size: 1.5em"></span>
        </template>
        <template #data-2>
          <button @click="page = 0" :class="{ active: page === 0 }">1</button>
          <button @click="page = 1" :class="{ active: page === 1 }">2</button>
          <a
            v-for="post in currentPage"
            :key="post.title"
            :href="post.url + 'edit'"
            target="_blank"
            class="flex items-center mb-2"
          >
            <img :src="post.feature_image" alt class="w-4 h-4 rounded-full mr-2" />
            <p class="leading-none">{{ post.title }}</p>
            <span
              class="text-xs rounded-full font-normal p-1 ml-2 bg-green-500 whitespace-no-wrap"
            >{{ post.primary_tag.name }}</span>
          </a>
        </template>
      </kb-gauge>
    </div>
  </section>
</template>

<script>
import Gauge from "./Gauge";
import { mapState, mapGetters } from "vuex";
export default {
  components: {
    "kb-gauge": Gauge
  },
  data() {
    return {
      page: 0
    };
  },
  computed: {
    ...mapState({
      posts: state => state.posts
    }),
    ...mapGetters("posts", {
      pages: "pages"
    }),
    currentPage() {
      return this.$store.getters["posts/pages"][this.page];
    }
  }
};
</script>

<style lang="scss" scoped>
.active {
  background: red;
}
</style>
