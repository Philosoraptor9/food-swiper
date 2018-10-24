const mongoose = require('mongoose');
var foodSchema = mongoose.Schema({

    name:String,
    resName: String,
    img: String,
    location: String,
    rating: Number,
  	category: String

});


module.exports = mongoose.model('Food', foodSchema);;
