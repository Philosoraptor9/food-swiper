const express = require('express');
const router = express.Router();
const User = require('../models/users');

//Index Route
router.get('/', (req, res) => {
    res.render('foods/index.ejs');
})

//Detail/show route - i.e. specific food clicked
router.get('/:id', (req, res) => {
    res.render('foods/detail.ejs');
})


module.exports = router;