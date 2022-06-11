import { commandHandler } from "./../commands/handler.js";
import { betaTesters } from "./itemUse.js";
let enabled = true;

export function beforeChat(msg) {
    const player = msg.sender;
    commandHandler(player, msg);

    if (enabled) {
        let message = msg.message;
        let player = msg.sender;

        let tags = player.getTags();
        let rank;
        for (const tag of tags) {
            if (tag.startsWith('Rank:')) {
                rank = tag.replace('Rank:', '');
                rank = rank.replaceAll('--', '][');
            }
        }

        if (!rank) {
            rank = "[Human]";
        }

        if (player.hasTag('water')) {
            rank = "§9[Water]";
        }
        if (player.hasTag('fire')) {
            rank = "§6[Fire]";
        }
        if (player.hasTag('earth')) {
            rank = "§2[Earth]";
        }
        if (player.hasTag('air')) {
            rank = "§b[Air]";
        }
        if (player.hasTag('avatar')) {
            rank = "§d[§6Avatar§d]§r";
        }
        if (betaTesters.includes(player.name)) {
            rank = "§d[Beta Tester] " + rank;
        }

        if (!msg.cancel) {
            if (enabled) {
                player.runCommand(`tellraw @a ${JSON.stringify({ rawtext: [{ text: rank + ' ' + player.name + ':§r ' + message }] }).replace(/\\"/g, '"')}`);
            }
            msg.cancel = true;
        }
    }
}