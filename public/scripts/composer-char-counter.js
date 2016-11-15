$(document).ready(function(){
  // new tweet composer section
  var newTweet = $(".new-tweet");

  // counter within that section
  var counter = newTweet.find(".counter");

  // set handler on the text area within that section
  newTweet.find("textArea").on("input", function(){
    var remaining = 140 - $(this).val().length;
    counter.text(remaining);

    // conditionally add or remove the invalid class to style the counter based on the number of
    // characters remaining.
    if(remaining < 0) {
      counter.addClass("invalid");
    } else {
      counter.removeClass("invalid");
    }
  });
});