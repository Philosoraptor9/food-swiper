const express = require('express');
const router = express.Router();
const User = require('../models/users');
const Food = require('../models/foods');
const bcrypt = require('bcryptjs');
const requireLogin = require('../middleware/requireLogin');


// On Login -- put edit user on same page?? Or include link to edit page/partials navbar
router.get('/', requireLogin, async (req, res) => {
try {
    const foundUser = await User.findById(req.session.userId);
    res.render('users/profile.ejs', {
        user: foundUser
        });
    }catch(err){
        res.send(err)
    }
})

// New user route
router.get('/new', (req, res) => {
    res.render('auth/login.ejs');
});

router.post('/', async (req, res)=>{
    console.log(req.body.food);
     try{
     // console.log(req.body);
     const hashedPassword = await bcrypt.hash(req.body.password, await bcrypt.genSalt(12));
     // console.log(hashedPassword);
     const newUser = {
         username: req.body.username,
         password: hashedPassword
     }
     const user = await User.create(newUser);
     req.session.userId = user._id;
     res.redirect('./index')
     }catch(err){
         res.send(err);
     }
 })

// Show/edit profile route (will also show all the foods you've swiped right for)
router.get('/:id', requireLogin, async (req, res) =>{
    try {
    const foundUser = await User.findById(req.session.userId);
    res.render('users/profile.ejs', {
        user: foundUser
        });
    }catch(err){a
        res.send(err)
    }
});

// Edit user

// Delete User
router.delete('/:id', requireLogin, async (req, res) => {
    try{
    const user = User.findByIdAndDelete(req.params.id);
        for (let i = 0; user.reviews.length; i++) {
            await Review.findByIdAndDelete(user.reviews[i]._id)
        }
        for (let i = 0; user.foods.length; i++) {
            await Food.findByIdAndDelete(user.foods[i]._id)
        }
        await User.findByIdAndDelete(req.params.id);
        res.redirect('/')
    } catch (err) {
        res.send(err);
    }
})



module.exports = router;
