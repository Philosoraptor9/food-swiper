const mongoose = require('mongoose');
var foodSchema = mongoose.Schema({


const foodSchema = new mongoose.Schema({
    name:String,
    resName: String,
    img: String,
    location: String,
    rating: Number,
  	category: String
});


module.exports = mongoose.model('Food', foodSchema);;
