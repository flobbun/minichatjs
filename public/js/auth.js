"use strict";

import { Message } from './elements.js';
import { hideElement, removeAllChildren, showElement } from './lib.js';
import { Main } from './main.js';

const { socket: SOCKET } = Main;

class Auth {

    loginForm = document.querySelector('#login-form');
    loginContainer = document.querySelector('#login');
    chat = document.querySelector('#chat');

    constructor() {
        this.events();
    }

    get username() {
        return this.loginForm.querySelector('input[name="new-username"]').value
    }

    events() {
        this.loginForm.addEventListener('submit', (e) => this.onSubmit(e));
        this.loginForm.querySelector('input[name="new-username"]').onkeydown = (e) => this.onKeyDown(e);
        SOCKET.on('login success', (data) => this.onLoginSuccess(data));
        SOCKET.on('login failure', () => this.onLoginFailure());
    }

    onLoginFailure() {
        this.loginForm.querySelector('input[name="new-username"]').style.animation = 'error 0.5s ease-in-out';
    }

    appendHistory(data) {
        data.chat_history.forEach(msg => {
            Main.appendMessage(Message(msg));
        });
    }

    onLoginSuccess(data) {
        localStorage.setItem('username', data.username);
        hideElement(this.loginContainer);
        showElement(this.chat);

        removeAllChildren(Main.messages);
        this.appendHistory(data);

        Main.sendMessage({
            username: data.username,
            message: `${data.username} has entered the chat`,
            type: 'System'
        });
        SOCKET.emit('user count');
        Main.messageField.focus();
    }

    login() {
        SOCKET.emit('login', { username: this.username });
    }

    onSubmit(event) {
        event.preventDefault();
        this.login();
    }

    onKeyDown(event) {
        if (event.keyCode === 13 && !event.shiftKey) {
            event.preventDefault();
            this.login();
        }
    }

}

const auth = new Auth;
export { auth as Auth };