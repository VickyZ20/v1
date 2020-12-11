const express = require("express");
const router = express.Router();
const db = require("../db/mongoConnection");

router.get("/loadFeed", (req, res) => {
  mongo.test.findAll().then((feeds) => {
    console.log("Feeds", feeds);
    res.json(feeds);
  });
});

router.get("/pageFeed/:pageNumber", (req, res) => {
  console.log(req.params);
  mongo.test.findAll(req.params.pageNumber, 9).then((data) => res.json(data));
});

router.get("/pagesFeed", (req, res) => {
  mongo.test.getPages().then((numPages) => res.json(numPages));
});

module.exports = router;
