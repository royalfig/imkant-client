// const axios = require("axios").default;
// let parser = require("rss-parser");
// let parser = new Parser({
//   headers: {
//     Accept: "application/xml, application/rss+xml, text/xml"
//   }
// });
const scrape = require("html-metadata");
const request = require("request");

const getUrl = async url => {
  const options = {
    url: url,
    jar: request.jar() // Cookie jar
  };

  try {
    const metadata = await scrape(options);
    return metadata;
  } catch (e) {
    console.log(e);
  }
};

export { getUrl };
