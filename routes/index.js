// routes and handlers
var crypto = require('crypto');
var User = require('../models/user');
var questionnaire = require('./questionnaire');

module.exports = function(app) {
  // app.get('/forbidden', forbidHandler);
  // app.get('/404', notFoundHandler);

  app.get('/', index);
  app.get('/index', index);

  // 权限控制页面
  app.get('/questionnaire', checkLogin);
  app.get('/questionnaire', questionnaire.questionnaire);

  app.get('/questionnaire/create', checkLogin);
  app.get('/questionnaire/create', questionnaire.questionnaireCreate);

  app.get('/questionnaire/:_id', checkLogin);
  app.get('/questionnaire/:_id', questionnaire.questionnaireDetail);

  app.post('/login', loginHandler);
  app.post('/logout', logoutHandler);
  app.post('/createQuestionnaire', questionnaire.createQuestionnaireHandler);

  // Since this is the last non-error-handling
  // middleware use(), we assume 404, as nothing else
  // responded.
  app.use(function(req, res, next){
    next({type: '404', message: 'Not Found'});
  });

  // Use error handlers
  app.use(logErrors);
  app.use(errorHandler);
};

// ******************Common Handlers**********************
function index(req, res) {
  res.render('main_page', {
    user: req.session.user
  });
}


function loginHandler(req, res) {
  var md5 = crypto.createHash('md5'),
      // password = md5.update(req.body.password).digest('hex');
      password = req.body.password;  // 由于没有注册功能，导入默认用户时没有MD5加密，后面加上
  User.getByName(req.body.name, function (err, user) {
    if (!user) {
      return res.send('没有此用户');
    }
    if (user.password != password) {
      return res.send('密码错误');
    }
    req.session.user = user;
    res.send(200);
  });
}

function logoutHandler(req, res) {
  req.session.user = null;
  res.send(200);
  // 通过浏览器端刷新
}

function checkLogin(req, res, next) {
  if (req.session.user == null) {
    next({type: '403', message: 'You haven\'t login in.'});
  } else {
    next();
  }
}

function logErrors(err, req, res, next) {
  console.error(err);
  next(err);
}

function errorHandler(err, req, res, next) {
  if (err.type == '403') {
    res.status(403);
    res.render('403', {err: err});
  }
  else if (err.type == '404') {
    res.status(404);
    res.render('404', {err: err});
  }
  // other errors
  else
    next();
}
