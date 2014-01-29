
userBox = $ '.userBox'
logoutBtn = $ '#logoutBtn'
userCard = $ '.invisibleArea'

init = ->
  logoutBtn.mousemove showUserCard
  $(document).click hideUserCard
  userBox.click interceptClickEvent
  logoutBtn.click userLogout

showUserCard = ->
  TweenMax.to userBox, 0.5, {left: 0, ease: Back.easeOut}

hideUserCard = ->
  TweenMax.to userBox, 0.5, {left: -userCard.outerWidth(true), ease: Back.easeOut}

interceptClickEvent = (event) ->
  event.stopPropagation()

userLogout = ->
  $.post '/logout', (response) ->
    if response is 'OK'
      window.location.reload()

init()