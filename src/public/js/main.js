const socket = io();

const form = document.querySelector('#chat-form');

form.querySelector('textarea[name="message"]').onkeydown = (e) => {
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
        username: form.querySelector('input[name="username"]').value,
        message: form.querySelector('textarea[name="message"]').value
    }
    socket.emit('chat message', data);
    form.querySelector('textarea[name="message"]').value = '';
}

socket.on('chat message', (data) => {
    const messages = document.querySelector('#messages');
    const card = document.createElement('div');
    card.className = 'card bshadow txt-white p4 fadein';
    card.innerHTML = `
        <li class="txt-center txt-bold">${data.username}</li>
        <p class="txt-center">${data.message}</p>`;
    messages.appendChild(card);
});