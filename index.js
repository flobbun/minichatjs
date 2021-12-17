// Libs
const express = require('express');
const http = require('http');
const app = express();
const path = require('path');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const Message = require('./models/message');
const config = require('./config');

// Vars
const max_messages = 10;

// Environment variables
console.log('CONFIG: ');
console.log(config.MONGODB_URI[config.NODE_ENV]);

// Express configuration
app.use(express.static(path.join(__dirname, 'public')));

// Server creation
server = http.createServer(app);
const io = socketio(server);
require('./sockets')(io);

// Database connection
mongoose.connect(config.MONGODB_URI[config.NODE_ENV]).then(db => {
    cleanDB();
    console.log('Connected to MongoDB');
}).catch(err => console.log(err));

// Chat history cleanup
function cleanDB(){
    Message.countDocuments().then(count => {
        console.log(`${count} messages/${max_messages} in database`);
        if(count > max_messages){
            Message.deleteMany({}).then(() => console.log('History cleaned'));
        }
    });
}
server.listen(config.PORT, () => console.log(`Listening on port ${config.PORT}`));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));