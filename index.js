import express from 'express';
import { createServer } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { connect } from 'mongoose';
import config from './config.js';
import { MessagingService } from './services/messaging.service.js';
import { LogsService } from './services/logs.service.js';
import { logger, socketLogger } from './middlewares/logger.middleware.js';
import { Server as socketIO } from 'socket.io';
import { Sockets } from './sockets.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Server {

    app = express();
    server = createServer(this.app);
    io;
    socket;

    constructor() {
        this.config();
        this.routes();
        this.start().catch(error => LogsService.log(error, 'error'));
    }

    config() {
        this.app.use(express.static(path.join(__dirname, 'public')));
    }

    routes() {
        this.app.all('*', logger);
        this.app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
    }

    async start() {
        try {
            this.io = new socketIO(this.server);
            this.io.use(socketLogger);
            this.server.listen(config.PORT, this.onServerListening);
            this.io.on('connection', (socket) => {
                this.socket = socket;
                const sockets = new Sockets(socket, this.io);
                sockets.onConnected(this.socket, this.io);
            })
            await connect(config.MONGODB_URI[config.NODE_ENV]);
            MessagingService.cleanMessages(socket, this.io);
            LogsService.log('Connected to MongoDB', 'info');
        } catch (error) {
            LogsService.log(error, 'error');
        }
    }

    onServerListening() {
        LogsService.log(`Listening on port ${config.PORT}`, 'info')
    }
}

const server = new Server();
export { server as Server };