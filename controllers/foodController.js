const express = require('express');
const router = express.Router();
const Foods= require('../models/foods');
const requireLogin = require('../middleware/requireLogin');
//^^ set a timer/message on this? Right now when used it immediately redirects back to the login page


//Index Route
router.get('/', (req, res) => {
console.log(Foods);
      res.render('index.ejs', {foods: Foods});

});

//Detail/show route - i.e. specific food clicked
router.get('/:id', (req, res) => {
      res.render('foods/detail.ejs', {foods: Foods.id})
});


module.exports = router;
