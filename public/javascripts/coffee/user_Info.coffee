
userBox = $ '.userBox'
visibleArea = $ '.visibleArea'
userCard = $ '.invisibleArea'

init = ->
  visibleArea.mousemove showUserCard
  $(document).click hideUserCard
  userBox.click interceptClickEvent

showUserCard = ->
  TweenMax.to userBox, 0.5, {left: 0, ease: Back.easeOut}

hideUserCard = ->
  TweenMax.to userBox, 0.5, {left: -userCard.outerWidth(true), ease: Back.easeOut}

interceptClickEvent = (event) ->
  event.stopPropagation()

init()