const express = require('express');
const router = express.Router();
const User = require('../models/users');
const Food = require('../models/foods');
const bcrypt = require('bcryptjs');
const requireLogin = require('../middleware/requireLogin');


// New user route
router.get('/new', (req, res) => {
    res.render('auth/login.ejs');
});

router.post('/', async (req, res)=>{
    try{
    const hashedPassword = await bcrypt.hash(req.body.password, await bcrypt.genSalt(12));
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

// Show/edit profile route (will also show all the foods you've swiped right for -
// add foods in this route)
router.get('/:id', requireLogin, async (req, res, next) =>{
    try {
    const foundUser = await User.findById(req.params.id).populate('userFoods');
    console.log(foundUser);
    res.render('users/profile.ejs', {
        user: foundUser
        });
    }catch(err){
        next(err)
    }
});

// Edit user
router.put('/:id', async (req, res) => {
    try{
    await User.findByIdAndUpdate(req.params.id, req.body)
    console.log(User.username)
      res.redirect(`/user/${req.params.id}`);
    }catch(err){
        res.send(err);   
    }
});


// Delete User
router.delete('/:id', requireLogin, async (req, res) => {
    try{
        await User.findByIdAndDelete(req.params.id);
        res.redirect('/')
    } catch (err) {
        res.send(err);
    }
})

// Delete food from user array
router.delete('/foods/:id', async (req, res) => {
    try{
    const user = await User.findById(req.session.userId);
     await user.userFoods.splice(user.userFoods.indexOf(req.params.id), 1)
     await user.save()
     console.log(req.body);
     res.redirect(`/user/${req.session.userId}`)
    } catch (err) {
       res.send(err);
    }
})


module.exports = router;
