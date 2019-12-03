const express = require('express');
const app = express();

//How Middleware works



//Index Routing
app.get('/', (req, res) =>{
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