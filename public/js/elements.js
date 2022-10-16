"use strict";

export const Message = (props) => {
    let date;

    if (props?.date) {
        const dateInstance = new Date(props.date);
        date = `${dateInstance.getHours()}:${dateInstance.getMinutes()}:${dateInstance.getSeconds()}`;
    }

    return (
        `
            <div class="p-4">
                <small class="text-start text-white font-mono">${date || ''}</small>
                <div class="text-white text-center text-md flex flex-col space-y-4">
                    <div class="font-bold">${props.username}</div>
                    <div><p>${props.message}</p></div>
                </div>
            </div>
        `
    )

}

export const CommandsList = (props) => (
    `
    <b>Commands</b>
    <ul class="text-white text-center p-2 font-bold text-md">
        <li>!help - This message</li>
        <li>!ping - See your ping</li>
        <li>!clear - Clear the chat</li>
    </ul>
    `
)

export const Welcome = (props) => `<li class="text-white text-center p-2 font-bold text-md">${props.username} has entered the chat</li>`