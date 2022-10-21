//Package Imports
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config();

//Route Import
const auth = require('./routes/auth');

//Middleware
app.use(express.json());

//DB connection
mongoose.connect(
    "mongodb://localhost:27017/authentication",
    () => {
        console.log("Database is connnected succesfully")
    }
)

//Route Middleware
app.use('/api/user', auth);

app.listen(5000);
