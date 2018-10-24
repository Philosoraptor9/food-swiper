<<<<<<< HEAD
const express = require('express');
const router = express.Router();
var Food= require('../models/foods');

//Index Route
router.get('/', async(req, res) => {
      const food = await Food.find({});
      res.render('index.ejs', { food:food});



});




module.exports = router;
=======
const express = require('express');
const router = express.Router();
const Foods= require('../models/foods');
const requireLogin = require('../middleware/requireLogin');
//^^ set a timer/message on this? Right now when used it immediately redirects back to the login page


//Index Route
router.get('/', (req, res) => {
console.log(Foods);

      res.render('index.ejs', { foods:Foods});




=======
      res.render('index.ejs', {foods: Foods});

});

//Detail/show route - i.e. specific food clicked
router.get('/:id', (req, res) => {
      res.render('foods/detail.ejs', {foods: Foods.id})
});


module.exports = router;
>>>>>>> 550ab1ac685e24b085d2e9c6920cb70381d11e68
