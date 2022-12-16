const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    nombre: String,
    celular: Number,
    email: String,
    password: String,


})

const User = mongoose.model("User", userSchema);
module.exports = User;
