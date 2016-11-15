/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

var tweetData = {
  "user": {
    "name": "Newton",
    "avatars": {
      "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
};

function iconSpan(iconClass) {
  return $("<span>").addClass("fa " + iconClass).attr("aria-hidden", "true");
}

function plural(n, s) {
  return n.toString() + " " + s + (n > 1 ? "s" : "");
}

function timeSince(timeInMilliSeconds) {
  var msMinute = 60 * 1000;
  var msHours = 60 * 60 * 1000;
  var msDay = 60 * 60 * 24 * 1000;
  var now = new Date();
  var then = new Date(timeInMilliSeconds);
  var differenceInMilliSeconds = now - then;
  var days = Math.floor(differenceInMilliSeconds / msDay);
  if(days) {
    return plural(days, "day");
  }
  var hours = Math.floor( (differenceInMilliSeconds % msDay) / msHours );
  if(hours) {
    return plural(hours, "hour");
  }
  var minutes = Math.floor( (differenceInMilliSeconds % msHours) / msMinutes);
  return plural(minutes, "minute");
}

function createTweetElement(tweetData) {
  var $tweet = $("<article>").addClass("tweet");
  var header = $("<header>")
    .append($("<span>").addClass("avatar").css('background-image', 'url(' + tweetData.user.avatars.small + ')'))
    .append($("<span>").addClass("user-name").text(tweetData.user.name))
    .append($("<span>").addClass("twitter-handle").text(tweetData.user.handle));
  $tweet.append(header);
  $tweet.append($("<p>").addClass("tweet-text").text(tweetData.content.text));
  var actions = $("<span>").addClass("actions")
    .append(iconSpan("fa-flag"))
    .append(iconSpan("fa-retweet"))
    .append(iconSpan("fa-heart"));
  var footer = $("<footer>")
    .append($("<span>").addClass("tweet-time").text(timeSince(tweetData.created_at) + " ago"))
    .append(actions);
  $tweet.append(footer);
  return $tweet;
}

$(document).ready(function(){
  var $tweet = createTweetElement(tweetData);

  // Test / driver code (temporary)
  console.log($tweet);
  $('#tweets-container').append($tweet);
});