const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}]
});

module.exports = mongoose.model("User", userSchema);