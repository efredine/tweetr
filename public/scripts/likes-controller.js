$(function(){
  $('body').on('like', '[data-toggle=like]', function () {
    var thisThing = $(this);
    var thisTweet = thisThing.closest(".tweet");
    var id = thisTweet.data("tweet-id");
    var operation = thisThing.hasClass('selected') ? "/like" : "/unlike";
    $.ajax({
      method: "PUT",
      url: "/tweet/" + id + operation
    })
    .done(function() {
      // update display pessimistically

    });

  });
});