const express = require('express');
const app = express();
const mongoose = require('mongoose');
const expressSession = require('express-session');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const bcrypt = require('bcryptjs');
mongoose.set('useCreateIndex', true)


const port = 3000;

require('./db/db');

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({useNewUrlParser: true}));
app.use(morgan('short'));


const authController = require('./controllers/authController');
app.use('/authController', authController);

const foodController = require('./controllers/foodController');
app.use('/foodController', foodController);

const userController = require('./controllers/userController');
app.use('/userController', userController);


app.get('/', (req, res) => {
    res.render('index.ejs');
  });

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
  });