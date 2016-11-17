"use strict";

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {

  const tweets = db.collection('tweets');

  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      tweets.insertOne(newTweet, (err, result) => {
        if(!err && result.insertedCount === 1) {
          callback(err, result.ops[0]);
        } else {
          callback(err, null);
        }
      });
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      tweets.find().sort({created_at: 1}).toArray(callback);
    }

  };
};
