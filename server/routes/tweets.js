"use strict";

const userHelper = require("../lib/util/user-helper");
const auth = require('../lib/util/auth-helpers.js');

const express = require('express');
const tweetsRoutes = express.Router();

/**
 * @param  {String} string for the action.
 * @return {Object} action to perform.
 */
function parseAction(action) {
  const result = {err: null};
  switch (action) {
  case "like":
    result.update = {$set: {liked: true}};
    break;
  case "unlike":
    result.update = {$set: {liked: false}};
    break;
  default:
    result.err = 404;
  }
  return result;
}

module.exports = function(DataHelpers) {

  tweetsRoutes.get("/", function(req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  });

  tweetsRoutes.post("/", function(req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now()
    };

    DataHelpers.saveTweet(tweet, (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json(tweet);
      }
    });
  });

  /**
   * Route for performing actions on individual tweets by id.  Currently, supports the
   * ability to like or unlike a tweet.
  */
  tweetsRoutes.put("/:id/:action", auth.ifValidId, (req, res) => {
    let action = parseAction(req.params.action);
    if(action.err) {
      res.status(action.err).send();
    } else {
      DataHelpers.updateTweetForId(req.params.objectId, action.update).then(result => {
        res.status(201).send();
      }).catch(err => {
        res.status(500).send();
      });
    }
  });


  return tweetsRoutes;

};
