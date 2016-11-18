$(function(){
  /**
   * Like state is stored in a custom data attribute.  When the button is clicked, update the state of the
   * data attribute and post the new state to the server.  Use event delegation, because tweets are created
   * dyanmically.
   */
  $('body').on('click', '.fa-heart', function () {
    var thisThing = $(this);
    var thisTweet = thisThing.closest(".tweet");
    var id = thisTweet.data("tweet-id");
    var likedData = thisThing[0].getAttribute('data-tweet-liked');
    var likedState = likedData === "true";

    // toggle button state
    likedState = !likedState;

    // update local state optimistically
    thisThing[0].setAttribute("data-tweet-liked", likedState.toString());

    // update the server idempotently
    var operation = likedState ? "/like" : "/unlike";
    $.ajax({
      method: "PUT",
      url: "/tweets/" + id + operation
    })
    .done(function() {
      // nothing to do...
    });

  });
});