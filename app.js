
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var MongoStore = require('connect-mongo')(express);
var routes = require('./routes');
var settings = require('./settings');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
app.use(express.bodyParser());
app.use(express.methodOverride()); // connect内建中间件协助处理POST请求
app.use(express.cookieParser());
app.use(express.session({
  secret: settings.cookieSecret,
  key: settings.db,  // cookie name
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},  // 30 days
  store: new MongoStore({
    db: settings.db
  })
}));
app.use(express.static(path.join(__dirname, 'public')));

routes(app);
app.use(app.router);

app.use(express.logger('dev'));

// development only
// if ('development' == app.get('env')) {
//   app.use(express.errorHandler());
// }
app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});
app.configure('production', function(){ 
  app.use(express.errorHandler());
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
