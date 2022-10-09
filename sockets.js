import { AuthService } from './services/auth.service.js';
import { LogsService } from './services/logs.service.js';
import { MessagingService } from './services/messaging.service.js';

export class Sockets {

    socket;
    io;

    constructor(socket, io){
        this.socket = socket;
        this.io = io;
        this.events(socket, io);
    }

    events(socket, io) {
        this.socket.on('chat message', (data) => MessagingService.createMessage(data, socket, io));
        this.socket.on('error', () => this.onError(this.socket));
        this.socket.on('login', (data) => AuthService.login(data, this.socket, this.io));
        this.socket.on('disconnect', () => this.onDisconnect(this.socket, this.io));
    }

    onError(socket) {
        LogsService.log(`Client error [${socket.id}]`, 'info');
    }

    onDisconnect(socket, io) {
        socket.emit('user disconnected');
        socket.emit('user count', io.engine.clientsCount);
        LogsService.log(`Client disconnected [${socket.id}]`, 'info');
    }

}