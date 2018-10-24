//Back-end stuff
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true)

require('./db/db');


//Regular middleware
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');


//Session middleware
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
// const passport = require('passport');
// const localStrategy = require('passport-local').Strategy;
// const passportJWT = require('passport-jwt');
// const JWTStrategy = passportJWT.Strategy;


// app.use middleware
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('short'));
app.use(express.static(__dirname + '/front'));
// app.use(passport.initialize());
// app.use(passport.session());

const store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/connect_mongodb_session_test',
  collection: 'mySessions'
});

store.on('connected', function() {
  store.client; // The underlying MongoClient object from the MongoDB driver
});
 
// Catch errors
store.on('error', function(error) {
  console.log(error);
});

app.use(session({
  secret: 'shhhhhh',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  },
  store: store,
  resave: true,
  saveUninitialized: true
}));

app.use((req, res, next)=>{
  if(req.session.message){
    res.locals.message = req.session.message;
    delete req.session.message;
  }
  next();
})
// ^^ will send messages to the user that only last for 1 page refresh, err.message to send error messages
// app.use() user on this page to get their info if they're logged in

app.use(async (req, res, next) =>{
res.locals.user = req.session.user || {};
next()
});

//Require models
const User = require('./models/users');
const Foods= require('./models/foods');

// Controllers
const authController = require('./controllers/authController');
const foodController = require('./controllers/foodController');
const userController = require('./controllers/userController');

// These dictate the url paths
app.use('/auth', authController);
app.use('/food', foodController);
app.use('/user', userController);


app.get('/', (req, res) => {
    res.render('auth/login.ejs');
  });

const port = 3000;

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
  });
