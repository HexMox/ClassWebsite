// 问卷模块
var database = require('./db');
var getCurrentTime = require('./time');

function Questionnaire(questionnaire) {
  this._id = questionnaire._id;
  this.author = questionnaire.author;
  this.title = questionnaire.title;
  this.statement = questionnaire.statement;
  this.createdTime = getCurrentTime();
  this.condition = questionnaire.condition;
  this.questions = questionnaire.questions;  // Describe, kind, options
}

module.exports = Questionnaire;

Questionnaire.prototype.save = function(callback) {
  var questionnaire = this;
  database.getDb(function (db) {
    db.collection('questionnaires', function (err, collection) {
      if (err) {
        callback(err);
      }

      collection.insert(questionnaire, {safe: true}, function (err, naire) {
        if (err) {
          callback(err);
        }

        callback(null, naire[0]);
      });
    });
  });
};

Questionnaire.prototype.checkedSave = function (callback) {
  var questionnaire = this;
  database.getDb(function (db) {
    db.collection('checkedQuestionnaires', function (err, collection) {
      if (err) {
        callback(err);
      }

      collection.insert(questionnaire, {safe: true}, function (err, naire) {
        if (err) {
          callback(err);
        }

        callback(null, naire[0]);
      });
    });
  });
};

Questionnaire.removeById = function (_id, callback) {
  database.getDb(function (db) {
    db.collection('questionnaires', function (err, collection) {
      if (err) {
        callback(err);
      }

      collection.findAndModify({'_id': _id}, {remove: true}, function (err, naire) {
        if (err) {
          callback(err);
        }

        callback(null, naire[0]);
      });
    });
  });
};

Questionnaire.getOneNotCheckedById = function (_id, callback) {
  database.getDb(function (db) {
    db.collection('questionnaire', function (err, collection) {
      if (err) {
        callback(err);
      }

      collection.findOne({'_id': _id}, function (err, questionnaire) {
        if (err) {
          callback(err);
        }

        callback(null, questionnaire);
      });
    });
  });
};

Questionnaire.getOneCheckedById = function (_id, callback) {
  database.getDb(function (db) {
    db.collection('checkedQuestionnaires', function (err, collection) {
      if (err) {
        callback(err);
      }

      collection.findOne({'_id': _id}, function (err, questionnaire) {
        if (err) {
          callback(err);
        }

        callback(null, questionnaire);
      });
    });
  });
};

Questionnaire.getCheckedAll = function (callback) {
  database.getDb(function (db) {
    db.collection('checkedQuestionnaires', function (err, collection) {
      if (err) {
        callback(err);
      }

      var cursor = collection.find({});
      cursor.toArray(function (err, docs) {
        if (err) {
          callback(err);
        }

        callback(null, docs);
      });
    });
  });
};

Questionnaire.getNotCheckedAllByAuthor = function (username, callback) {
  database.getDb(function (db) {
    db.collection('questionnaire', function (err, collection) {
      if (err) {
        callback(err);
      }

      var cursor = collection.find({'author': username});
      cursor.toArray(function (err, docs) {
        if (err) {
          callback(err);
        }

        callback(null, docs);
      });
    });
  });
};

Questionnaire.getCheckedAllByAuthor = function (username, callback) {
  database.getDb(function (db) {
    db.collection('checkedQuestionnaires', function (err, collection) {
      if (err) {
        callback(err);
      }

      var cursor = collection.find({'author': username});
      cursor.toArray(function (err, docs) {
        if (err) {
          callback(err);
        }

        callback(null, docs);
      });
    });
  });
};