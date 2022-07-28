import { world } from "mojang-minecraft";

const World = world;

export function invsee(message, args) {
	let player = message.sender;
	if (player.hasTag("staff")) {
		message.cancel = true;
		
		if (!args.length) {
			return player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§cYou need to pass an argument, like @${player.name}."}]}`);
		}
		
		let member;
		for (let pl of World.getPlayers()) {
			if ((args[0].toLowerCase().replace(/"|\\|@/g, "")).includes(pl.nameTag.toLowerCase())) {
				member = pl;
			}
		}
		
		if (!member) {
			return player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§cCouldn't find that player."}]}`);
		}
		
		message.sender.runCommand(`playsound random.levelup "${message.sender.nameTag}"`);
		
		let container = member.getComponent('inventory').container;
		player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§b${member.nameTag}§r's inventory:\n"}]}`);
		player.runCommand('tellraw @s {"rawtext":[{"text":"-----------------------------------------§r"}]}');
		for (let i = 0; i < container.size; i++) {
			if (container.getItem(i)) {
				let o = container.getItem(i);
				player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§bSlot ${i+1}:§r ${o.id.replace("minecraft:", "")} x${o.amount}§r"}]}`);
			}
		}
		player.runCommand('tellraw @s {"rawtext":[{"text":"-----------------------------------------§r"}]}');
	}
}