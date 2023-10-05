import RSSparser from "rss-parser";
import cors from "cors";
import express from "express";

const feedURL =
  "https://www.techrepublic.com/rssfeeds/topic/smart-persons-guides/";

const parser = new RSSparser();
let articles = [];

const parse = async (url) => {
  const feed = await parser.parseURL(url);
  feed.items.forEach((item) => {
    articles.push({ item });
  });
};
parse(feedURL);

let app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send(articles);
});

const server = app.listen("4000", () => {
  console.log("App is listening at http://localhost:4000");
});
