// routes and handlers
var crypto = require('crypto');
var User = require('../models/user');
var Questionnaire = require('../models/questionnaire');
var QuestionnaireResult = require('../models/questionnaireResult');

module.exports = function(app) {
  app.get('/forbidden', forbidHandler);
  app.get('/404', notFoundHandler);

  app.get('/', index);
  app.get('/index', index);

  // 权限控制页面
  app.get('/questionnaire', checkLogin);
  app.get('/questionnaire', questionnaire);

  app.get('/questionnaire/create', checkLogin);
  app.get('/questionnaire/create', questionnaireCreate);

  app.get('/questionnaire/detail', checkLogin);
  app.get('/questionnaire/detail', questionnaireDetail);

  app.post('/login', loginHandler);
  app.post('/logout', logoutHandler);
  app.post('/questionnaireCreate', createQuestionnaireHandler);
};

function forbidHandler(req, res) {
  res.render('403');
}

function notFoundHandler(req, res) {
  res.render('404');
}

function index(req, res) {
  res.render('main_page', {
    user: req.session.user
  });
}

function questionnaire(req, res) {
  res.render('questionnaire_list_page', {
    user: req.session.user
  });
}

function questionnaireCreate(req, res) {
  res.render('questionnaire_create_page', {
    user: req.session.user
  });
}

function questionnaireDetail(req, res) {
  res.render('questionnaire_detail_page', {
    user: req.session.user
  });
}

function loginHandler(req, res) {
  var md5 = crypto.createHash('md5'),
      // password = md5.update(req.body.password).digest('hex');
      password = req.body.password;  // 由于没有注册功能，导入默认用户时没有MD5加密，后面加上
  User.get(req.body.name, function (err, user) {
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

function createQuestionnaireHandler() {
  
}

function checkLogin(req, res, next) {
  if (req.session.user == null) {
    res.redirect('/');
  } else {
    next();
  }
}