"use strict";

const PORT          = 8080;
const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/tweeter';

const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();
const MongoClient = require('mongodb').MongoClient;
const DataHelpers = require("./lib/data-helpers.js");
const tweetsRoutes = require("./routes/tweets");
const tweetRoutes = require("./routes/tweet");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

MongoClient.connect(mongoURL, function(err, db) {
  console.log("Connected to mongodb server");

  const helpers = DataHelpers(db);
  app.use("/tweets", tweetsRoutes( helpers ) );
  app.use("/tweet", tweetRoutes( helpers ) );

  app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
  });
});
