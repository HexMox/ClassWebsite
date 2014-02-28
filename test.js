database = require('./models/db')
ObjectId = require('mongodb').ObjectID;

database.getDb(function(db) {

  // db.collection('user', function(err, collection) {
  //   if (err)
  //     throw err;
  //   collection.insert({'name': 'ace', 'post_id': null}, {safe: true}, function(err, record) {
  //     if (err)
  //       throw err;
  //     console.dir(record);
  //   });
  // });

  db.collection('post', function(err, collection) {
    if (err)
      throw err;
    collection.insert({'title': 'justforfun', 'author': {'$ref': 'user', '$id': new ObjectId('53109bc88ffbe90b1e314e75')}}, {safe: true}, function(err, record) {
      if (err)
        throw err;
      console.dir(record);
    });
  });

});
