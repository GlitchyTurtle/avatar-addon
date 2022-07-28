// import all our commands
import { help } from "./main/help.js";
import { scroll } from "./main/scroll.js";
import { movemsg } from "./main/movemsg.js";
import { info } from "./main/info.js";
import { stats } from "./main/stats.js";
import { bending } from "./main/bending.js";
import { home } from "./main/home.js";
import { shop } from "./main/shop.js";

//hidden list
import { ping } from "./staff/ping.js";
import { invsee } from "./staff/invsee.js";

/**
 * @name commandHandler
 * @param {object} player - The player that has sent the message
 * @param {object} message - Message data
 */

export function commandHandler(player, message) {
    // validate that required params are defined
    if (!player) {
        return console.warn(`${new Date()} | ` + "Error: ${player} isnt defined. Did you forget to pass it? (./commands/handler.js:45)");
    }
    if (!message) {
        return console.warn(`${new Date()} | ` + "Error: ${message} isnt defined. Did you forget to pass it? (./commands/handler.js:46)");
    }

    // checks if the message starts with our prefix, if not exit
    if (!message.message.startsWith('!')) {
        return;
    }

    let args = message.message.slice(('!').length).split(/ +/);

    const commandName = args.shift().toLowerCase();

    console.warn(`${new Date()} | "${(player.nameTag)}" used the command: ${('!')}${commandName} ${args.join(" ")}`);

    switch (true) {
        case (commandName === "help"):
            help(message);
            break;
        case (commandName === "scroll"):
            scroll(message);
            break;
        case (commandName === "shop"):
            shop(message, args);
            break;
        case (commandName === "movemsg"):
            movemsg(message);
            break;
        case (commandName === "info"):
            info(message, args);
            break;
        case (commandName === "stats"):
            stats(message, args);
            break;
        case (commandName === "bending"):
            bending(message);
            break;
        case (commandName === "home"):
            home(message, args);
            break;
        case (commandName === "ping"):
            ping(message, args);
            break;
        case (commandName === "invsee"):
            invsee(message, args);
            break;
        default:
            player.runCommand(`tellraw "${(player.nameTag)}" {"rawtext":[{"text":"§cThe command !${commandName} does not exist. Try again!"}]}`);
            return message.cancel = true;
    }
}
