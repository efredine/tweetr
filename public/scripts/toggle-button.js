$(function() {
  /**
   * Toggle button.
   */
  $('body').on('click', '[data-toggle=toggle]', function () {
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