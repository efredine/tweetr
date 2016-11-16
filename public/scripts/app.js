/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(function() {

  var tweetsContainer = $('#tweets-container');
  var newTweet = $(".new-tweet");
  var composeDisplayed = false;

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
    if (differenceInMilliSeconds < 0) {
      return "Just now";
    }
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

  function renderTweet(tweetData) {
    tweetsContainer.prepend(createTweetElement(tweetData));
  }

  function renderTweets(data) {
    tweetsContainer.empty();
    data.forEach(function(tweet) {
      renderTweet(tweet);
    });
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
    newTweet.find(".error").remove();
    newTweet.prepend($("<p>").addClass("error").text(errorMessage));
  }

  /**
   * Compose form.
   */
  $( "form" )
  .on( "submit", function(event) {
    var form = $( this );
    var textArea = form.find("textArea");
    var formLength = textArea.val().length;

    event.preventDefault();

    if( formLength === 0) {
      addError("You haven't entered anything to post!");
      return;
    }

    if( formLength > 140 ) {
      addError("Tweets can only be 140 characters long.");
      return;
    }

    // length is ok, so post it
    $.ajax({
      method: form.attr("method"),
      url: form.attr("action"),
      data: form.serialize()
    })
    .done(function(tweetData) {
      // update display pessimistically
      newTweet.find("textArea").val("");
      renderTweet(tweetData);
    });
  }).on("input", function(){
    // remove error messages on user input
    newTweet.find(".error").remove();
  });

  /**
   * Nav-bar button for toggling the state of the compose form.
   */
  $( "#nav-bar" ).find(".compose a").on("click", function(event){
    event.preventDefault();
    var closest = $(this).closest(".compose");
    if(composeDisplayed) {
      closest.removeClass("selected");
    } else {
      closest.addClass("selected");
    }
    composeDisplayed = !composeDisplayed;
    newTweet.slideToggle(function(){
      // When the toggle is finished, set the focus on the text area.
      $(this).find("textArea").focus();
    });
  });

  // initial call to load the data
  loadData();
});