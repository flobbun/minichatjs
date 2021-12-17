// Schemas
const Message = require('./models/message');

module.exports = (io) => {
    io.on('connection', (socket) => {
        io.sockets.emit('user count', io.engine.clientsCount);

        socket.on('chat message', async (data) => {
            const { username, message } = data;
            await new Message({username, message}).save();
            io.sockets.emit('chat message', data); //Retransmitiendo el mensaje a todos los clientes
            console.log(`New message from ${data.username} [${socket.id}]`);
        });

        socket.on('login', async (data) => {
            socket.username = data.username;
            io.sockets.emit('login success', {
                username: data.username,
                chat_history: await Message.find({}).limit(8)
            });
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