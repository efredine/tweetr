$(function() {
  /**
   * Toggle button.
   */
  $('[data-toggle=toggle]').on('click', function () {
    var thisThing = $(this);
    var selector = thisThing.data('target');

    event.preventDefault();

    if(thisThing.hasClass("selected")) {
      thisThing.removeClass("selected");
    } else {
      thisThing.addClass("selected");
    }

    var toggleTarget = $(selector).slideToggle(function () {
      if (toggleTarget.is(':visible')) {
        toggleTarget.trigger('toggle:show');
      } else {
        toggleTarget.trigger('toggle:hide');
      }
    });
  });

});