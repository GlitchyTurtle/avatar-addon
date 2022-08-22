import { commandHandler } from "./../commands/handler.js";
import { betaTesters } from "./../util.js";
let enabled = true;

export function beforeChat(msg) {
    const player = msg.sender;
    commandHandler(player, msg);

    if (enabled) {
        let message = msg.message;
        let player = msg.sender;
		let rank = "§8[Human]";
		
		if (player.hasTag('water')) { rank = "§9[Water]"; }
		if (player.hasTag('fire')) { rank = "§6[Fire]"; }
        if (player.hasTag('earth')) { rank = "§2[Earth]"; }
        if (player.hasTag('air')) { rank = "§b[Air]"; }
        if (player.hasTag('avatar')) { rank = "§d[Avatar]§r"; }
		if (betaTesters.includes(player.name)) { rank = "§d[BT] " + rank; } 

        if (!msg.cancel) {
            if (enabled) {
                player.runCommand(`tellraw @a ${JSON.stringify({ rawtext: [{ text: rank + ' ' + player.name + ':§r ' + message.replace(/\\"/g, '"') }] })}`);
            }
            msg.cancel = true;
        }
    }
}