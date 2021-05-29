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


let boardNum = 1;
let playerNum = 0;

//adres do bazy danych user + hasło (na atlasie w 'connect' dodać adres ip który może mieć dostęp do bazy danych)
const mongoUrl = "mongodb+srv://dbUser:zaq1@WSX@cluster0.0hul7.mongodb.net/database1?retryWrites=true&w=majority";
const client = new mongoClient(mongoUrl);

//klasa holes
const Holes = require('./modules/Holes.js');

 // The database to use
 const dbName = "test";
const dbOpers = require("./modules/MongoOperations.js")

// CLEAN UP
cleanUp()
async function cleanUp(){
    await client.connect();
    console.log("Connected correctly to server");
    let db = client.db(dbName);
    let col = db.collection("boards");
    dbOpers.SelectAllFromDatabase(col)
    dbOpers.DeleteAll(col)
    dbOpers.SelectAllFromDatabase(col)
}

// let db = client.db(dbName);
// let col = db.collection("boards");
// dbOpers.DeleteAll(col);


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
app.get('*', (req, res) => {
    res.send({error: "No routes matched"});
    res.end();
})


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

                    let db = client.db(dbName);
                    // Use the collection "boards"
                    let col = db.collection("boards");
                    // Construct a document
                    let boardDoc = {
                        "board": boardNum,
                        "holes": new Holes(),
                        "gracz1": 0,
                        "gracz2": 0
                    }
                    // Insert a single document, wait for promise so we can read it back
                    let p = await col.insertOne(boardDoc);
                    // Find one document
                    let myDoc = await col.findOne();
                    // Print to the console
                    // console.log(myDoc);
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

        //baza
        let db = client.db(dbName)
        let col = db.collection("boards")

        //pobranie starych danych
        dbOpers.SelectAndLimit(col,'board: '+message['board'],(info)=>{
            console.log('info')
            // console.log(info)

            let oldData = info[0]['holes']
            let playerPoints = info[0]['gracz'+message['player']]

            //podmiana danych na nowe
            let jump = oldData['hole'+message['doc']]
            oldData['hole'+message['doc']] = 0

            for(let r=1;r<=jump;r++){
                let jumpNum = parseInt(message['doc'])+r
                if(jumpNum>12){
                    jumpNum -= 12
                }
                oldData['hole'+jumpNum] += 1

                //przekazanie punktów graczowi
                if(r==jump){
                    if(oldData['hole'+jumpNum]%2==0){
                        playerPoints += oldData['hole'+jumpNum];
                        oldData['hole'+jumpNum] = 0;
                    }
                }
            }
            // console.log(oldData)
            // console.log(playerPoints)

            //wysłanie danych do bazy
            console.log(message)
            // console.log(message['board'])
            dbOpers.UpdateHoles(col,parseInt(message['board']),oldData)
            if(message['player']==1){
                col.updateOne({ board: parseInt(message['board']) },{ $set: { gracz1: playerPoints } })
            }
            else{
                col.updateOne({ board: parseInt(message['board']) },{ $set: { gracz2: playerPoints } })
            }
        })
        // emit to all
        dbOpers.SelectAndLimit(col,'board: '+message['board'],(info)=>{
            console.log('poejfeoninfi')
            io.emit('message', {holes: info[0]['holes'],
                                player1: info[0]['gracz1'],
                                player2: info[0]['gracz2']})
            // console.log({holes: info[0]['holes'],
            //             player1: info[0]['gracz1'],
            //             player2: info[0]['gracz2']})
        })
        // io.emit('message',message)
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
