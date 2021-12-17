const loginForm = document.querySelector('#login-form');
const loginContainer = document.querySelector('#login');
const chat = document.querySelector('#chat');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    login(e);
});
loginForm.querySelector('input[name="new-username"]').onkeydown = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault();
        login();
    }
};

function login(){
    const data = {
        username: loginForm.querySelector('input[name="new-username"]').value
    }
    socket.emit('login', data);
}

socket.on('login success', (data) => {
    localStorage.setItem('username', data.username);
    loginContainer.classList.replace('show', 'hide');
    chat.classList.replace('hide', 'show');

    // Reset the history
    while (messages.firstChild) {
        messages.removeChild(messages.firstChild);
    }

    // Append the history
    data.chat_history.forEach(msg => {
        appendMessage(`
        <li class="txt-center txt-bold">${msg.username}</li>
        <p class="txt-center">${msg.message}</p>`);
    });
    appendMessage(`<li class="txt-center txt-bold">${data.username} has entered the chat</li>`);
    // form.querySelectorAll('.message')[0].focus();
});

socket.on('login failure', () => {
    loginForm.querySelector('input[name="new-username"]').style.animation = 'error 0.5s ease-in-out';
});