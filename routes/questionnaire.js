/*
 * Routes of questionnaire
 */

var Questionnaire = require('../models/questionnaire');
var QuestionnaireResult = require('../models/questionnaireResult');

module.exports.questionnaire = function(req, res) {
  Questionnaire.getCheckedAll(function (err, questionnaires) {
    if (err) {
      // 返回错误信息
      res.redirect('back');
    }
    console.log(questionnaires);
    res.render('questionnaire_list_page', {
      user: req.session.user,
      questionnaires: questionnaires
    });
  });
}

module.exports.questionnaireCreate = function(req, res) {
  res.render('questionnaire_create_page', {
    user: req.session.user
  });
}

module.exports.questionnaireDetail = function(req, res) {
  Questionnaire.getOneCheckedById(req.params._id, function (err, questionnaire) {
    if (err) {
      // 返回错误信息
      res.redirect('back');
    }
    res.render('questionnaire_detail_page', {
      user: req.session.user,
      questionnaire: questionnaire
    });
  });
}

module.exports.createQuestionnaireHandler = function(req, res) {
  if (!req.session.user)
    res.send('你还未登录');
  var questionnaire = req.body;
  questionnaire.author = req.session.user;
  questionnaire.condition = 'notChecked';
  var naire = new Questionnaire(questionnaire);

  console.log(naire);
  naire.checkedSave(function (err, naire) {
    if (naire) {
      res.send(200);
    } else {
      res.send('error!');
    }
  });
}
