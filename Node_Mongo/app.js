var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// DB 설정
var mongoose = require('mongoose')
var dbConn = mongoose.connection
dbConn.once('open',()=>{console.log('MongoDB OK')})
dbConn.on('error',console.error)
// dbConn.on('err',console.err) 

// 3.0 옵션
// mongoose.connect('mongodb://localhost/sukki')


// mongodb 4.0 대 옵션
mongoose.connect('mongodb://localhost:27017/sukki',
		{useNewUrl:true})

		
		
		
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// 이프로젝트에서 사용하기 위해 import
var UserVO = require('./models/UserVO.js')
// 파일명을 직접 require

// 폴더명을 require하면
// 폴더내의 index.js 파일을 찾아서 import
// var Grade = require('./models/Grade')

require('./controller/mainController.js')(app,UserVO)

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
