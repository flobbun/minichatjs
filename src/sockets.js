module.exports = function(io){
    io.on('connection', (socket) => {
        io.sockets.emit('user count', io.engine.clientsCount);

        socket.on('chat message', (data) => {
            io.sockets.emit('chat message', data); //Retransmitiendo el mensaje a todos los clientes
            console.log(`New message from ${data.username} [${socket.id}]`);
        });

        socket.on('login', (data) => {
            socket.username = data.username;
            io.sockets.emit('login success', {username: data.username});
            console.log(`${data.username} [${socket.id}] has logged in`);
        });

        socket.on('disconnect', () => {
            io.sockets.emit('user disconnected');
            io.sockets.emit('user count', io.engine.clientsCount);
            console.log(`Client disconnected [${socket.id}]`);
        });
    
        socket.on('error', () => {
            console.log(`Client error [${socket.id}]`);
        });

        console.log(`New client connected [${socket.id}]`);
    });
}