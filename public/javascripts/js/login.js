(function() {
  var ENTER_KEY, hideLoginBox, init, interceptClickEvent, isCallLog, logSuccessCallback, loginBox, loginBtn, loginForm, nameInput, psdInput, showLoginBox, userLogin;

  ENTER_KEY = 13;

  loginBox = $('.loginBox');

  loginBtn = $('#loginBtn');

  loginForm = $('.loginForm');

  psdInput = $('input[name="password"]');

  nameInput = $('input[name="name"]');

  init = function() {
    loginBtn.mousemove(showLoginBox);
    $(document).click(hideLoginBox);
    loginBox.click(interceptClickEvent);
    loginBtn.click(userLogin);
    return psdInput.keypress(isCallLog);
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
    var user;
    user = {
      name: nameInput.val(),
      password: psdInput.val()
    };
    $.post('/login', user, logSuccessCallback);
    return psdInput.val('');
  };

  isCallLog = function(event) {
    if (event.keyCode === ENTER_KEY) {
      return userLogin();
    }
  };

  logSuccessCallback = function(response) {
    return alert(response);
  };

  init();

}).call(this);
