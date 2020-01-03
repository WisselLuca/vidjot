const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');

//Load Idea Model
require('../models/User');
const User = mongoose.model('users');

//User login Routes
router.get('/login', (req, res)=>{
    res.render('users/login');
});

//User login Routes
router.get('/register', (req, res)=>{
    res.render('users/register');
});

router.post('/register', (req, res)=>{
    let errors=[];
    if(req.body.password != req.body.passwordConfirm){
        errors.push({text: 'The Passwords do not match'});
    }
    if(req.body.password.length < 4){
        errors.push({text: 'Password must be at least 4 characters'});
    }
    if(errors.length>0){
        res.render('users/register', {
            errors: errors,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm
        });
    }else{
        User.findOne({email:req.body.email})
            .then(user =>{
                if(user){
                    req.flash('error_msg', 'Email Already in Use');
                    res.redirect('/users/register');
                }else{
                    const newUser = User({
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password
                    });
                    bcrypt.genSalt(10, (err, salt)=>{
                        bcrypt.hash(newUser.password, salt, (err, hash)=>{
                            if(err) throw err;
                            newUser.password = hash;
                            newUser.save()
                                .then(user =>{
                                    req.flash('success_msg', 'Regstration Compleated');
                                    res.redirect('/users/login');
                                })
                                .catch(err=>{
                                    console.log(err);
                                    return;
                                })
                        });
                    });
                }
        });
    }
});

//login Form post
router.post('/login', (req, res, next)=>{
   passport.authenticate('local', {
       successRedirect: '/ideas',
       failureRedirect: '/users/login',
       failureFlash: true
   })(req, res, next);
});

//Logout User
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You have been logged out');
    res.redirect('/');
});


module.exports = router;
