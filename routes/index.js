// routes and handlers
var crypto = require('crypto');
var User = require('../models/user');

module.exports = function(app) {
  app.get('/', index);
  app.get('/index', index);

  // 权限控制页面
  app.get('/questionnaire', checkLogin);
  app.get('/questionnaire', questionnaire);

  app.get('/questionnaire/create', checkLogin);
  app.get('/questionnaire/create', questionnaireCreate);

  app.get('/questionnaire/detail', checkLogin);
  app.get('/questionnaire/detail', questionnaireDetail);

  app.post('/login', logHandler);
};

function index(req, res) {
  res.render('main_page', {
    user: req.session.user
  });
}

function questionnaire(req, res) {
  res.render('questionnaire_list_page');
}

function questionnaireCreate(req, res) {
  res.render('questionnaire_create_page');
}

function questionnaireDetail(req, res) {
  res.render('questionnaire_detail_page');
}

function logHandler(req, res) {
  var md5 = crypto.createHash('md5'),
      password = md5.update(req.body.password).digest('hex');
  User.get(req.body.name, function (err, user) {
    if (!user) {
      return res.send('没有此用户');
    }
    if (user.password != password) {
      return res.send('密码错误');
    }
    req.session.user = user;
    req.redirect('/');  // 刷新从而显示user_info模块
  });
}

function checkLogin(req, res, next) {
  if (!req.session.user) {
    res.redirect('/forbidden');
  }
  next();
}