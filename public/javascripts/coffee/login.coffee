
loginBox = $ '.loginBox'
loginBtn = $ '#loginBtn'
loginForm = $ '.loginForm'

init = ->
  loginBtn.mousemove showLoginBox
  $(document).click hideLoginBox
  loginBox.click interceptClickEvent
  loginBtn.click userLogin

showLoginBox = ->
  TweenMax.to loginBox, 0.5, {left: 0, ease: Back.easeOut}

hideLoginBox = ->
  TweenMax.to loginBox, 0.5, {left: -loginForm.outerWidth(true), ease: Back.easeOut}

interceptClickEvent = (event) ->
  event.stopPropagation()

userLogin = ->
  ""

init()