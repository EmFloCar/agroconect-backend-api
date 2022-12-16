const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    titulo: String,
    area: Number,
    variedad: String,
    fSiembra: Date,
    fCosecha: Date,
    prodEstimada: String
})

const Post = mongoose.model("Post", postSchema);
module.exports = Post