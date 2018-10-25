const mongoose = require('mongoose');



const foodSchema = new mongoose.Schema({
    name:String,
    resName: String,
    img: String,
    location: String,
    rating: Number,
  	category: String
});


module.exports = mongoose.model('Food', foodSchema);;
