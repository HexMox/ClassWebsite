// 用户模块
var database = require('./db');

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
  database.getDb(function (err, db) {
    if (err) {
      throw err;
    }

    db.collection('users', function (err, collection) {
      if (err) {
        throw err;
      }

      collection.insert(user, {safe: true}, function (err, user) {
        if (err) {
          throw err;
        }

        callback(null, user[0]);
      });  // insert user
    });  // create/open collection
  });  // database.open
};

User.get = function(name, callback) {
  database.getDb(function (db) {
    db.collection('users', function (err, collection) {
      if (err) {
        throw err;
      }

      collection.findOne({'name': name}, function (err, user) {
        if (err) {
          throw err;
        }

        callback(null, user);
      });  // find user
    });  // open user collection
  });  // database.open
};

User.prototype.getAll = function(callback) {
  // a object contains all msg expect psd
};