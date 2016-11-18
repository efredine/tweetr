"use strict";

const express = require('express');
const tweetRoutes = express.Router();
const auth = require('../lib/util/auth-helpers.js');


function parseAction(action) {
  console.log(action);
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

  tweetRoutes.get("/", (req, res) => {
    res.send("hello there.");
  });

  tweetRoutes.put("/:id/:action", auth.ifValidId, (req, res) => {
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

  return tweetRoutes;

};