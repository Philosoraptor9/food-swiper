const express = require("express");
const router = express.Router();
const User = require("../models/users");
const bcrypt = require('bcryptjs');

// future loggedIn function goes here
// we also make a variable out of future loggedIn user, call it loggedInUser

router.get('/', async (req, res) => {
    // try + catch goes here
    try {
        const foundUser = await User.findById(req.session.userId);
        res.render('users/index.ejs', {
            user: foundUser       
        });                        
    }catch(err){
        res.send(err);
    }
});

router.get('/new', async (req, res) => {
    res.render('users/new.ejs');
});

// user edit route
router.get('/edit', async (req, res) => {
    try {
        const foundUser = await User.findById(req.session.userId);
        res.render('users/edit.ejs', {
            user: foundUser
        });  
    }catch(err){
        res.send(err)                
    }
});

// user update/put route

// Delete Route
router.delete('/:id', async (req, res) => {
    try{
        const user = User.findByIdAndDelete(req.params.id);
            for (let i = 0; user.reviews.length; i++) {        
                await Review.findByIdAndDelete(user.reviews[i]._id)
        }   
        await User.findByIdAndDelete(req.params.id);
        res.redirect('/')                     
    } catch (err) {
        res.send(err);
    }    
})

router.post('/', async (req, res)=>{
    try{
        console.log(req.body);
        const hashedPassword = await bcrypt.hash(req.body.password, await bcrypt.genSalt(12));
        console.log(hashedPassword);
        const newUser = {
            username: req.body.username,
            password: hashedPassword
        }
        const user = await User.create(newUser);
        req.session.userId = user._id;
        res.redirect('/users')
    }catch(err){
        res.send(err);
    }
})



module.exports = router;