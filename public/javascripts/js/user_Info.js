(function() {
  var hideUserCard, init, interceptClickEvent, showUserCard, userBox, userCard, visibleArea;

  userBox = $('.userBox');

  visibleArea = $('.visibleArea');

  userCard = $('.invisibleArea');

  init = function() {
    visibleArea.mousemove(showUserCard);
    $(document).click(hideUserCard);
    return userBox.click(interceptClickEvent);
  };

  showUserCard = function() {
    return TweenMax.to(userBox, 0.5, {
      left: 0,
      ease: Back.easeOut
    });
  };

  hideUserCard = function() {
    return TweenMax.to(userBox, 0.5, {
      left: -userCard.outerWidth(true),
      ease: Back.easeOut
    });
  };

  interceptClickEvent = function(event) {
    return event.stopPropagation();
  };

  init();

}).call(this);
