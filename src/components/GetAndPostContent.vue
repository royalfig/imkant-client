<template>
  <section class="section">
    <div class="columns is-centered">
      <div class="column is-6">
        <h2 class="title is-3">Run the Kant Bot</h2>
        <div class="buttons">
          <b-button
            v-for="item in sources"
            :key="item"
            icon-left="file-outline"
            @click="getAndPostContent(item)"
          >{{ item }}</b-button>
        </div>
      </div>
    </div>
    <p>{{ response }}</p>
  </section>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      sources: [
        "Kant Studien",
        "Kantian Review",
        "European Journal of Philosophy",
        "Canadian Journal of Philosophy",
        "British Journal for the History of Philosophy"
      ],
      response: ""
    };
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

<style lang="scss" scoped>
</style>