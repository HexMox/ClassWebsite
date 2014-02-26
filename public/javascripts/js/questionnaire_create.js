(function() {
  var addOption, addQuestion, addQuestionBtn, deleteQuestion, getOptionTemplate, getQuesTemplate, init, pushQuestionData, questionBox, showResponse, submitBtn, submitQustionnaire, updateOptionsNum;

  questionBox = $('.questions');

  addQuestionBtn = $('#addQuestionBtn');

  submitBtn = $('#submitBtn');

  init = function() {
    addQuestionBtn.click(addQuestion);
    return submitBtn.click(submitQustionnaire);
  };

  addQuestion = function() {
    var kind, template;
    kind = $('#quesKind').val();
    template = getQuesTemplate(kind);
    if (!template.hasClass('fillBlankQues')) {
      template.find('#addOptionBtn').click(addOption.bind(template));
    }
    template.find('#deleteQuesBtn').click(deleteQuestion.bind(template));
    return questionBox.append(template);
  };

  getQuesTemplate = function(kind) {
    var describe, template;
    if (kind === 'fillBlank') {
      template = $($('#fillBlankQuesTemplate').html());
    } else {
      describe = kind === 'singleSelect' ? '单选' : '多选';
      template = $($('#SelectQuesTemplate').html());
      template.toggleClass(kind, true);
      template.optionCount = 2;
      template.find('#questionDescribe').text('问题描述(' + describe + ')');
    }
    return template;
  };

  addOption = function() {
    var decreaseAndRemove, option,
      _this = this;
    option = getOptionTemplate(++this.optionCount);
    option.find('#deleteOptionBtn').click(decreaseAndRemove = function() {
      _this.optionCount--;
      updateOptionsNum(option);
      return TweenMax.to(option, 0.4, {
        opacity: 0,
        ease: Back.easeOut,
        onComplete: function() {
          return option.remove();
        }
      });
    });
    return option.insertBefore(this.find('#addOptionBtn'));
  };

  deleteQuestion = function() {
    var _this = this;
    return TweenMax.to(this, 0.4, {
      opacity: 0,
      ease: Back.easeOut,
      onComplete: function() {
        return _this.remove();
      }
    });
  };

  getOptionTemplate = function(count) {
    var option;
    option = $($('#optionTemplate').html());
    option.find('label').text('答案' + count).attr('for', 'ans' + count);
    option.find('input').attr('name', 'ans' + count);
    return option;
  };

  updateOptionsNum = function(disappearOption) {
    return disappearOption.nextAll('div.row').each(function() {
      var item, num;
      item = $(this);
      num = parseInt(item.find('input').attr('name').replace('ans', ''));
      num -= 1;
      item.find('label').text('答案' + num).attr('for', 'ans' + num);
      return item.find('input').attr('name', 'ans' + num);
    });
  };

  submitQustionnaire = function() {
    var questionnaire;
    questionnaire = {
      title: $('input[name="questionnaireTitle"]').val(),
      statement: $('.statement').val(),
      questions: []
    };
    $('.question').each(function() {
      return pushQuestionData(questionnaire, this);
    });
    console.log(JSON.stringify(questionnaire));
    return $.post('/createQuestionnaire', questionnaire, showResponse);
  };

  pushQuestionData = function(questionnaire, question) {
    var item;
    item = $(question);
    question = {
      describe: item.find('input[name="questionTitle"]').val()
    };
    if (item.hasClass('fillBlankQues')) {
      question.kind = 'fillBlank';
    } else {
      question.options = [];
      question.kind = item.hasClass('singleSelect') ? 'singleSelect' : 'multiSelect';
    }
    item.find('.answer').each(function() {
      return question.options.push($(this).val());
    });
    return questionnaire.questions.push(question);
  };

  showResponse = function(response) {
    if (response === 'OK') {
      return alert('提交成功');
    } else {
      return alert(response);
    }
  };

  init();

}).call(this);
