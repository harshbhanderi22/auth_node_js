const express = require('express');
const router = express.Router();
const User = require('../models/user');
const {registerValidation} = require('./validation')

router.get('/', (req, res) => {
    res.send('You are on Right way');
})

router.post('/register', async (req, res) => {

    const { error } = registerValidation(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    else {
        const user = await new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        try {
            const saveUser = await user.save();
            console.log(saveUser)
        }
        catch (err) {
            res.status(400).send(err)
        }
    }
    
    
})

module.exports = router