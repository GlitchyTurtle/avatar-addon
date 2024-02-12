import { world } from "@minecraft/server";
import { betaTesters, patreon, getScore, getBendingStyle, parseSettings } from "./../util.js";

const replacements = {
    "non-bender": "§8[Non-Bender]",
    "earth": "§2",
    "air": "§b",
    "fire": "§6",
    "water": "§9",
    "avatar": ""
};

export function beforeChat(msg) {
    const player = msg.sender;
    const SETTINGS = parseSettings(getScore("settings", player));

    if (SETTINGS.CHAT_RANKS) {
        let message = msg.message;
        let rank = replacements[getBendingStyle(player).toLowerCase()];
        let regex = new RegExp(":" + Object.keys(replacements).join(":|:") + ":", "g");

		if (betaTesters.includes(player.name)) rank = "§d[Beta] " + rank;
        if (patreon.includes(player.name)) rank = "§6[Patreon] " + rank;
        
        message = message.replace(regex, (match) => { return replacements[match.replaceAll(":", "")] + "§r" });

        world.sendMessage(`${rank} ${player.name}:§r ${message.replace(/\\"/g, '"')}`);
        msg.cancel = true;
    }
}