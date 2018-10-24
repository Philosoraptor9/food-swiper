const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    foods: [
    { type: mongoose.Schema.ObjectId, ref: 'Food' }
  ]

});

module.exports = mongoose.model('User', userSchema);
