const express = require('express');
const app = express();
const expressSession = require('express-session');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

require('./db/db');

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan);

app.get('/', (req, res) => {
    res.render('index.ejs');
  });

app.listen(3000, () => {
    console.log('App is listening on port 3000');
  });