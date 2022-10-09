import express from 'express';
import { createServer } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { connect } from 'mongoose';
import config from './config.js';
import { MessagingService } from './services/messaging.service.js';
import { LogsService } from './services/logs.service.js';
import { logger } from './middlewares/logger.middleware.js';
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
        this.start();
    }

    config() {
        this.app.use(express.static(path.join(__dirname, 'public')));
    }

    routes() {
        this.app.all('*', logger);
        this.app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
    }

    start() {
        this.io = new socketIO(this.server);
        this.server.listen(config.PORT, this.onServerListening);
        this.io.on('connection', (socket) => {
            this.socket = socket;
            LogsService.log(`New client connected [${socket.id}]`, 'info');
            new Sockets(socket, this.io);
        })
        connect(config.MONGODB_URI[config.NODE_ENV]).then(this.onDatabaseConnected).catch(err => LogsService.log(err, 'error'));
    }

    onDatabaseConnected() {
        MessagingService.cleanMessages();
        LogsService.log('Connected to MongoDB', 'info');
    }

    onServerListening() {
        LogsService.log(`Listening on port ${config.PORT}`, 'info')
    }
}

const server = new Server();
export { server as Server };