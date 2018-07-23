var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// mongoose 설정
// mongoose는 mongoDB를 nodejs ODM(ORM)방식으로
// 쉽게 접근할수 있도록 도와주는 helper 클래스
// spring에서는 hibernate
// TABLE JOIN 이 다소 어려운데
// 이유는 mongoDB가 table이라는 개념이 없고
// mongoDB 자체에서는 JOIN 개념자체가 없다.

var mongoose = require('mongoose')
var dbConn = mongoose.connection // 연결객체 생성
// 연결후에 CRUD를 구현하는 과정에서 DB 상태를 모니터링

// Event설정
dbConn.once('open',()=>{
	console.log('MongoDB Open OK!!')
})
dbConn.on('error',console.error)

// DB 연결
mongoose.connect('mongodb://localhost:27017/master',
		{useNewUrlParser:true} )


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

var MemberVO = require('./models/MemberVO')

// controller 등록
require('./com.biz/controller/crudController.js')(app,MemberVO)

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
