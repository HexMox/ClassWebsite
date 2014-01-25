
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('main_page');
};

exports.questionnaire = function(req, res) {
  res.render('questionnaire_list_page');
}

exports.questionnaireCreate = function(req, res) {
  res.render('questionnaire_create_page');
}

exports.questionnaireDetail = function(req, res) {
  res.render('questionnaire_detail_page');
}