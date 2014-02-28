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

var instance = null;
var lock = false;
var queue = [];

// 实现单连接
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
      queue = [];
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
        // I think: it happens only when the database is initing(but haven't completed),
        // and several `callback` come in.
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
