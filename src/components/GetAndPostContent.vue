<template>
  <section class="hero flex justify-center items-center">
    <div class="container flex justify-center flex-col px-20 m-8">
      <h2 class="text-xl font-bold mb-2 text-gray-700">
        Journals
        <span class="bg-green-300 rounded-lg text-xs p-1"
          >{{ totalPosts }} Posts</span
        >
      </h2>
      <div class="flex flex-wrap">
        <div
          v-for="item in sources"
          :key="item"
          class="border rounded-lg border-gray-300 mr-2 mt-2 flex hover:border-gray-500"
        >
          <button class="rounded-l-lg p-2" @click="getAndPostContent(item)">
            {{ item }}
          </button>
          <span class="rounded-r-lg bg-gray-300 p-2">
            {{ postCount[item] }}
          </span>
        </div>
      </div>
      <p>{{ response }}</p>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      sources: [
        "British Journal for the History of Philosophy",
        "British Journal for the Philosophy of Science",
        "Canadian Journal of Philosophy",
        "Ergo",
        "Ethics",
        "European Journal of Philosophy",
        "Graduate Faculty Philosophy Journal",
        "Idealistic Studies",
        "Inquiry",
        "Kant-Studien",
        "Kant Yearbook",
        "Kantian Review",
        "Noûs",
        "Philosophical Topics",
        "Philosophy and Phenomenological Research",
        "Studies in History and Philosophy of Science Part A",
        "The Monist",
        "The Philosophical Inquiry"
      ],
      response: "",
      totalPosts: "",
      postCount: {}
    };
  },
  mounted() {
    axios.get("http://localhost:3000/all-posts/").then(({ data }) => {
      const totalPosts = data.meta.pagination.total;

      /* Tag Logic
      Populate array with tag names 
      */
      const tagArr = [];
      data.data.forEach(post => {
        post.tags.forEach(tag => {
          if (this.sources.includes(tag.name)) {
            tagArr.push(tag.name);
          }
        });
      });

      // Get list of all tags minus tag array
      const tagsWithoutCount = this.sources.filter(
        item => !tagArr.includes(item)
      );

      // Count tags
      const countedArr = tagArr.reduce(function(allTags, tag) {
        if (tag in allTags) {
          allTags[tag]++;
        } else {
          allTags[tag] = 1;
        }
        return allTags;
      }, {});

      // Enter zero values for all other tags
      tagsWithoutCount.forEach(tag => {
        countedArr[tag] = 0;
      });
      this.postCount = countedArr;

      this.totalPosts = totalPosts;
    });
  },
  methods: {
    getAndPostContent(input) {
      const slugified = this.slugify(input);
      axios.get("http://localhost:3000/bot/" + slugified).then(res => {
        this.response = res.data;
      });
    },
    slugify(input) {
      return input.toLowerCase().replace(/ /g, "_");
    }
  }
};
</script>

<style lang="scss" scoped></style>
