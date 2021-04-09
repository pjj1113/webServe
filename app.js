var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
app.use(express.static(__dirname + '/public'));

var ejs = require('ejs');
app.engine('html', ejs.__express);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.type('text/plain');
  res.send('访问了首页');
});
 
app.use('/users', usersRouter);
// 定制 404 页面 (返回404状态码)
app.use(function(req, res) {
  let currentTime = new Date();
  res.type('text/plain');
  res.status(404);
  res.send('404 - 你访问的页面可能去了火星\n' + currentTime);
});
 
 
//定制 500 页面 (返回500状态码)
app.use(function(err, req, res, next) {
  let currentTime = new Date();
  let errInfo = err.stack;
  res.type('text/plain');
  res.status(500);
  res.send('500 - 服务器发生错误\n' + 'errInfo:' + errInfo + '\n' + 'currentTime:' + currentTime);
});
 
 
// 监听服务端口, 保证程序不会退出
app.listen(app.get('port'), function() {
  console.log('Express 服务正在运行在 http://localhost:' + app.get('port') + '; 按 Ctrl-C 关闭服务.');
});


// app.use('/', indexRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
