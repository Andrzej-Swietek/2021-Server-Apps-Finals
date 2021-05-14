const http  = require('http');
const path = require("path");
const express = require("express");
const socketio = require("socket.io");
const mongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const hbs = require('express-handlebars');

const app = express();
const server = http.createServer(app);
const io = socketio(server)
const PORT = process.env.PORT || 3000;
var boardNum = 1;
var playerNum = 0;

//adres do bazy danych user + hasło (na atlasie w 'connect' dodać adres ip który może mieć dostęp do bazy danych)
const mongoUrl = "mongodb+srv://dbUser:zaq1@WSX@cluster0.0hul7.mongodb.net/database1?retryWrites=true&w=majority";
const client = new mongoClient(mongoUrl);

//klasa holes
class Holes {
    constructor(hole1 = 4, hole2 = 4, hole3 = 4, hole4 = 4, hole5 = 4, hole6 = 4, hole7 = 4, hole8 = 4, hole9 = 4, hole10 = 4) {
        this.hole1 = hole1;
        this.hole2 = hole2;
        this.hole3 = hole3;
        this.hole4 = hole4;
        this.hole5 = hole5;
        this.hole6 = hole6;
        this.hole7 = hole7;
        this.hole8 = hole8;
        this.hole9 = hole9;
        this.hole10 = hole10;
    }
  }
 // The database to use
 const dbName = "test";
             
const dbOpers = require("./modules/MongoOperations.js")

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

    socket.on('getNum', ()=>{
            //stworzenie kolekcji w bazie danych i wysłanie graczom planszy
        playerNum +=1;
        if(playerNum % 2 == 0){
            //wysłanie do gracza jego numeru oraz planszy na której gra (później będzie można się odnieść do bazy przez te numery)
            io.emit('playerNum',[playerNum,boardNum])
            playerNum = 0;
            boardNum += 1;
        }
        else{
            async function run() {
                try {
                    await client.connect();
                    console.log("Connected correctly to server");
                    let db = client.db(dbName);
                    // Use the collection "people"
                    let col = db.collection("boards");
                    // Construct a document                                                                                                                                                              
                    let boardDoc = {
                        "board": boardNum,
                        "holes": new Holes(),                                                                                                                                
                        "gracz1": 1,
                        "gracz2": 2   
                    }
                    // Insert a single document, wait for promise so we can read it back
                    let p = await col.insertOne(boardDoc);
                    // Find one document
                    let myDoc = await col.findOne();
                    // Print to the console
                    console.log(myDoc);
                    } catch (err) {
                    console.log(err.stack);
                }        
            }
            run().catch(console.dir);
            //wysłanie do gracza jego numeru oraz planszy na której gra (później będzie można się odnieść do bazy przez te numery)
            io.emit('playerNum',[playerNum,boardNum])
        }
    })

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
