(function() {
  var hideLoginBox, init, interceptClickEvent, loginBox, loginBtn, loginForm, showLoginBox, userLogin;

  loginBox = $('.loginBox');

  loginBtn = $('#loginBtn');

  loginForm = $('.loginForm');

  init = function() {
    loginBtn.mousemove(showLoginBox);
    $(document).click(hideLoginBox);
    loginBox.click(interceptClickEvent);
    return loginBtn.click(userLogin);
  };

  showLoginBox = function() {
    return TweenMax.to(loginBox, 0.5, {
      left: 0,
      ease: Back.easeOut
    });
  };

  hideLoginBox = function() {
    return TweenMax.to(loginBox, 0.5, {
      left: -loginForm.outerWidth(true),
      ease: Back.easeOut
    });
  };

  interceptClickEvent = function(event) {
    return event.stopPropagation();
  };

  userLogin = function() {
    return "";
  };

  init();

}).call(this);
