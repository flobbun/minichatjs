const socket = io();

const form = document.querySelector('#chat-form');
const messageField = form.querySelectorAll('.message')[0];
const messages = document.querySelector('#messages');

messageField.onkeydown = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
};

form.addEventListener('submit', (e) => { 
    e.preventDefault();
    sendMessage();
});

function sendMessage() {
    const data = {
        username: localStorage.getItem('username'),
        message: messageField.innerHTML
    }
    socket.emit('chat message', data);
    messageField.innerHTML = '';
     //need to fix this
    messages.scrollTop = messages.scrollHeight;
}

function appendMessage(content) {
    const card = document.createElement('div');
    card.className = 'card bshadow txt-white p4 fadein';
    card.innerHTML = content;
    messages.appendChild(card);
}

socket.on('chat message', (data) => {
    appendMessage(`
        <li class="txt-center txt-bold">${data.username}</li>
        <p class="txt-center">${data.message}</p>`);
});

/* User counter */

socket.on('user count', (amount) => {
    document.querySelector('#users-counter').innerHTML = amount;
});