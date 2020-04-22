import posts from "../../api/getData";
import { formatDate, filterMatchesByMonth } from "../../utils/date";
import paginate from "../../utils/util";

const state = {
  posts: [],
  total: 0,
  firstPost: {},
  secondAndThirdPosts: [],
  authorArr: [],
  sources: [],
  sourceNum: 0
};

const getters = {
  thisMonth: state => {
    return filterMatchesByMonth(state.posts, "current").length;
  },
  lastMonth: state => {
    return filterMatchesByMonth(state.posts, "last").length;
  },
  pages: state => {
    return paginate(state.posts);
  }
};

const actions = {
  async getPosts({ commit }) {
    const data = await posts.getAllPosts();
    commit("setData", data);
    commit("setAuthor", data);
    commit("setFirstPosts", data);
  },
  async getSources({ commit }) {
    const data = await posts.getSources();
    commit("setSources", data);
    commit("setSourceNum", data);
  }
};

const mutations = {
  setData(state, data) {
    state.posts = data.posts;
    state.total = data.meta.pagination.total;
  },

  setAuthor(state, data) {
    const authors = data.posts.map(post => {
      const name = post.primary_author.name;
      const url = post.primary_author.url;
      const img = post.primary_author.profile_image;
      return { name, url, img };
    });

    const namesToCount = authors.map(item => item.name);

    const countedNames = namesToCount.reduce((names, name) => {
      if (name in names) {
        names[name]++;
      } else {
        names[name] = 1;
      }
      return names;
    }, {});

    const keys = Object.keys(countedNames);

    const builtArr = keys.map(item => {
      const obj = { name: item, count: 0, url: "", img: "" };
      obj.count =
        countedNames[item] < 10 ? "0" + countedNames[item] : countedNames[item];
      return obj;
    });

    builtArr.forEach(item => {
      const match = authors.find(element => element.name === item.name);
      item.url = match.url;
      item.img = match.img;
    });

    state.authorArr = builtArr;
  },

  setFirstPosts(state, data) {
    const firstPosts = [];
    for (let i = 0; i < 3; i++) {
      const title = data.posts[i].title;
      const url = data.posts[i].url;
      const date = formatDate(data.posts[i].published_at);
      const img = data.posts[i].feature_image;
      const obj = { title, url, date, img };
      firstPosts.push(obj);
    }
    state.firstPost = firstPosts.shift();
    state.secondAndThirdPosts = firstPosts;
  },

  setSources(state, data) {
    state.sources = data;
  },

  setSourceNum(state, data) {
    state.sourceNum = data.length;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
