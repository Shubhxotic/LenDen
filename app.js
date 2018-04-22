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

<<<<<<< HEAD
//app.use('/sayHello', router);


// Including Routes files
var email = require('./routes/email');
var index = require('./routes/index');
var users = require('./routes/users');
var category=require('./routes/categories');
var Subcategory = require('./routes/subcategories');
var Product = require('./routes/products');
var Parameters = require('./routes/parameters');

=======
>>>>>>> 9a9e7b9b5e6044e116ecda0a2477b91571b38853
var app = express();

app.engine('handlebars', exphbs({
  extname: 'handlebars',
  defaultLayout: __dirname+'/views/layouts/main',
  layoutsDir: path.join(__dirname,'views/layouts/'),
  partialsDir: [path.join(__dirname,'views/partials/')],
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
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use("/static",express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));



// Including Routes files
var index = require('./routes/index');
var users = require('./routes/users');
var category=require('./routes/categories');
var Subcategory = require('./routes/subcategories');
var Product = require('./routes/products');
var Parameters = require('./routes/parameters');

// Assigning routes files
app.use('/', index);
app.use('/Users', users);
app.use('/Category',category);
app.use('/Subcategory',Subcategory);
app.use('/Product',Product);
app.use('/Parameters',Parameters);
app.use('/email',email);

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
