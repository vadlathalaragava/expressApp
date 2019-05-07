var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var dashboardRouter = require('./routes/dashboard');
var aboutusRouter = require('./routes/aboutus');
var customerRouter = require('./routes/customer');

//api routes
var authenticateRouter = require('./api/authenticate');
var customersRouter = require('./api/customers');

var app = express();

//secret
var sess = {
  secret: '66t6tvcf4562bged',
  resave: true,
  saveUninitialized: true,
  cookie: {}
}
app.use(session(sess));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', loginRouter);
app.use('/login', loginRouter);
app.use('/api/authenticate', authenticateRouter);

app.use(function(req,res,next){
	console.log("Hello to Express.JS::"+req.originalUrl);
	if(req.session.user){
		next();
	}else if (req.originalUrl.startsWith("/api")){
		res.send({result:'fail', code:401, msg:"not authorized"});
	}	else{
		res.redirect('/login');
	}
});
app.use('/dashboard', dashboardRouter);
app.use('/aboutus', aboutusRouter);
app.use('/customers', customerRouter);
app.use('/api/customers', customersRouter);

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
