/* User Model
 * id: string
 * name: string
 * password: string
 * sign: string
 * topics: Topic Array
 * image: imageURL
 * info: {}
 * privilege: { readTopics: true,
 *              writeTopics: true,
 *              questionnaire: true,  // Allow to fill in questionnaire.
 *              adminAuth: false
 *            }
 *
 * Note:
 * The Format of Elements in Topic Array: {'$ref': 'collection', '$id': new ObjectId(_id)}
 * Google `MongoDb DBRefs` for know more.
 */

var database = require('./db');

var DEFAULT_PRIVILEGE = {
  readTopics: true,
  writeTopics: true,
  questionnaire: true,
  adminAuth: false,
};

// class User
// constructor
function User(user) {
  // if (!('id' in user))
  //   throw new TypeError("`id` of User is required");
  this.id = user.id;
  this.name = user.name || "";
  this.password = user.password || user.id;
  this.sign = user.sign || "";
  this.topics = user.topics || [];
  this.image = user.image || "";
  this.info = user.info || {};
  this.privilege = user.privilege || DEFAULT_PRIVILEGE;
}

// methods
User.prototype.save = function(callback) {
  var user = this;
  database.getDb(function (db) {
    db.collection('users', function(err, collection) {
      if (err) {
        callback(err);
      }

      // If the id of the user have existed, modify the user.
      // Else insert a new user.
      collection.findAndModify(
        {'id': user.id},
        [],
        {$set: user},
        {upsert: true, new: true},
        function(err, record) {
          if (err) {
            callback(err);
          }
          else {
            callback(null, record);
          }
        }
      );
    });
  });
};

User.getByName = function(name, callback) {
  database.getDb(function(db) {
    db.collection('users', function(err, collection) {
      if (err) {
        throw err;
      }

      collection.findOne({'name': name}, function(err, user) {
        if (err) {
          throw err;
        }

        callback(null, user);
      });
    });
  });
};

User.getById = function(id, callback) {
  database.getDb(function(db) {
    db.collection('users', function(err, collection) {
      if (err) {
        throw err;
      }

      collection.findOne({'id': id}, function(err, user) {
        if (err) {
          throw err;
        }

        callback(null, user);
      });
    });
  });
};

User.getAll = function(callback) {
  // a object contains all msg expect psd
};

// Change the data of user. The `target` argument is {}.
User.prototype.change = function(target, callback) {
  if (target instanceof Array)
    throw new TypeError("Unexpected type of `target` as changing the user.");

  for (var x in target) {
    if (this.hasOwnProperty(x))
      this[x] = target[x];
  }
  this.save(callback);
};

/*
 * After delete a user, the topics posted by the user will not be deleted.
 * A solution is that change the `author` into `null`.
 */
User.deleteById = function(id, callback) {
}

User.deleteByName = function(name, callback) {
}

User.deleteAll = function(callback) {
}

module.exports = User;
