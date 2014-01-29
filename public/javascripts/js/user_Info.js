(function() {
  var hideUserCard, init, interceptClickEvent, logoutBtn, showUserCard, userBox, userCard, userLogout;

  userBox = $('.userBox');

  logoutBtn = $('#logoutBtn');

  userCard = $('.invisibleArea');

  init = function() {
    logoutBtn.mousemove(showUserCard);
    $(document).click(hideUserCard);
    userBox.click(interceptClickEvent);
    return logoutBtn.click(userLogout);
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

  userLogout = function() {
    return $.post('/logout', function(response) {
      if (response === 'OK') {
        return window.location.reload();
      }
    });
  };

  init();

}).call(this);
