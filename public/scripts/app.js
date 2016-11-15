/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

var data = [
  {
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
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "<script>alert('uh oh!');</script>"
    },
    "created_at": 1461113796368
  }
];

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

/**
 * @param  {Object} tweetData
 * @return {Object} HTML formatted data:
    <section id="tweets-container">
      <article class="tweet">
        <header>
          <span class="avatar"></span>
          <span class="user-name">User Name</span>
          <span class="twitter-handle">@handle</span>
        </header>
        <p class="tweet-text">The tweet content</p>
        <footer>
          <span class="tweet-time">10 days ago</span>
          <span class="actions">
            <span class="fa fa-flag" aria-hidden="true"></span>
            <span class="fa fa-retweet" aria-hidden="true"></span>
            <span class="fa fa-heart" aria-hidden="true"></span>
          </span>
        </footer>
      </article>
    </section>
 */
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

function renderTweets(data) {
  var tweetsContainer = $('#tweets-container');
  for(var i = 0; i < data.length; i++) {
    tweetsContainer.append(createTweetElement(data[i]));
  }
}

function processForm(event) {
  event.preventDefault();
  $.ajax({
    method: "POST",
    url: "/tweets",
    data: $( this ).serialize()
  })
  .done(function() {
    $(".new-tweet").find("textArea").val("");
  });
}

$(document).ready(function(){
  renderTweets(data);
  $( "form" ).on( "submit", processForm);
});