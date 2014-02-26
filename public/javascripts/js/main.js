(function() {
  $(document).ready(function() {
    var checkUserInfo;
    checkUserInfo = function(event) {
      if (!$('.userBox').length) {
        alert('请先登录！');
        return event.preventDefault();
      }
    };
    $('#navQuestionnaire').click(checkUserInfo);
    $('#navPost').click(checkUserInfo);
    return $('#navHome').attr('class', 'active');
  });

}).call(this);
