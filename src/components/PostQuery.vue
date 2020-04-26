<template>
  <section class="hero flex justify-center items-center pb-20">
    <div class="container flex justify-center flex-col px-20 m-8">
      <h2 class="font-bold text-2xl text-white">Post Query</h2>
      <div class="flex my-2">
        <kb-gauge class="h-auto overflow-hidden">
          <template #title>Scrape a Site</template>
          <template #data-1>
            <span class="h-8">{{ extract(link) }}</span>
          </template>
          <template #data-2>
            <div class="divide-y-2 divide-blue-lightest">
              <div class="py-2">
                <div class="items-center flex">
                  <input
                    id="link"
                    v-model="link"
                    class="py-1 px-2 flex-auto border-2 border-blue-lightest bg-blue-dark rounded-4"
                  />
                  <kb-button :onClick="scrape">Scrape</kb-button>
                  <kb-button :onClick="clear">Clear</kb-button>
                </div>
                <label for="link" class="text-sm">Enter a URL</label>
              </div>
              <div v-if="dataPresent" class="flex flex-col p-2 mt-4 ">
                <div
                  class="flex flex-col p-4 border rounded-sm border-transparent bg-gray-700 my-2 "
                >
                  <div class="media">
                    <div class="media__left">
                      <a :href="post.url">
                        <figure class="media__img-container">
                          <img
                            class="media__img"
                            :src="post.img"
                            :alt="post.title"
                          />
                        </figure>
                      </a>
                    </div>
                    <div class="media__right">
                      <div class="media__content">
                        <p>
                          {{ post.author }} published
                          <a :href="post.url">&ldquo;{{ post.title }}&rdquo;</a>
                          on {{ post.date }} in
                          <em>{{ post.journalTitle }}</em> {{ post.volume }}.{{
                            post.issue
                          }}: {{ post.firstpage }}-{{ post.lastpage }}.
                          <a :href="post.url">{{ post.doi }}</a
                          >.
                        </p>
                        <div v-if="post.keywords" class="flex">
                          <kb-pill
                            class="mr-2"
                            v-for="keyword in post.keywords"
                            :key="keyword"
                            >{{ keyword }}</kb-pill
                          >
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- <label
                      for="idx"
                      class="text-xs uppercase text-blue-lightest"
                      >{{ idx }}</label
                    >
                    <input
                      :value="item"
                      :id="idx"
                      class="bg-transparent ml-2 w-full"
                    /> -->
                </div>
                <div
                  v-if="notFound"
                  class="border-4 border-yellow flex bg-yellow-lightest rounded-sm p-2 mt-12 text-black relative "
                >
                  <p
                    class="uppercase font-bold absolute label leading-tight px-1 rounded-sm border border-yellow bg-yellow-dark"
                  >
                    Not Found
                  </p>
                  <p class="mr-2" v-for="(item, idx) in notFound" :key="idx">
                    {{ item }}
                  </p>
                </div>
              </div>
            </div>
          </template>
        </kb-gauge>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import Gauge from "./Gauge";
import Button from "./Button";
import Pill from "./Pill";
export default {
  components: {
    "kb-gauge": Gauge,
    "kb-button": Button,
    "kb-pill": Pill
  },
  data() {
    return {
      link: "",
      dataPresent: false,
      post: {
        abstract: "",
        author: "",
        date: "",
        description: "",
        doi: "",
        firstpage: "",
        img: "",
        issue: "",
        journalTitle: "",
        keywords: "",
        lastpage: "",
        title: "",
        url: "",
        volume: ""
      },
      notFound: [""]
    };
  },
  methods: {
    async scrape() {
      let validatedUrl = this.link;
      if (!/https?:\/\/(www.)?/.test(this.link)) {
        validatedUrl = "https://" + this.link;
      }
      axios
        .get(`http://localhost:3000/scrape/${encodeURIComponent(validatedUrl)}`)
        .then(res => {
          console.log(res.data);
          this.dataPresent = true;
          const notFound = [];
          const metadataValidator = (prop, p1, p2, p3, p4, cb) => {
            const value = prop.map(item => {
              let definedValue = "";
              if (res.data[p1] && res.data[p1][item]) {
                item = res.data[p1][item];
                if (cb) {
                  item = cb(item);
                  definedValue = item;
                  return definedValue;
                }

                definedValue = item;
                return definedValue;
              }
              if (res.data[p2] && res.data[p2][item]) {
                item = res.data[p2][item];
                if (cb) {
                  item = cb(item);
                  definedValue = item;
                  return definedValue;
                }

                definedValue = item;
                return definedValue;
              }
              if (res.data[p3] && res.data[p3][item]) {
                item = res.data[p3][item];

                if (cb) {
                  item = cb(item);
                  definedValue = item;
                  return definedValue;
                }

                definedValue = item;
                return definedValue;
              }
              if (res.data[p4] && res.data[p4][item]) {
                item = res.data[p4][item];
                if (cb) {
                  item = cb(item);
                  definedValue = item;
                  return definedValue;
                }

                definedValue = item;
                return definedValue;
              }

              notFound.push(item);
            });
            const undefinedRemoved = value.filter(
              arrItem => arrItem !== undefined
            );
            console.log(undefinedRemoved[0]);
            return undefinedRemoved[0];
          };

          this.post.abstract = metadataValidator(
            ["abstract"],
            "highwirePress",
            "dublinCore",
            "openGraph",
            "general"
          );
          this.post.author = metadataValidator(
            ["author", "creator"],
            "highwirePress",
            "dublinCore",
            "openGraph",
            "general"
          );
          this.post.date = metadataValidator(
            ["publication_date", "date"],
            "highwirePress",
            "dublinCore",
            "openGraph",
            "general"
          );
          this.post.doi = metadataValidator(
            ["doi"],
            "highwirePress",
            "dublinCore",
            "openGraph",
            "general"
          );
          this.post.firstpage = metadataValidator(
            ["firstpage"],
            "highwirePress",
            "dublinCore",
            "openGraph",
            "general"
          );
          this.post.issue = metadataValidator(
            ["issue"],
            "highwirePress",
            "dublinCore",
            "openGraph",
            "general"
          );
          this.post.journalTitle = metadataValidator(
            ["journal_title", "source"],
            "highwirePress",
            "dublinCore",
            "openGraph",
            "general"
          );
          this.post.keywords = metadataValidator(
            ["subject", "keywords"],
            "highwirePress",
            "dublinCore",
            "openGraph",
            "general"
          );
          this.post.lastpage = metadataValidator(
            ["lastpage"],
            "highwirePress",
            "dublinCore",
            "openGraph",
            "general"
          );
          this.post.url = metadataValidator(
            ["canonical", "url", "source"],
            "general",
            "openGraph",
            "dublinCore",
            "highwirePress"
          );
          this.post.volume = metadataValidator(
            ["volume"],
            "highwirePress",
            "dublinCore",
            "openGraph",
            "general"
          );

          this.post.title = metadataValidator(
            ["title"],
            "highwirePress",
            "dublinCore",
            "openGraph",
            "general"
          );
          this.post.description = metadataValidator(
            ["description"],
            "highwirePress",
            "openGraph",
            "general",
            "dublinCore"
          );
          this.post.img =
            res.data.openGraph && res.data.openGraph.image
              ? res.data.openGraph.image.url
              : "https://generative-placeholders.glitch.me/image?width=300&height=300&style=tiles&colors=87";
          this.notFound = notFound;
        });
    },
    extract: function(input) {
      if (!input || /\s+/.test(input)) {
        return "You gotta give me something to work with, Butthole 😛";
      }
      let extractedText;
      if (input) {
        if (/http/.test(input)) {
          extractedText = input.match(/\/(www.)?(\w+)/, "$1");
          extractedText = extractedText[2];
        } else {
          extractedText = input.match(/(\w+)/, "$1")[1];
        }
      }
      if (extractedText) {
        return (
          "So you wanna peep on " +
          extractedText.charAt(0).toUpperCase() +
          extractedText.slice(1) +
          ", you Creeper? 😲"
        );
      }
      return "";
    },
    clear() {
      this.link = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.label {
  top: -1rem;
  left: 1rem;
}

.media {
  display: flex;
}
.media__left {
  margin-right: 0.5rem;
  min-width: 100px;
}
.media__right {
  display: flex;
  padding: 0.25rem 0;
  flex-direction: column;
  justify-content: center;
  border-top: 1px solid white;
  border-bottom: 1px solid white;
}
.media__img-container {
  width: 100%;
  height: 100%;
}
.media__img {
  height: 100%;
  width: 100%;
}
</style>
