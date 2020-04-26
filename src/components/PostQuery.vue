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
                </div>
                <label for="link" class="text-sm">Enter a URL</label>
              </div>
              <div class="flex flex-col py-2">
                <div v-if="post.img" class="mr-2 w-20 h-20 flex-shrink-0">
                  <img :src="post.img" class="object-cover h-full w-full" />
                </div>
                <div v-if="dataPresent" class="flex flex-col">
                  <div
                    v-for="(item, idx) in post"
                    :key="idx"
                    class="flex items-center my-1"
                  >
                    <label
                      for="idx"
                      class="text-xs uppercase text-blue-lightest"
                      >{{ idx }}</label
                    >
                    <input
                      :value="item"
                      :id="idx"
                      class="bg-transparent ml-2 w-full"
                    />
                  </div>
                  <div
                    v-if="notFound"
                    class="border-4 border-yellow flex bg-yellow-lightest rounded-sm p-2 mt-6 text-black relative "
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
export default {
  components: {
    "kb-gauge": Gauge,
    "kb-button": Button
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
            console.log(value);
            const undefinedRemoved = value.filter(
              arrItem => arrItem !== undefined
            );
            return undefinedRemoved.join();
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
          this.post.keywords = metadataValidator(
            ["subject"],
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
      if (!input) {
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
    }
  }
};
</script>

<style lang="scss" scoped>
.label {
  top: -1rem;
  left: 1rem;
}
</style>
