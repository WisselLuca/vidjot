const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Load Idea Model
//require('../models/Ideas');
//const Idea = mongoose.model('ideas');

//User login Routes
router.get('/login', (req, res)=>{
    res.render('users/login');
});

//User login Routes
router.get('/register', (req, res)=>{
    res.render('users/register');
});


module.exports = router;
