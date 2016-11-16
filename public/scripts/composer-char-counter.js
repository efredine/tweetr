$(document).ready(function(){
  var newTweet = $(".new-tweet");
  var counter = newTweet.find(".counter");
  var textArea = newTweet.find("textArea");

  // set handler on the text area within that section
  textArea.on("input change", function(event){

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