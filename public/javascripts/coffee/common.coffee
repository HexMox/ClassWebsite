# 头部下划线移动动画
nav = $ '#nav'
navElement = $ '#nav ul li'
underline = $ '#underline'
init = ->
  navElement.mousemove moveUnderline
  nav.mouseleave resetUnderline

moveUnderline = (event) ->
  target = $ this
  lineWidth = target.outerWidth()
  distance = 0
  target.prevAll().each () ->
    distance += $(this).outerWidth true
  TweenMax.to underline, 0.3, {left: distance, width: lineWidth, ease: Power0.easeInOut}

resetUnderline = ->
  currentPos = $ '#nav .active'
  lineWidth = currentPos.outerWidth()
  distance = 0
  currentPos.prevAll().each () ->
    distance += $(this).outerWidth true
  TweenMax.to underline, 0.3, {left: distance, width: lineWidth, ease: Power0.easeInOut}

init()