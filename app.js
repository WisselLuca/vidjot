const express = require('express');
const app = express();

//How Middleware works
/*app.use(function(req, res, next){
    console.log(Date.now());
    req.name ='Luca';
    next();
})
*/

//Index Routing
app.get('/', (req, res) =>{
    //console.log(req.name);
    res.send('index');
});

//About Routing
app.get('/about', (req, res) =>{
    res.send('about');
});


const port = 5000;

app.listen(port, () =>{
    console.log('Server started on port ' + port);
    }
);