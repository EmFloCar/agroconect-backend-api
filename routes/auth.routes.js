const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

const User = require("../models/users.models");
require('dotenv').config;

router.get("/", async(req, res) =>{
    const users = await User.find()
    console.log(users)
})

router.post("/signup", async (req, res) => {
    const {nombre, celular, email} = req.body;

    const emailExist = await User.findOne({email})
    if(emailExist) return res.status(400).send("Este correo ya está registrado")


    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(req.body.password, salt)
    const newUser = User ({nombre, celular, email, password})

    await newUser.save((err)=>{
        if(err){
            console.log(err)
            res.status(400).send('Error al registrar el usuario')
        } else{
            res.status(200).send('Usuario registrado con exito');
        }
    })
})

router.post("/login", async(req, res, next)=>{
    const {email, password} = req.body;
    User.findOne({email}, (err, user) =>{
        if(err){
            res.status(500).send("Error en el servidor");
        }else if(!user){
            res.status(400).send("El usuario no existe")
        }else{
            bcrypt.compare(password, user.password, (err, isMatch)=>{
                if(err){
                    res.status(500).send("Error en el servidor")
                }else if(!isMatch){
                    res.send("Usuario o contraseña incorrecta")
                }else{
                    jwt.sign({user: user.email}, process.env.JWT_KEY, (err, token)=>{
                        if(err) throw (err);
                        res.status(200).send({
                            message:  'sesion iniciada con exito',
                            nombre: user.nombre,
                            id: user._id,
                            token: token
                            
                        })
                    })
                }
            })
        }
    })

})

module.exports = router;