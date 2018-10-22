const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
mongoose.set('useCreateIndex', true)


const port = 3000;

require('./db/db');

const authController = require('./controllers/authController');
const foodController = require('./controllers/foodController');
const userController = require('./controllers/userController');

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('short'));
app.use(express.static(__dirname + '/front'));
app.use(session({
  secret: 'shhhhhh',
  resave: false,
  saveUninitialized: false
}));

// These dictate the url paths

app.use('/auth', authController);

app.use('/food', foodController);

app.use('/user', userController);


app.get('/', (req, res) => {
    res.render('index.ejs');
  });


app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
  });
