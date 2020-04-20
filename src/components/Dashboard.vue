<template>
  <section class="hero flex justify-center items-center">
    <div class="container flex justify-center flex-col px-20 m-8">
      <h2 class="font-bold text-2xl text-white">Dashboard</h2>
      <div class="flex my-4">
        <kb-gauge>
          <template #title>Total Posts</template>
          <template #data-1
            ><span style="font-size: 1.5em">{{ total }}</span></template
          >
          <template #data-2
            ><span class="uppercase text-sm"
              >+{{ thisMonth }} this month</span
            ></template
          >
        </kb-gauge>
        <kb-gauge>
          <template #title>Latest Post</template>

          <template #data-1>
            <div class="flex items-center">
              <a
                class="flex items-center"
                :href="firstPost.url + 'edit'"
                target="_blank"
                ><img
                  class="rounded-full mr-2 profile__img"
                  :src="firstPost.img"
                />{{ firstPost.title }}</a
              >
              <span
                class="text-sm rounded-full p-1 ml-2 bg-green-500 whitespace-no-wrap"
                >{{ firstPost.date }}</span
              >
            </div>
          </template>

          <template #data-2>
            <div
              class="flex items-center"
              v-for="(post, idx) in secondAndThirdPosts"
              :key="idx"
            >
              <a
                class="flex items-center my-1"
                :href="post.url + 'edit'"
                target="_blank"
                ><img
                  class="rounded-full mr-2 profile__img"
                  :src="post.img"
                />{{ post.title }}</a
              >
              <span
                class="text-sm rounded-full p-1 ml-2 bg-green-500 whitespace-no-wrap"
                >{{ post.date }}</span
              >
            </div></template
          >
        </kb-gauge>
      </div>
      <kb-gauge>
        <template #title>Authors</template>
        <template #data-1>
          <div v-for="author in authorArr" :key="author.name">
            <div class="flex my-2 items-center">
              <img class="rounded-full mr-2 profile__img" :src="author.img" />
              <p class="flex items-center">
                <a :href="author.url" target="_blank">{{ author.name }}</a>
                <span class="text-sm rounded-full p-1 ml-2 bg-green-500"
                  >{{ author.count }} Posts</span
                >
              </p>
            </div>
          </div>
        </template>
      </kb-gauge>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Gauge from "./Gauge";
export default {
  components: {
    "kb-gauge": Gauge
  },
  computed: {
    ...mapState({
      total: state => state.posts.total,
      firstPost: state => state.posts.firstPost,
      secondAndThirdPosts: state => state.posts.secondAndThirdPosts,
      authorArr: state => state.posts.authorArr
    }),
    ...mapGetters("posts", {
      thisMonth: "thisMonth"
    })
  },
  created() {
    this.$store.dispatch("posts/getPosts");
  }
};
</script>

<style lang="scss" scoped>
.profile__img {
  height: 2rem;
  width: 2rem;
}
</style>
