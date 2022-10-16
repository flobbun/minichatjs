import Message from '../models/message.js';
import { LogsService } from './logs.service.js';

class AuthService {

    async login({ username }, socket, io) {
        socket.username = username;
        socket.emit('login success', { username, chat_history: await Message.find({}).limit(8) });
        LogsService.log(`${username} [${socket.id}] has logged in`, 'info');
    }

}

const authService = new AuthService();
export { authService as AuthService };