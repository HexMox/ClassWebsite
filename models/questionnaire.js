// 问卷模块
var database = require('./db');

function Questionnaire(questionnaire) {
  this.author = questionnaire.author;
  this.title = questionnaire.title;
  this.statement = questionnaire.statement;
  this.createdTime = new Date();
  this.questions = questionnaire.questions;  // Describe, kind, answers
}

module.exports = Questionnaire;

Questionnaire.prototype.save = function() {
};