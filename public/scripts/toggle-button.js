$(function() {
  /**
   * Toggle button.
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