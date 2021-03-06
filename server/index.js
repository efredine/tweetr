"use strict";
require('dotenv').config({silent: true});

const PORT          = process.env.PORT || 8080;
const mongoURL = process.env.MONGODB_URI;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();
const MongoClient = require('mongodb').MongoClient;
const DataHelpers = require("./lib/data-helpers.js");
const tweetsRoutes = require("./routes/tweets");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

MongoClient.connect(mongoURL, function(err, db) {
  console.log("Connected to mongodb server");

  const helpers = DataHelpers(db);
  app.use("/tweets", tweetsRoutes( helpers ) );

  app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
  });
});
