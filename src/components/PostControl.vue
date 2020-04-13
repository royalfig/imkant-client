<template>
  <div class="section">
    <div class="columns is-centered">
      <div class="column is-6">
        <h2 class="title is-3">Post Control</h2>
        <div class="buttons">
          <b-button class="is-info" icon-left="pencil" @click="getPosts">Get Posts</b-button>
          <b-button class="is-warning" icon-left="delete" @click="deleteDrafts">Delete Drafts</b-button>
          <b-button class="is-danger" icon-left="delete" @click="deletePosts">Delete Posts</b-button>
        </div>
      </div>
    </div>
    <div class="columns is-centered">
      <div class="column is-6">
        <b-notification
          class="is-info"
          :active.sync="isActive2"
          aria-close-label="Close notification"
        >
          <div class="content">
            <ol>
              <li v-for="(post, idx) in getPostsRes" :key="idx + 'b'">{{ post }}</li>
            </ol>
          </div>
        </b-notification>
        <b-notification
          class="is-warning"
          :active.sync="isActive3"
          aria-close-label="Close notification"
        >
          <div class="content">
            <ol>
              <li v-for="(post, idx) in deleteDraftsRes" :key="idx + 'b'">{{ post }}</li>
            </ol>
          </div>
        </b-notification>
        <b-notification
          class="is-danger"
          :active.sync="isActive1"
          aria-close-label="Close notification"
        >
          <div class="content">
            <ol>
              <li v-for="(post, idx) in deletePostsRes" :key="idx + 'b'">{{ post }}</li>
            </ol>
          </div>
        </b-notification>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      deletePostsRes: [""],
      getPostsRes: [""],
      deleteDraftsRes: [""],
      isActive1: false,
      isActive2: false,
      isActive3: false
    };
  },
  methods: {
    deletePosts() {
      axios
        .post("http://localhost:3000/delete/published")
        .then(res => {
          const msg = res.data;
          this.deletePostsRes = msg;
        })
        .then(() => (this.isActive1 = true))
        .catch(err => err);
    },
    getPosts() {
      axios
        .get("http://localhost:3000/posts")
        .then(res => {
          this.getPostsRes = res.data;
        })
        .then(() => (this.isActive2 = true))
        .catch(err => err);
    },
    deleteDrafts() {
      axios
        .post("http://localhost:3000/delete/drafts")
        .then(res => {
          this.deleteDraftsRes = res.data;
        })
        .then(() => (this.isActive3 = true))
        .catch(err => err);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
