import { betaTesters, patreon, getScore } from "./../util.js";

export function beforeChat(msg) {
    const player = msg.sender;

    if (!getScore("chatRankSet", player)) {
        msg.cancel = true;
        let message = msg.message;
        let player = msg.sender;
		let rank = "§8[Human]";
		
		if (player.hasTag('water')) { rank = "§9"; }
		if (player.hasTag('fire')) { rank = "§6"; }
        if (player.hasTag('earth')) { rank = "§2"; }
        if (player.hasTag('air')) { rank = "§b"; }
        if (player.hasTag('avatar')) { rank = ""; }
		if (betaTesters.includes(player.name)) rank = "§d[Beta] " + rank;
        if (patreon.includes(player.name)) rank = "§6[Patreon] " + rank;

        player.runCommandAsync(`tellraw @a ${JSON.stringify({ rawtext: [{ text: rank + ' ' + player.name + ':§r ' + message.replace(/\\"/g, '"') }] })}`);
    }
}