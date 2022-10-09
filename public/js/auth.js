"use strict";

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

    onLoginSuccess(data) {
        localStorage.setItem('username', data.username);
        this.loginContainer.classList.replace('show', 'hide');
        this.chat.classList.replace('hide', 'show');

        // Reset the history
        while (Main.messages.firstChild) {
            Main.messages.removeChild(Main.messages.firstChild);
        }

        // Append the history
        data.chat_history.forEach(msg => {
            Main.appendMessage(`
                <li class="txt-center txt-bold">${msg.username}</li>
                <p class="txt-center">${msg.message}</p>
            `);
        });
        Main.appendMessage(`<li class="txt-center txt-bold">${data.username} has entered the chat</li>`);
        // form.querySelectorAll('.message')[0].focus();
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