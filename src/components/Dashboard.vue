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
          <template #data-2>
            <p class="uppercase text-sm">+{{ thisMonth }} posts this month</p>
            <p class="uppercase text-sm">+{{ lastMonth }} posts last month</p>
          </template>
        </kb-gauge>
        <kb-gauge>
          <template #title>Latest Posts</template>

          <template #data-1>
            <a
              :href="firstPost.url + 'edit'"
              target="_blank"
              class="flex items-center"
            >
              <img
                :src="firstPost.img"
                alt=""
                class="profile__img rounded-full mr-2"
              />
              <p class="leading-none">{{ firstPost.title }}</p>
              <span
                class="text-sm rounded-full font-normal p-1 ml-2 bg-green-500 whitespace-no-wrap "
              >
                {{ firstPost.date }}
              </span>
            </a>
          </template>

          <template #data-2>
            <a
              v-for="(post, idx) in secondAndThirdPosts"
              :key="idx"
              :href="post.url + 'edit'"
              target="_blank"
              class="flex items-center rounded-full mb-3"
            >
              <img
                :src="post.img"
                alt=""
                class="profile__img rounded-full mr-2"
              />
              <p>{{ post.title }}</p>
              <span
                class="text-xs rounded-full p-1 ml-2 bg-green-500 whitespace-no-wrap "
              >
                {{ post.date }}
              </span>
            </a></template
          >
        </kb-gauge>
      </div>
      <div class="flex mb-4">
        <kb-gauge>
          <template #title>Authors</template>
          <template #data-1>
            <div
              v-for="author in authorArr"
              :key="author.name"
              class="flex my-2 items-center"
            >
              <img class="rounded-full mr-2 profile__img" :src="author.img" />
              <p class="flex items-center">
                <a :href="author.url" target="_blank">{{ author.name }}</a>
                <span class="text-sm rounded-full p-1 ml-2 bg-green-500"
                  >{{ author.count }} Posts</span
                >
              </p>
            </div>
          </template>
        </kb-gauge>
        <kb-gauge>
          <template #title>Total Sources</template>
          <template #data-1
            ><span style="font-size: 1.5em">{{ sourceNum }}</span></template
          >
        </kb-gauge>
      </div>
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
      authorArr: state => state.posts.authorArr,
      sources: state => state.posts.sources,
      sourceNum: state => state.posts.sourceNum
    }),
    ...mapGetters("posts", {
      thisMonth: "thisMonth",
      lastMonth: "lastMonth"
    })
  },
  created() {
    this.$store.dispatch("posts/getPosts");
    this.$store.dispatch("posts/getSources");
  }
};
</script>

<style lang="scss" scoped>
.profile__img {
  height: 1em;
  width: 1em;
}
</style>
