"use strict";

const PORT          = 8080;
const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/tweeter';

const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();
const MongoClient = require('mongodb').MongoClient;
const DataHelpers = require("./lib/data-helpers.js");
const tweetsRoutes = require("./routes/tweets");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// The in-memory database of tweets. It's a basic object with an array in it.
MongoClient.connect(mongoURL, function(err, db) {
  console.log("Connected to mongodb server");


  // Mount the tweets routes at the "/tweets" path prefix:
  app.use("/tweets", tweetsRoutes( DataHelpers(db) ) );

  app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
  });
});
