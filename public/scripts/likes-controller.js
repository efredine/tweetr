$(function(){
  $('body').on('like', '[data-toggle=like]', function () {
    var thisThing = $(this);
    var id = thisThing.data("tweet-id");
    console.log(id, thisThing.hasClass('selected'));
  });
});