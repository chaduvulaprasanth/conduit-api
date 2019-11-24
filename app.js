var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");

var app = express();

// connect to local mongo server
mongoose.connect("mongodb://localhost/conduit-api",
{useNewUrlParser: true,useUnifiedTopology: true }, 
(err)=> {
  console.log("Connected",err ? false : true);
})

// handling routes
var usersRouter = require('./routes/users');
var userRouter = require('./routes/user');
var profilesRouter = require('./routes/profiles');
var articlesRouter = require('./routes/articles');
var tagsRouter = require('./routes/tags');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes middleware
app.use('/api/users', usersRouter);
app.use('/api/user', userRouter);
app.use('/api/profiles', profilesRouter);
app.use('/api/articles', articlesRouter);
app.use('/api/tags', tagsRouter);





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
