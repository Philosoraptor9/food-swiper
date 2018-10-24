const express = require('express');
const router = express.Router();
var Food= require('../models/foods');

//Index Route
router.get('/', async(req, res) => {
      const food = await Food.find({});
      res.render('index.ejs', { food:food});



});




module.exports = router;
