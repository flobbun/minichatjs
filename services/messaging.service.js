import Message from '../models/message.js';
import { LogsService } from './logs.service.js';

class MessagingService {

    maxMessages = 10;

    async cleanMessages() {
        const count = await Message.countDocuments();
        LogsService.log(`${count}/${this.maxMessages} messages in database`, count > this.maxMessages - 3 ? 'warn' : 'info');
        if(count >= this.maxMessages){
            await Message.deleteMany({});
            LogsService.log('History cleaned', 'info');
        }
    }

    async createMessage(data, socket, io) {
        await new Message(data).save();
        io.sockets.emit('chat message', data);
        LogsService.log(`New message from ${data.username} [${socket.id}]`, 'info');
    }
}

const messagingService = new MessagingService();
export { messagingService as MessagingService };