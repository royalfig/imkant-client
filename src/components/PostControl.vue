<template>
  <section class="flex justify-center items-center">
    <div class="flex justify-center flex-col px-20 m-8 w-full">
      <h2 class="font-bold text-2xl text-white">Post Control</h2>
      <div class="flex my-2 w-full">
        <kb-gauge class="height w-full overflow-y-auto">
          <template #title>
            <p>Controls</p>
            <div class="flex mt-6 justify-between">
              <button class="mr-2 hover:text-yellow" @click="prev">
                &larr; Previous
              </button>
              <div class="flex">
                <button
                  v-for="(pageNo, idx) in pages.length"
                  :key="idx"
                  class="mr-2 px-1 hover:text-yellow"
                  @click="page = idx"
                  :class="{ active: idx === page }"
                >
                  {{ idx + 1 }}
                </button>
              </div>
              <button class="ml-2 hover:text-yellow" @click="next">
                Next &rarr;
              </button>
            </div>
          </template>
          <template #data-1>📑These Are the Posts</template>
          <template #data-2>
            <div
              v-for="(post, idx) in currentPage"
              :key="post.title"
              class="mb-4"
            >
              <a
                :href="post.url + 'edit'"
                target="_blank"
                class="flex items-center hover:text-yellow transition-colors ease-in-out duration-300"
              >
                <p>{{ idx + 10 * page + 1 }}. {{ post.title }}</p>
                <div class="flex space-x-2">
                  <kb-pill class="ml-2">{{ post.primary_tag.name }}</kb-pill>
                  <kb-pill class="ml-2">{{
                    makeDateReadable(post.published_at)
                  }}</kb-pill>
                  <kb-pill class="ml-2">{{ post.primary_author.name }}</kb-pill>
                </div>
              </a>
            </div>
          </template>
        </kb-gauge>
      </div>
    </div>
  </section>
</template>

<script>
import Gauge from "./Gauge";
import Pill from "./Pill";
import { formatDate } from "../utils/date";
import { mapState, mapGetters } from "vuex";
export default {
  components: {
    "kb-gauge": Gauge,
    "kb-pill": Pill
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
  },
  methods: {
    next() {
      if (this.page === this.pages.length - 1) {
        this.page = 0;
        return;
      }

      this.page++;
      return;
    },
    prev() {
      if (this.page === 0) {
        this.page = this.pages.length - 1;
        return;
      }
      this.page--;
      return;
    },
    makeDateReadable(input) {
      const date = formatDate(input);
      return date;
    }
  }
};
</script>

<style lang="scss" scoped>
.active {
  color: #f9f871;
}

.height {
  height: 40rem;
}
</style>
