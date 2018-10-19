const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema ({
    name: {type: String, required: true},
    rating: {type: Number},
    location: {type: String},
    category: {type: String},
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}]
})

module.exports = mongoose.model('Food', foodSchema);