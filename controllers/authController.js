const express = require('express');
const router = express.Router();
const User = require('../models/users');
// const Food = require('..models/foods');
const bcrypt = require('bcryptjs');

router.get('/login', async (req, res) => {
    res.render('auth/login.ejs', {message: req.session.message});
});

router.get('/register', async (req, res) => {
    res.render('auth/register.ejs', {message: req.session.message});
});

router.post('/register', async (req, res)=> {
    console.log(req.body);
    const password = req.body.password;
    const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(12));
    console.log(passwordHash)

    const userEntry = {};
    userEntry.username = req.body.username;
    userEntry.password = passwordHash;

    const user = await User.create(userEntry);
    console.log(user);
    // req.session.username = req.body.username;
    req.session.logged = true;
    req.session.message = '';
    res.redirect('/food');
});

router.post('/login', async (req, res)=> {
    try {
    const foundUser = await User.findOne({username: req.body.username});
    console.log(foundUser)

    if (foundUser){
        if (await bcrypt.compareSync(req.body.password, foundUser.password)){
            req.session.logged = true;
            req.session.userId = foundUser._id;
            res.redirect('/food');
            }
        else {
            req.session.message = 'incorrect username or password';
            res.redirect('/auth/login');
            }
        }
    else{
        req.session.message = 'username or password is incorrect';
        res.redirect('/auth/login');
        }
    }catch(err){
        console.log(err);
        res.send(err);
    }
});

router.get('/logout', (req, res)=> {
    req.session.destroy((err) => {
        if(err){
            res.send(err);
        } else {
            res.redirect('/auth/login');
        }
    });
});

module.exports = router;

