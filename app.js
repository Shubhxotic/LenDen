var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');

var mongoose= require('mongoose');
mongoose.connect("mongodb://lendenuser:lenden@123@ds237389.mlab.com:37389/lenden");
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Including Routes files
var index = require('./routes/index');
var users = require('./routes/users');
var category=require('./routes/categories');

var app = express();

app.engine('handlebars', exphbs({
	defaultLayout: 'main',
	helpers: {
	    toJSON : function(object) {
	      return JSON.stringify(object, null, 4);
	    }
  	}
	})
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');


// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Assigning routes files
app.use('/', index);
app.use('/users', users);
app.use('/category',category);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
});


module.exports = app;

app.listen(3000,function(){
  console.log(' Server started on port 3000.....');
});
