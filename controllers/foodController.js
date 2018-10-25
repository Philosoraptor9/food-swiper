
const express = require('express');
const router = express.Router();
const Food = require('../models/foods');
const User = require('../models/users');
const requireLogin = require('../middleware/requireLogin');
//^^ set a timer/message on this? Right now when used it immediately redirects back to the login page


//Index Route - requireLogin
router.get('/', requireLogin, async (req, res) => {
     try{
      const food = await Food.find({});
      res.render('index.ejs', {food: food});
      } catch(err){
            res.send(err);
      }
});

//Detail/show route - i.e. specific food clicked - requireLogin
router.get('/:id', requireLogin, async (req, res) => {
     try{
      const foundFood = await Food.findById(req.session.foodId);
      res.render('foods/detail.ejs', {food: foundFood})
      } catch(err){
            res.send(err);
      }
});

//Index Route - requireLogin
router.get('/', requireLogin, async (req, res) => {
     try{
      const food = await Food.find({});
      res.render('index.ejs', {food: food});
      } catch(err){
            res.send(err);
      }
});

//Detail/show route - i.e. specific food clicked - requireLogin
router.get('/:id', requireLogin, async (req, res) => {
     try{
      const foundFood = await Food.findById(req.params.foodId);
      res.render('foods/detail.ejs', {food: foundFood})
      } catch(err){
            res.send(err);
      }
});

// Post swiped food to user
router.post('/:id/like', async (req, res)=> {
      try {
        console.log(req.params);
      const user = await User.findById(req.session.userId);
      console.log(user.userFoods);
      await  user.userFoods.push(req.params.id);

      await user.save();

      res.json(user);
      } catch(err){
            res.send(err);
      }

});

// Delete route


module.exports = router;
