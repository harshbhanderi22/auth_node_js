const express = require('express');
const router = express.Router();
const verify = require('./verifyToken');


//Verify will work as a middleware to verify token
router.get('/',verify, (req, res) => {
    res.send("We are on Post page");
})

module.exports = router;