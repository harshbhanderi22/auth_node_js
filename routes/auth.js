const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('./validation');
const user = require('../models/user');

router.get('/register', (req, res) => {
    res.send('You are on Register page');
})

router.post('/register', async (req, res) => {

    //Validating Information
    const { error } = registerValidation(req.body)
    if (error)  return res.status(400).send(error.details[0].message)
    
    //Checking Email is already there or not 
    const EmailExists = await User.findOne({ email: req.body.email });
    if (EmailExists) return res.status(400).send("Email Already Exists");
    
    //Encrypting Password
    const salt = await bcrypt.genSalt(10);
    const HashedPassword = await bcrypt.hash(req.body.password, salt);

    //Creating user
    const user = await new User({
        name: req.body.name,
        email: req.body.email,
        password: HashedPassword
    })
    try {
        const saveUser = await user.save();
        res.send(saveUser)
        console.log(saveUser)
    }
    catch (err) {
        res.status(400).send(err)
    }
})

router.post('/login', async (req, res) => {
    
    //Validating data
    const {error} = await loginValidation(req.body);
    if (error)  return res.status(400).send(error.details[0].message)

    //Checking user exists or not
    const userEx = await User.findOne({ email: req.body.email });
    if (!userEx) return res.send("User does not exists");

    //Password validation
    const validpass = await bcrypt.compare(req.body.password, userEx.password);
    if (!validpass) return res.send("Invalid Password");

    const token = await jwt.sign({ _id: userEx._id }, process.env.TOKEN_SECRET);
    res.header('auth-token',token)
    res.send(token);


})
module.exports = router