const http  = require('http');
const path = require("path");
const express = require("express");
const socketio = require("socket.io");

const hbs = require('express-handlebars');

const app = express();
const server = http.createServer(app);
const io = socketio(server)
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

// SOCKET IO
io.on('connection', socket =>{
    console.log("New WS Connection Established");
    socket.emit('message','Welcome to Wuri the game'); // only connecting user
    socket.broadcast.emit('message','User has joined the game'); // all but connecting user
    // io.emit() // all the clients

    socket.on('disconnect', ()=>{
        io.emit('message','User Disconnected')
    });

    // LISTEN FOR PLAYER MOVE
    socket.on('playerMover', (message) => {
        console.log(message)
        // emit to all
        io.emit('message', message)
    })

    socket.on('chatMessage', (message) => {
        console.log("%c Chat message: "+message, 'color: orange')
        // emit to all
        io.emit('chatMessage', message)
    })
});

// app.listen(PORT, ()=> {
//     console.log('Server listening on  ' + PORT);
// });
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
