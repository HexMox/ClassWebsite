(function() {
  var init, moveUnderline, nav, navElement, resetUnderline, underline;

  nav = $('#nav');

  navElement = $('#nav ul li');

  underline = $('#underline');

  init = function() {
    navElement.mousemove(moveUnderline);
    return nav.mouseleave(resetUnderline);
  };

  moveUnderline = function(event) {
    var distance, lineWidth, target;
    target = $(this);
    lineWidth = target.outerWidth();
    distance = 0;
    target.prevAll().each(function() {
      return distance += $(this).outerWidth(true);
    });
    return TweenMax.to(underline, 0.3, {
      left: distance,
      width: lineWidth,
      ease: Power0.easeInOut
    });
  };

  resetUnderline = function() {
    var currentPos, distance, lineWidth;
    currentPos = $('#nav .active');
    lineWidth = currentPos.outerWidth();
    distance = 0;
    currentPos.prevAll().each(function() {
      return distance += $(this).outerWidth(true);
    });
    return TweenMax.to(underline, 0.3, {
      left: distance,
      width: lineWidth,
      ease: Power0.easeInOut
    });
  };

  init();

}).call(this);
