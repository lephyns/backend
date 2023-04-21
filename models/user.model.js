const mongoose = require('mongoose');

const Schema = mongoose.Schema

const userSchema = new Schema({
    fistName: String,
    lastName: String,
    email: String,
    password: String
});

module.exports = mongoose.model('User', userSchema);

//Importado o mongoose neste arquivo