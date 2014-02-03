// 问卷答案模块
var database = require('./db');

function QuestionnaireResult(questionnaireResult) {
  this.// 调查者
  this.// 所属问卷_id
  // this.createdTime = questionnaireResult.createdTime;
  this.answers = questionnaireResult.answers;  // {id, answer, kind}
}

module.exports = QuestionnaireResult;

QuestionnaireResult.prototype.save = function (callback) {
};