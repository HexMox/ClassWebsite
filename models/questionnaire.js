// 问卷模块
var database = require('./db');

function Questionnaire(questionnaire) {
  this._id = questionnaire._id;
  this.author = questionnaire.author;
  this.title = questionnaire.title;
  this.statement = questionnaire.statement;
  this.createdTime = questionnaire.createdTime;
  this.condition = questionnaire.condition;
  this.questions = questionnaire.questions;  // Describe, kind, answers
}

module.exports = Questionnaire;

Questionnaire.prototype.save = function(callback) {
  var questionnaire = this;
  database.getDb(function (db) {
    db.collection('questionnaires', function (err, collection) {
      if (err) {
        throw err;
      }

      collection.insert(questionnaire, {safe: true}, function (err, user) {
        if (err) {
          throw err;
        }

        callback(null, user[0]);
      });
    });
  });
};

Questionnaire.prototype.checkedSave = function (callback) {
  var questionnaire = this;
  database.getDb(function (db) {
    db.collection('checkedQuestionnaires', function (err, collection) {
      if (err) {
        throw err;
      }

      collection.insert(questionnaire, {safe: true}, function (err, user) {
        if (err) {
          throw err;
        }

        callback(null, user[0]);
      });
    });
  });
};

Questionnaire.prototype.remove = function (callback) {
  // body...
}

Questionnaire.prototype.checkedRemove = function (callback) {
  // body...
}

Questionnaire.getAll = function (callback) {
  // body...
}

Questionnaire.getAllDones = function (callback) {

}

Questionnaire.getAllTodos = function (callback) {

}

Questionnaire.getAllByAuthor = function (callback) {

}