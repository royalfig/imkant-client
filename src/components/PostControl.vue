<template>
  <section class="hero flex justify-center items-center">
    <div class="container flex justify-center flex-col px-20 m-8">
      <h2 class="text-xl font-bold mb-2 text-gray-700">Post Control</h2>
      <div class="flex">
        <button
          class="border border-blue-300 bg-blue-100 rounded-full py-2 px-4 mr-2 hover:border-blue-700"
          icon-left="pencil"
          @click="getPosts"
        >
          Get Posts
        </button>
      </div>
      <div v-if="isActive1" class="mt-4 bg-gray-100 p-6 rounded-lg">
        <ul class="list-inside list-decimal">
          <li v-for="(post, idx) in getPostsRes" :key="idx" class="my-2">
            <a
              class="hover:bg-gray-200 p-1 rounded-sm"
              :href="post.url + 'edit'"
              target="_blank"
              >{{ post.title }}
              <span class="rounded-lg bg-green-200 text-xs p-1 ml-1">{{
                getPostTag(post)
              }}</span></a
            >
          </li>
        </ul>
        <div class="flex items-center justify-between">
          <p v-if="getPostsMeta.pagination.page" class="mt-4">
            Page {{ getPostsMeta.pagination.page }} of
            {{ getPostsMeta.pagination.pages }}
          </p>
          <div class="flex">
            <button
              v-for="button in getPostsMeta.pagination.pages"
              :key="button"
              class="p-2 mr-1 hover:bg-gray-300"
              :class="{
                'bg-gray-300 rounded-sm': currentPage(
                  button,
                  getPostsMeta.pagination.page
                )
              }"
              @click="getPage(button)"
            >
              {{ button }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      deletePostsRes: [],
      getPostsRes: [],
      getPostsMeta: { pagination: { page: "", pages: "" } },
      deleteDraftsRes: [],
      isActive1: false,
      isActive2: false,
      isActive3: false
    };
  },

  methods: {
    getPosts() {
      axios
        .get("http://localhost:3000/posts")
        .then(res => {
          this.getPostsRes = res.data.data;
          this.getPostsMeta = res.data.meta;
        })
        .then(() => (this.isActive1 = true))
        .catch(err => err);
    },
    getPostTag(input) {
      const tag = input.primary_tag ? input.primary_tag.name : "No tags!";
      return tag;
    },
    currentPage(button, page) {
      if (button === page) {
        return true;
      }
      return false;
    },
    getPage(button) {
      console.log(`http://localhost:3000/page/${button}`);
      axios.get(`http://localhost:3000/page/${button}`).then(res => {
        console.log(res.data.meta);
        this.getPostsRes = res.data.data;
        this.getPostsMeta = res.data.meta;
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// .active {
//   background: yellow;
// }
</style>
