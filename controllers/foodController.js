const express = require('express');
const router = express.Router();
const Foods= require('../models/foods');


//Index Route
router.get('/', (req, res) => {
console.log(Foods);
      res.render('index.ejs', { foods:Foods});




});

//Detail/show route - i.e. specific food clicked



module.exports = router;
