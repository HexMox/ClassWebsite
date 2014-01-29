// 用户模块
var mongodb = require('./db');

function User(user) {
  this.name = user.name;
  this.password = user.password;
  this.sign = user.sign;
  // this.headImgUrl = 
  // this.questionnaire = 
}

module.exports = User;

User.prototype.save = function(callback) {
  var user = {
    name: this.name,
    password: this.password,
    sign: this.sign
  };
  mongodb.getDb(function (err, db) {
    if (err) {
      mongodb.closeDb();
      return callback(err);
    }

    db.collection('users', function (err, collection) {
      if (err) {
        mongodb.closeDb();
        return callback(err);
      }

      collection.insert(user, {safe: true}, function (err, user) {
        mongodb.closeDb();
        if (err) {
          return callback(err);
        }

        callback(null, user[0]);
      });  // insert user
    });  // create/open collection
  });  // mongodb.open
};

User.get = function(name, callback) {
  mongodb.getDb(function (err, db) {
    if (err) {
      mongodb.closeDb();
      return callback(err);
    }

    db.collection('users', function (err, collection) {
      if (err) {
        mongodb.closeDb();
        return callback(err);
      }

      collection.findOne(name, function (err, user) {
        mongodb.closeDb();
        if (err) {
          return callback(err);
        }

        callback(null, user);
      });  // find user
    });  // open user collection
  });  // mongodb.open
};

User.prototype.getAll = function(callback) {
  // a object contains all msg expect psd
};