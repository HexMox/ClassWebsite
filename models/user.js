// 用户模块
var database = require('./db');

function User(user) {
  this.name = user.name;
  this.password = user.password;
  this.sign = user.sign;
  // this.headImgUrl = 
}

module.exports = User;

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

User.getAll = function(callback) {
  // a object contains all msg expect psd
};