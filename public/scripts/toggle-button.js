$(function() {
  /**
   * Toggle button.
   *
   * Supports two features:
   * 1) the ability to slide another element in and out.  This is specified as data-toggle="toggle".
   *    data-selected="class of thing to toggle."
   * 2) the ability to send an event to another listener on this button.  In this case, the action triggered
   *    is specified as data-toggle="action".  The target is implied as this element.
   */
  $('body').on('click', '[data-toggle]', function () {
    var thisThing = $(this);
    var action = thisThing.data('toggle');

    event.preventDefault();

    if(thisThing.hasClass("selected")) {
      thisThing.removeClass("selected");
    } else {
      thisThing.addClass("selected");
    }

    if(action === "toggle") {
      var selector = thisThing.data('target');
      var toggleTarget = $(selector).slideToggle(function () {
        if (toggleTarget.is(':visible')) {
          toggleTarget.trigger('toggle:show');
        } else {
          toggleTarget.trigger('toggle:hide');
        }
      });
    } else {
      thisThing.trigger(action);
    }

  });

});