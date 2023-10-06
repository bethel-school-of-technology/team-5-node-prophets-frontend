import RSSparser from "rss-parser";
import cors from "cors";
import express from "express";

const feedURLs = [
  "https://www.techrepublic.com/rssfeeds/articles/",
  "https://www.techrepublic.com/rssfeeds/topic/artificial-intelligence/",
  "https://www.techrepublic.com/rssfeeds/topic/smart-persons-guides/",
  "https://www.techrepublic.com/rssfeeds/topic/cloud-security/",
  "https://www.techrepublic.com/rssfeeds/topic/cybersecurity/",
  "https://www.techrepublic.com/rssfeeds/topic/developer/",
  "https://www.techrepublic.com/rssfeeds/topic/devops/",
  "https://www.techrepublic.com/rssfeeds/topic/education/",
  "https://www.techrepublic.com/rssfeeds/topic/google/",
  "https://www.techrepublic.com/rssfeeds/topic/tech-and-work/",
  "https://www.techrepublic.com/rssfeeds/topic/tech-industry/"
];

const parser = new RSSparser();
let articles = [];

const parse = async (urls) => {
  for (const url of urls) {
    const feed = await parser.parseURL(url);
    articles.push(...feed.items);
  }
};

(async () => {
  try {
    await parse(feedURLs);

    const app = express();
    app.use(cors());

    app.get("/", (req, res) => {
      res.send(articles);
    });

    const server = app.listen("4000", () => {
      console.log("App is listening at http://localhost:4000");
    });
  } catch (error) {
    console.error("Error parsing the RSS feed:", error);
  }
})();
