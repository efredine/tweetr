$(document).ready(function(){

  // set handler on the text area within that section
  $(".new-tweet").find("textArea").on("input", function(){
    var newTweet = $(this).closest(".new-tweet");

    // remove any error messasges on user input
    newTweet.find(".error").remove();

    var remaining = 140 - $(this).val().length;
    var counter = newTweet.find(".counter");
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