/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(function() {

  var tweetsContainer = $('#tweets-container');
  var newTweet = $(".new-tweet");
  var tweetTemplate = Handlebars.compile($("#tweet-template").html());

  // time conversion constants
  var msMinute = 60 * 1000;
  var msHours = 60 * 60 * 1000;
  var msDay = 60 * 60 * 24 * 1000;

  // helper function for timeSince
  function formatDate(n, s) {
    return n.toString() + " " + s + (n > 1 ? "s" : "") + " ago";
  }

  // return a time since string for the givne time in milliseconds
  function timeSince(timeInMilliSeconds) {
    var now = new Date();
    var then = new Date(timeInMilliSeconds);
    var differenceInMilliSeconds = now - then;
    if (differenceInMilliSeconds < 0) {
      return "Just now";
    }
    var days = Math.floor(differenceInMilliSeconds / msDay);
    if(days) {
      return formatDate(days, "day");
    }
    var hours = Math.floor( (differenceInMilliSeconds % msDay) / msHours );
    if(hours) {
      return formatDate(hours, "hour");
    }
    var minutes = Math.floor( (differenceInMilliSeconds % msHours) / msMinute);
    if(minutes) {
      return formatDate(minutes, "minute");
    } else {
      return "Just now";
    }
  }

  /*
   * Render an individual tweet using a Handlebar template.
   */
  function renderTweet(tweetData) {
    tweetData.time = timeSince(tweetData.created_at);
    var tweet = $(tweetTemplate(tweetData))
      .prependTo(tweetsContainer);

  }

  /**
   * Clears out the tweets container and then renders all the tweets.
   */
  function renderTweets(data) {
    tweetsContainer.empty();
    data.forEach(function(tweet) {
      renderTweet(tweet);
    });
  }

  /**
   * Load the data from the server.
   */
  function loadData() {
    $.ajax({
      method: "GET",
      url: "/tweets",
      datType: "json"
    })
    .done(function(tweetData) {
      renderTweets(tweetData);
    });
  }

  /**
   * Displays an error message for the compose form.
   */
  function addError(errorMessage) {
    newTweet.find(".error").remove();
    newTweet.prepend($("<p>").addClass("error").text(errorMessage));
  }

  /**
   * Compose form.
   */
  newTweet.find( "form" )
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
      var textArea = newTweet.find("textArea");
      textArea.val("");
      textArea.focus();
      textArea.trigger("change");
      renderTweet(tweetData);
    });
  }).on("input", function(){
    // remove error messages on user input
    newTweet.find(".error").remove();
  });

  // toggle:show is a custom event triggered by the toggle button
  newTweet.on("toggle:show", function(){
    $(this).find("textArea").focus();
  });

  // initial call to load the data
  loadData();
});