"use strict";

import { createElement } from './lib.js';

class Main {
    socket = io();

    form = document.querySelector('#chat-form');
    messageField = this.form.querySelectorAll('.message')[0];
    messages = document.querySelector('#messages');

    constructor() {
        this.events();
    }

    events() {
        this.messageField.onkeydown = (e) => this.onKeyDown(e);
        this.form.addEventListener('submit', (e) => this.onSubmit(e));
        this.socket.on('chat message', (data) => this.onMessage(data));
        this.socket.on('user count', (amount) => this.onCoun(amount));
    }

    onCount(amount) {
        document.querySelector('#users-counter').innerHTML = amount;
    }

    onMessage(data) {
        this.appendMessage(`
        <li class="txt-center txt-bold">${data.username}</li>
        <p class="txt-center">${data.message}</p>`);
    }

    onKeyDown(event) {
        if (event.keyCode === 13 && !event.shiftKey) {
            event.preventDefault();
            this.sendMessage();
        }
    }

    onSubmit(event) {
        event.preventDefault();
        this.sendMessage();
    }

    sendMessage() {
        this.socket.emit('chat message', {
            username: localStorage.getItem('username'),
            message: this.messageField.value
        });
        this.messageField.value = '';
        // TODO - Fix this
        this.messages.scrollTop = messages.scrollHeight;
    }

    appendMessage(content) {
        this.messages.appendChild(createElement('div', 'card bshadow txt-white p4 fadein', content));
    }
}

const main = new Main;
export { main as Main }