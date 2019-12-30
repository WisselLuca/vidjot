const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const app = express();

mongoose.Promise = global.Promise;

//Connect to mongoose
mongoose.connect('mongodb://localhost/vidjot-dev', {
    useNewUrlParser: true,
    seUnifiedTopology: true
})
    .then(()=>{
        console.log('MongoDb Connected')
    })
    .catch(err =>console.log(err));

//Load Idea Model
require('./models/Ideas');
const Idea = mongoose.model('ideas');

//HAndlebars Middleware
app.engine('handlebars', exphbs({
    defaultLayout:'main'
}));
app.set('view engine', 'handlebars');

//Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//How DEFAULT Middleware works
/*app.use(function(req, res, next){
    console.log(Date.now());
    req.name ='Luca';
    next();
})
*/

//Index Routing
app.get('/', (req, res) =>{
    const title = 'Welcome to the Page';
    res.render('index', {
        title : title
    });
});

//About Routing
app.get('/about', (req, res) =>{
    res.render('about');
});

//Idea index Page
app.get('/ideas', (req, res)=>{
    Idea.find({})
        .sort({date: 'desc'})
        .then(ideas =>{
            res.render('ideas/ideas' ,{
            ideas : ideas
            });
        })
});

//Add Idea Form
app.get('/ideas/add', (req, res) =>{
    res.render('ideas/add');
});

app.post('/ideas', (req, res) =>{
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
                res.redirect('/ideas');
            });
    }
});


const port = 5000;

app.listen(port, () =>{
    console.log('Server started on port ' + port);
    }
);