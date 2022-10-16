import { Main } from "./main.js";
import { CommandsList } from './elements.js';

class Commands {

    symbol = '!';

    interpret(message) {
        const command = message.split(' ')[0].replace(this.symbol, '');
        const args = message.split(' ').slice(1);
        if (this[command]) {
            this[command](args);
        } else {
            this.botMsg(`Command ${command} not found`);
        }
    }

    ping = (args) => {
        Main.requestPing();
    }

    help = (args) => {
        this.botMsg(CommandsList())
    }

    clear = (args) => {
        Main.socket.emit('clear');
    }

    botMsg = (message) => {
        Main.sendMessage({
            username: 'Staff Bot',
            message,
            noSave: true,
            type: 'System'
        })
    }
}

const commands = new Commands;
export { commands as Commands }