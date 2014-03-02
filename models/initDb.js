/* Init the database.
 * Remove collections if exist.
 * Create new collections.
 * Insert default document.
 */
var database = require('./db');
var User = require('./user');

var ADMIN = new User({id: '88888888',
                      name: 'admin',
                      password: 'root',
                      privilege: {readTopics: true,
                                  writeTopics: true,
                                  questionnaire: true,
                                  adminAuth: false
                                 }
                     });

var huanglk = new User({id: '12330131',
                      name: 'huanglk',
                      password: '8888',
                      privilege: {readTopics: true,
                                  writeTopics: true,
                                  questionnaire: true,
                                  adminAuth: false
                                 }
                     });

var dropCollection = function(collectionName, callback) {
  database.getDb(function(db) {
    db.collection(collectionName, function(err, collection) {
      if (err)
        throw err;
      collection.drop(function(err, reply) {
        if (err)
          callback(err);

        callback(null, reply);
      });
    });
  });
};

var insertDefaultDoc = function(docArr, collectionName, callback) {
  database.getDb(function (db) {
    db.collection(collectionName, function (err, collection) {
      if (err) {
        throw err;
      }

      collection.insert(docArr, {safe: true}, function (err, result) {
        if (err) {
          callback(err);
        }

        callback(null, result)
      });
    });
  })
}

module.exports = (function() {
  collectionArr = ['users', 'questionnaires',];
  collectionArr.forEach(function(collectionName) {
    dropCollection(collectionName, function(err, reply) {
      if (err) {
        console.log(err);
      }
      else {
        console.log((reply ? 'Succeed':'Fail') + ' to drop Collection ' + collectionName);
      }
    });
  });

  insertDefaultDoc([ADMIN, huanglk,], 'users', function(err, result) {
    if (err)
      console.log(err);

    console.log(result);
  });
}());
