const express = require('express');
const path =require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');

const app = express();
//load routes
const ideas = require('./routes/ideas');
const users = require('./routes/users');

//Passport Config
require('./config/passport')(passport);

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

//Handlebars Middleware
app.engine('handlebars', exphbs({
    defaultLayout:'main'
}));
app.set('view engine', 'handlebars');
//Method Override Middlware to use a put or delete in forms
app.use(methodOverride('_method'));

//Session Middleware
app.set('trust proxy', 1); // trust first proxy
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//middleware for flash
app.use(flash());

//Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//middleware for path
app.use(express.static(path.join(__dirname, 'public')));


//Global Variables
app.use(function (req, res, next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

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

//use routes
app.use('/ideas', ideas);
app.use('/users', users);

const port = 5000;

app.listen(port, () =>{
    console.log('Server started on port ' + port);
    }
);