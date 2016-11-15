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
    .append($("<span>").addClass("tweet-time").text("10 days agao"))
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