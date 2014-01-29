var database = require('./models/db');
var DEFAULT_PSD = 8888;

var users = [
  {
    name: 'huxin',
    password: DEFAULT_PSD,
    sign: '宅是一种文化'
  },
  {
    name: 'huangliankai',
    password: DEFAULT_PSD,
    sign: '有节操的班长才是好班长'
  }
];

for (var i = 0, len = users.length; i < len; i += 1) {
  insertUser(i);
}

function insertUser(i) {
  database.getDb(function (db) {
    db.collection('users', function (err, collection) {
      if (err) {
        throw err;
      }

      collection.findOne({name: users[i].name}, function (err, user) {
        if (!user) {
          collection.insert(users[i], {safe: true}, function (err, user) {
            if (err) {
              return console.log(err);
            }
            // 
          });
        }
        // 
      });
    });
  })
}