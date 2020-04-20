const axios = require("axios").default;

export default {
  async getAllPosts() {
    const { data } = await axios
      .get("http://localhost:3000/all-posts/")
      .catch(err => console.log(err));
    return data;
  },

  getTags() {},

  getAuthors() {},

  getSources() {}
};
