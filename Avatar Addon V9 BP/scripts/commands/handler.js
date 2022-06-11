// import all our commands
import { help } from "./main/help.js";
import { scroll } from "./main/scroll.js";
import { mobile } from "./main/mobile.js";
import { movemsg } from "./main/movemsg.js";
import { movelist } from "./main/movelist.js";
import { stats } from "./main/stats.js";
import { bending } from "./main/bending.js";
import { sethome } from "./main/sethome.js";
import { listhome } from "./main/listhome.js";
import { gohome } from "./main/gohome.js";
import { delhome } from "./main/delhome.js";

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
        case (commandName === "mobile"):
            mobile(message);
            break;
        case (commandName === "movemsg"):
            movemsg(message);
            break;
        case (commandName === "movelist"):
            movelist(message);
            break;
        case (commandName === "stats"):
            stats(message);
            break;
        case (commandName === "bending"):
            bending(message);
            break;
        case (commandName === "sethome"):
            sethome(message, args);
            break;
        case (commandName === "gohome"):
            gohome(message, args);
            break;
        case (commandName === "delhome"):
            delhome(message, args);
            break;
        case (commandName === "listhome"):
            listhome(message, args);
            break;
        default:
            player.runCommand(`tellraw "${(player.nameTag)}" {"rawtext":[{"text":"§cThe command !${commandName} does not exist. Try again!"}]}`);
            return message.cancel = true;
    }
}
