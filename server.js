const http  = require('http');
const express = require("express");
const path = require("path");

const hbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.static('static'));

app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' }));
app.set('view engine', 'hbs');


let context = {};

app.get('/', (req, res) => {
    res.render('index.hbs',context);
});

app.listen(PORT, ()=> {
    console.log('Server listening on  ' + PORT);
});
