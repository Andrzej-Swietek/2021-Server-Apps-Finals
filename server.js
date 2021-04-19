const http  = require('http');
const express = require("express");
const path = require("path");

const hbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.static('static'));

app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs({
    defaultLayout: 'main.hbs' ,
    helpers: {
        shortTitle: function (title) {
            return title.substring(0,10) +"...";
        },
        titledTitle: function (title) {
            return title.replace(/(^|\s)\S/g, function(t) { return t.toUpperCase() });
        },
        dashedTitle: (title) => {
            let new_str = ''
            title.split(' ').forEach( word => {
                for(let i=0; i< word.length; i++){
                    if( i !== word.length-1 ) { new_str += word[i] + "-"; }
                    else new_str += word[i] + "  ";
                }
            })

            return new_str;
        }
    }
}));
app.engine('hbs', hbs({
    extname: '.hbs',
    partialsDir: "views/partials",
}));


let context = {};

app.get('/', (req, res) => {
    res.render('index.hbs',context);
});

app.listen(PORT, ()=> {
    console.log('Server listening on  ' + PORT);
});
