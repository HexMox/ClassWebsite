# 为当前页面的导航位置添加active类
$(document).ready ->
  checkUserInfo = (event) ->
    if not $('.userBox').length
      alert('请先登录！')
      event.preventDefault()
  $('#navQuestionnaire').click checkUserInfo
  $('#navPost').click checkUserInfo 
  $('#navHome').attr 'class', 'active'
