const express = require('express');
const router = express.Router();
const Food = require('../models/foods');
const requireLogin = require('../middleware/requireLogin');
//^^ set a timer/message on this? Right now when used it immediately redirects back to the login page


//Index Route - requireLogin
router.get('/', async (req, res) => {
     try{
      const food = await Food.find({});
      res.render('index.ejs', {food: food});
      } catch(err){
            res.send(err);
      }
});

//Detail/show route - i.e. specific food clicked - requireLogin
router.get('/:id', async (req, res) => {
     try{ const foundFood = await Food.findById(req.session.foodId);
      res.render('foods/detail.ejs', {food: foundFood})
      } catch(err){
            res.send(err);
      }
});



module.exports = router;
