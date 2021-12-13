module.exports = function(io){
    io.on('connection', (socket) => {
        console.log(`New client connected [${socket.id}]`);

        socket.on('chat message', (data) => {
            io.sockets.emit('chat message', data); //Retransmitiendo el mensaje a todos los clientes
            console.log(`New message from ${data.username} [${socket.id}]`);
        });
    
        socket.on('disconnect', () => {
            console.log(`Client disconnected [${socket.id}]`);
        });
    
        socket.on('error', () => {
            console.log(`Client error [${socket.id}]`);
        });
    });
}