import { getScore } from "./../util.js";

// import all our commands
import { help } from "./main/help.js";
import { scroll } from "./main/scroll.js";
import { movemsg } from "./main/movemsg.js";
import { info } from "./main/info.js";
import { mobile } from "./main/mobile.js";
import { stats } from "./main/stats.js";
import { bending } from "./main/bending.js";
import { home } from "./main/home.js";
import { shop } from "./main/shop.js";
import { moveset } from "./main/moveset.js";

//hidden list
import { ping } from "./staff/ping.js";
import { invsee } from "./staff/invsee.js";
import { levelup } from "./staff/levelup.js";

/**
 * @name commandHandler
 * @param {object} player - The player that has sent the message
 * @param {object} message - Message data
 */

export function commandHandler(player, message) {
    // validate that required params are defined
    if (!player) {
        return
    }
    if (!message) {
        return
    }

    // checks if the message starts with our prefix, if not exit
    if (!message.message.startsWith('!')) {
        return;
    }

    // checks if the player is not in combat, and if they are, then exit
    if (getScore("combat", player) > 0) {
        message.cancel = true;
        return player.runCommand(`tellraw @s {"rawtext":[{"text":"§cYou are in combat, don't cheat!"}]}`);;
    }

    let args = message.message.slice(('!').length).split(/ +/);

    const commandName = args.shift().toLowerCase();

    //console.warn(`${new Date()} | "${(player.nameTag)}" used the command: ${('!')}${commandName} ${args.join(" ")}`);

    switch (true) {
        case (commandName === "help"):
            help(message);
            break;
        case (commandName === "scroll"):
            scroll(message);
            break;
        case (commandName === "shop" && !getScore("shop", player)):
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
        case (commandName === "home" && !getScore("home", player)):
            home(message, args);
            break;
        case (commandName === "mobile"):
            mobile(message);
            break;
        case (commandName === "moveset"):
            moveset(message, args);
            break;
        case (commandName === "ping"):
            ping(message, args);
            break;
        case (commandName === "invsee"):
            invsee(message, args);
            break;
        case (commandName === "levelup"):
            levelup(message, args);
            break;
        default:
            player.runCommand(`tellraw "${(player.nameTag)}" {"rawtext":[{"text":"§cThe command !${commandName} does not exist. Try again!"}]}`);
			message.cancel = true;
    }
}