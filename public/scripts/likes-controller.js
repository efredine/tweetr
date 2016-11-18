$(function(){
  /**
   * like event is triggered by an appropriately configured toggle-button.
   * tweet-id is retrieved from a custom data element on the element with the .tweet class.
   * Assumes this event is being triggered on the button that generated it, so bases which action
   * to take based on whether or not the selcted class is present.
   */
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