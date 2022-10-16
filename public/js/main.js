"use strict";

import { Message, Welcome } from './elements.js';
import { createElement, removeAllChildren } from './lib.js';
import { Commands } from './commands.js';

class Main {
    socket = io();

    form = document.querySelector('#chat-form');
    messageField = this.form.querySelectorAll('.message')[0];
    messages = document.querySelector('#messages');

    constructor() {
        this.events();
    }

    events() {
        this.messageField.onkeydown = (e) => this.onSubmit(e, 'enter');
        this.form.addEventListener('submit', (e) => this.onSubmit(e, 'button'));
        this.socket.on('chat message', (data) => this.onMessage(data));
        this.socket.on('user count', (amount) => this.onCount(amount));
        this.socket.on('chat cleaned', () => this.onChatCleaned(this.messages));
        setInterval(() => this.staffBot(), 60_000);
    }

    requestPing() {
        const initialTime = Date.now();

        this.socket.emit("ping", () => {
            const finalTime = Date.now();
            Commands.botMsg(`Ping: <b>${finalTime - initialTime}ms</b>`);
        });
    }

    staffBot() {
        Commands.botMsg('Use the command !help to get a list of commands');
    }

    onChatCleaned(messages) {
        removeAllChildren(messages);
        Commands.botMsg('Chat has been cleaned');
    }

    onCount(amount) {
        document.querySelector('#users-counter').innerHTML = amount;
    }

    onMessage(data) {
        if (data?.type === 'System' && !data?.message) {
            this.appendMessage(Welcome(data));
        } else {
            this.appendMessage(Message(data));
        }
        this.messages.scrollTop = messages.scrollHeight - 10;
    }

    onSubmit(event, type = 'button') {
        if (type === 'button' || (event.keyCode === 13 && !event.shiftKey)) {
            event.preventDefault();
            this.sendMessage({
                username: localStorage.getItem('username'),
                message: this.messageField.value
            });
        }
    }

    sendMessage(options) {
        const { username, message } = options;
        if (options?.type !== 'System' && message.startsWith('!')) {
            Commands.interpret(message);
        } else {
            this.socket.emit('chat message', { username, message, type: options?.type || 'User', noSave: options.noSave });
        }
        this.messageField.value = '';
    }

    appendMessage(content) {
        this.messages.appendChild(createElement('div', 'card bshadow txt-white p4 fadein', content));
    }
}

const main = new Main;
export { main as Main }