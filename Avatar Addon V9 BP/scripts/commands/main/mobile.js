export function mobile(message) {
    message.cancel = true;
    let player = message.sender;
    player.runCommand(`playsound random.levelup "${player.nameTag}"`);
    if (!player.hasTag('mobile')) {
        player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§aYou enabled mobile mode! Run this command again to disable.§r"}]}`);
        player.runCommand(`tag "${player.nameTag}" add mobile`);
		for (let i = 1; i <= 4; i++) {
			player.runCommand(`give @s a:slot_${i} 1 0 {"minecraft:keep_on_death":{},"minecraft:item_lock":{"mode":"lock_in_inventory"}}`)
		}
    } else {
        player.runCommand(`tag "${player.nameTag}" remove mobile`);
        player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§cYou disabled mobile mode!§r"}]}`);
		for (let i = 1; i <= 4; i++) {
			try { player.runCommand(`clear @s a:slot_${i}`) } catch (error) {}
		}
    }
}
