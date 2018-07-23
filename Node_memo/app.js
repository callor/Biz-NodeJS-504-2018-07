var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')

var dbConn = mongoose.connection
dbConn.once('open',()=>{
	console.log('MongoDB OK!!')
})
dbConn.on('error',console.error)

mongoose.connect('mongodb://localhost:27017/memo',
		{useNewUrlParser:true})
var session = require('express-session')



// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

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

app.use(session({
	key : 'callor@callor.com',
	secret : '!aa1234',
	cookie : {
		maxAge : 1000 * 50
	},
	saveUninitialized : true,
	resave : true
}))

var models = require('./models/memoModels.js')
require('./controller/memoController.js')(app,models)
require('./controller/memberController.js')(app,models)

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
