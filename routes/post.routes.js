const express = require('express');
const router = express.Router();
const multer = require('multer');

const Post = require("../models/posts.models");
require('dotenv').config();

router.post("/newPost", async(req, res, next) => {
    try{
        const {titulo, area, variedad, fSiembra, fCosecha, prodEstimada } = req.body
        const newPost = Post({
            titulo,
            area,
            variedad,
            fSiembra,
            fCosecha,
            prodEstimada,
        })
        await newPost.save()
        res.send(newPost)
    }catch(err){
        next(err)
    }
})

router.get("/getPosts", async(req, res) =>{
    const posts = await Post.find()
    res.json(posts)
})

module.exports = router;