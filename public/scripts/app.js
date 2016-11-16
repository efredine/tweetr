/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(function() {
  function iconSpan(iconClass) {
    return $("<span>").addClass("fa " + iconClass).attr("aria-hidden", "true");
  }

  function plural(n, s) {
    return n.toString() + " " + s + (n > 1 ? "s" : "") + " ago";
  }

  var msMinute = 60 * 1000;
  var msHours = 60 * 60 * 1000;
  var msDay = 60 * 60 * 24 * 1000;

  function timeSince(timeInMilliSeconds) {
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
    var minutes = Math.floor( (differenceInMilliSeconds % msHours) / msMinute);
    if(minutes) {
      return plural(minutes, "minute");
    } else {
      return "Just now";
    }
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
      .append($("<span>").addClass("tweet-time").text(timeSince(tweetData.created_at)))
      .append(actions);
    $tweet.append(footer);
    return $tweet;
  }

  function renderTweets(data) {
    var tweetsContainer = $('#tweets-container');
    tweetsContainer.empty();
    for(var i = 0; i < data.length; i++) {
      tweetsContainer.append(createTweetElement(data[i]));
    }
  }

  function loadData() {
    $.ajax({
      method: "GET",
      url: "/tweets"
    })
    .done(function(tweetData) {
      renderTweets(tweetData);
    });
  }

  function addError(errorMessage) {
    var newTweet = $(".new-tweet");
    newTweet.find(".error").remove();
    newTweet.prepend($("<p>").addClass("error").text(errorMessage));
  }

  $( "form" ).on( "submit", function(event) {
    var formLength = $(".new-tweet").find("textArea").val().length;

    event.preventDefault();

    if( formLength === 0) {
      addError("You haven't entered anything to post!");
      return;
    }

    if( formLength > 140 ) {
      addError("Tweets can only be 140 characters long.");
      return;
    }

    $.ajax({
      method: "POST",
      url: "/tweets",
      data: $( this ).serialize()
    })
    .done(function() {
      $(".new-tweet").find("textArea").val("");
      loadData();
    });
  });

  loadData();
});