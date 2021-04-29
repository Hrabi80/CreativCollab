const createError = require('http-errors');
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const connectdb = require('./config/db');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const auth = require('./routes/auth');

const app = express();

dotenv.config({ path: './config/config.env'});

//db connection 
connectdb();


//passport config
require('./config/passport')(passport);

app.use(express.json());
app.use(cookieParser());

//session 
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store : new MongoStore({mongooseConnection: mongoose.connection })
}));  

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth',auth);

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

// listner 
const PORT = process.env.PORT || 5000;
  app.listen(PORT , console.log(`server started on port ${PORT}`));

module.exports = app;
