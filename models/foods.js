const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema ({
    foodName: {type: String, required: true},
    restaurantName: {type: String, required: true},
    image: {type: String, required: true},
    location: {type: String},
    category: {type: String},
    rating: {type: Number},
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}]
})

module.exports = mongoose.model('Food', foodSchema);