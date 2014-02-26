
questionBox = $ '.questions'
addQuestionBtn = $ '#addQuestionBtn'
submitBtn = $ '#submitBtn'

init = ->
  addQuestionBtn.click addQuestion
  submitBtn.click submitQustionnaire

addQuestion = ->
  kind = $('#quesKind').val()
  template = getQuesTemplate kind
  if not template.hasClass 'fillBlankQues'
    template.find('#addOptionBtn').click addOption.bind template
  template.find('#deleteQuesBtn').click deleteQuestion.bind template
  questionBox.append template

getQuesTemplate = (kind) ->
  if kind is 'fillBlank'
    template = $ $('#fillBlankQuesTemplate').html()
  else
    describe = if kind is 'singleSelect' then '单选' else '多选'
    template = $ $('#SelectQuesTemplate').html()
    template.toggleClass kind, true
    template.optionCount = 2
    template.find('#questionDescribe').text '问题描述(' + describe + ')'
  template

addOption = ->
  option = getOptionTemplate ++this.optionCount
  option.find('#deleteOptionBtn').click decreaseAndRemove = =>
    this.optionCount--
    updateOptionsNum option
    TweenMax.to option, 0.4, {
      opacity: 0, 
      ease: Back.easeOut,
      onComplete: ->
        option.remove()
    }
  option.insertBefore this.find('#addOptionBtn')

deleteQuestion = ->
  TweenMax.to this, 0.4, {
    opacity: 0,
    ease: Back.easeOut,
    onComplete: =>
      this.remove()
  }

getOptionTemplate = (count) ->
  option = $ $('#optionTemplate').html()
  option.find('label').text('答案' + count).attr 'for', 'ans' + count
  option.find('input').attr 'name', 'ans' + count
  option

updateOptionsNum = (disappearOption) ->
  disappearOption.nextAll('div.row').each ->
    item = $ this
    num = parseInt item.find('input').attr('name').replace 'ans', ''
    num -= 1
    item.find('label').text('答案' + num).attr 'for', 'ans' + num 
    item.find('input').attr 'name', 'ans' + num 

submitQustionnaire = ->
  questionnaire = {
    title: $('input[name="questionnaireTitle"]').val(),
    statement: $('.statement').val(),
    questions: []
  }
  $('.question').each ->
    pushQuestionData questionnaire, this
  console.log JSON.stringify questionnaire
  $.post '/createQuestionnaire', questionnaire, showResponse

pushQuestionData = (questionnaire, question) ->
  item = $ question 
  question = {
    describe: item.find('input[name="questionTitle"]').val()
  }
  if item.hasClass 'fillBlankQues'
    question.kind = 'fillBlank'
  else
    question.options = []
    question.kind = if item.hasClass 'singleSelect' then 'singleSelect' else 'multiSelect'
  item.find('.answer').each ->
    question.options.push $(this).val()
  questionnaire.questions.push question

showResponse = (response) ->
  if response is 'OK'
    alert '提交成功'
    # redirect
  else
    alert response

init()