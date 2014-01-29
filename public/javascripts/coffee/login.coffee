
ENTER_KEY = 13
loginBox = $ '.loginBox'
loginBtn = $ '#loginBtn'
loginForm = $ '.loginForm'
psdInput = $ 'input[name="password"]'
nameInput = $ 'input[name="name"]'

init = ->
  loginBtn.mousemove showLoginBox
  $(document).click hideLoginBox
  loginBox.click interceptClickEvent
  loginBtn.click userLogin
  psdInput.keypress isCallLog

showLoginBox = ->
  TweenMax.to loginBox, 0.5, {left: 0, ease: Back.easeOut}

hideLoginBox = ->
  TweenMax.to loginBox, 0.5, {left: -loginForm.outerWidth(true), ease: Back.easeOut}

interceptClickEvent = (event) ->
  event.stopPropagation()

userLogin = ->
  user = {
    name: nameInput.val(),
    password: psdInput.val()
  }
  $.post '/login', user, logSuccessCallback
  psdInput.val ''

isCallLog = (event) ->
  if event.keyCode is ENTER_KEY
    userLogin()

logSuccessCallback = (response) ->
  if response is 'OK'
    window.location.reload()
  else
    alert response

init()