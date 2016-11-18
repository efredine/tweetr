$(function(){
  $('body').on('like', '[data-toggle=like]', function () {
    var thisThing = $(this);
    var thisTweet = thisThing.closest(".tweet");
    var id = thisTweet.data("tweet-id");
    var operation = thisThing.hasClass('selected') ? "/like" : "/unlike";
    $.ajax({
      method: "PUT",
      url: "/tweets/" + id + operation
    })
    .done(function() {
      // doesn't do anything at the moment.
    });

  });
});