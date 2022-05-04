// import all our commands
import { help } from "./main/help.js";
import { choose } from "./main/choose.js";
import { chooseslot1 } from "./main/chooseslot1.js";
import { chooseslot2 } from "./main/chooseslot2.js";
import { chooseslot3 } from "./main/chooseslot3.js";
import { chooseslot4 } from "./main/chooseslot4.js";
import { movemsg } from "./main/movemsg.js";
import { movelist } from "./main/movelist.js";
import { stats } from "./main/stats.js";
import { bending } from "./main/bending.js";

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
	console.warn(`we got here`);
            break;
        case (commandName === "choose"):
            choose(message);
            break;
        case (commandName === "chooseslot1"):
            chooseslot1(message);
            break;
        case (commandName === "chooseslot2"):
            chooseslot2(message);
            break;
        case (commandName === "chooseslot3"):
            chooseslot3(message);
            break;
        case (commandName === "chooseslot4"):
            chooseslot4(message);
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
        default:
            player.runCommand(`tellraw "${(player.nameTag)}" {"rawtext":[{"text":"§cThe command !${commandName} does not exist. Try again!"}]}`);
            return message.cancel = true;
    }
}
