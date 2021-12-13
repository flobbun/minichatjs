const express = require('express');
const http = require('http');
const app = express();
const path = require('path');
const socketio = require('socket.io');

// Environment variables
const port = process.env.PORT || 3000;

// Express configuration
app.use(express.static(path.join(__dirname, 'public')));

// Server creation
const server = http.createServer(app);
const io = socketio(server);
require('./sockets')(io);


server.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});