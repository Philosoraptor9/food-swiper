const express = require("express");
const router = express.Router();
const User = require("../models/users");
const bcrypt = require('bcryptjs');

router.get('/login', async (req, res) => {
    res.render('users/login.ejs');
});

// router.post('/login', async (req, res)=> {
//     try {
//         const foundUser = await User.findOne(req.session.username);
//         if (foundUser){
//             if (await bcrypt.compare(req.body.password, foundUser.password)){
//                 req.session.logged = true;
//                 req.session.userId = foundUser._id;
//                 res.redirect('./index')
//             }
//             else {
//                 req.session.message = 'incorrect username or password';
//                 res.redirect('/auth/login')
//             }
//         }
//         else{
//             req.session.message = 'username or password is incorrect';
//             res.redirect('./index');
//         }
//     }catch(err){
//         console.log(err);
//         res.send(err);
//     }
// });

module.exports = router;

