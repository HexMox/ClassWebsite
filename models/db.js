// 创建一个数据库连接实例

var settings = require('../settings'),
    Db = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server = require('mongodb').Server;

var mongodb = new Db(
  settings.db,
  new Server(settings.host, Connection.DEFAULT_PORT),
  {safe: true}
);

// var flag = false;
// var instance = null;

// console.log("mongodb: ", mongodb);
// mongodb.open(function (err, db) {
//   console.log("running...");
//   if (err) {
//     throw err;
//   }
//   flag = true;
//   instance = db;
//   console.log("flag: ", flag);
// });

// console.log("A")
// while (1) {
//   //console.log("outer: ", flag);
//   if (flag) {
//     break;
//   }
// }

// console.log("am i running..")
// module.exports = instance;
var instance = null;
var lock = false;
var queue = [];

var initialDatabase = function (callback) {
  lock = true;
  mongodb.open(function (err, db) {
    if (err) {
      throw err;
    } else {
      instance = db;
      callback(instance);
      queue.forEach(function (cb) {
        cb(instance);
      });
      queue = []
    }
  });
}

module.exports = {
  getDb: function (callback) {
    if (instance) {
      callback(instance);
    } else {
      if (lock == false) {
        initialDatabase(callback);
      } else {
        queue.push(callback);
      }
    }
  },
  closeDb: function (callback) {
    if (instance) {
      instance.close(callback);
    }
  }
}