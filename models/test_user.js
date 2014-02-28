var User = require('./user')

var user = {id: '1234',
            name: 'huanglk',
            password: '1234',
           };

console.log('*****************test constructot****************');
var ur = new User(user);
console.dir(ur);

ur.save(function(err, record) {
  console.log('*****************test save****************');
  if (err)
    throw err;
  else
    console.dir(record);
});

ur.getByName('huanglk', function(err, record) {
  console.log('*****************test getByName****************');
  if (err)
    throw err;
  else
    console.dir(record);
});

ur.getById('1234', function(err, record) {
  console.log('*****************test getById****************');
  if (err)
    throw err;
  else
    console.dir(record);
});

ur.getById('12345', function(err, record) {
  console.log('*****************test getById****************');
  if (err)
    throw err;
  else
    console.dir(record);
});

var target = {'password': '8888'};
ur.change(target, function(err, record) {
  console.log('*****************test change****************');
  if (err)
    throw err;
  else
    console.dir(record);
});
