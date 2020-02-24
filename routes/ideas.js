const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {ensureAuthenticated} = require('../helper/auth');
//Load helper

//Load Idea Model
require('../models/Ideas');
const Idea = mongoose.model('ideas');

router.get('/', ensureAuthenticated,  (req, res)=>{
    Idea.find({})
        .sort({date: 'desc'})
        .then(ideas =>{
            res.render('ideas/ideas' ,{
                ideas : ideas
            });
        })
});

//Add Idea Form
router.get('/add', ensureAuthenticated, (req, res) =>{
    res.render('ideas/add');
});

//Edit Idea Form
router.get('/edit/:id', ensureAuthenticated, (req, res) =>{
    Idea.findOne({
        _id: req.params.id
    })
        .then(idea =>{
            res.render('ideas/edit', {
                idea:idea
            });
        });
});

router.post('/', ensureAuthenticated, (req, res) =>{
    let errors = [];
    if(!req.body.title){
        errors.push({text: 'Please add a title!'});
    }
    if(!req.body.detail){
        errors.push({text: 'Please add a detail!'});
    }
    if(errors.length>0){
        res.render('ideas/add', {
            errors : errors,
            title: req.body.title,
            detail: req.body.detail
        });
    }else{
        const newUser= {
            title: req.body.title,
            detail : req.body.detail
        };
        new Idea(newUser)
            .save()
            .then(idea =>{
                req.flash('success_msg', 'The idea has been added');
                res.redirect('/ideas');
            });
    }
});

//Edit Form process
router.put('/:id', ensureAuthenticated,  (req, res)=>{
    Idea.findOne({
        _id: req.params.id
    })
        .then(idea =>{
            //new Values
            idea.title = req.body.title;
            idea.detail = req.body.detail;

            idea.save()
                .then(idea => {
                    req.flash('success_msg', 'The idea has been edited');
                    res.redirect('/ideas')
                })
        });
});

//Delete Form process
router.delete('/:id', (req, res)=>{
    Idea.remove({_id: req.params.id})
        .then(() =>{
            req.flash('success_msg', 'The idea has been removed');
            res.redirect('/ideas')
        });
});

module.exports = router;


