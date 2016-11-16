"use strict";

const initialTweets = require("./tweets");

const db = { tweets: initialTweets };

const dbMethods = {

  saveTweet: (data) => {
    db.tweets.push(data);
    return true;
  },

  getTweets: () => {
    return db.tweets.sort(function(a, b) { return b.created_at - a.created_at });
  }

}

module.exports = {

  connect: (onConnect) => {

    onConnect(dbMethods);

  }

}
