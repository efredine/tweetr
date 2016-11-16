$(document).ready(function(){
  var counter = $(".new-tweet").find(".counter");

  // set handler on the text area within that section
  $(".new-tweet").find("textArea").on("input", function(){

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