import { setScore, getScore, playSound, delayedFunc } from "./../../util.js";

const command = {
    name: 'Earth Pillar',
    description: 'Lift the earth under you 4 blocks up.',
    style: 'earth',
    unlockable: 0,
    unlockable_for_avatar: 41,
    cooldown: 'slow',
    execute(player) {
        

		if (!getScore("ground", player)) return player.sendMessage("§cYou must be grounded to use this move.");

		let {x, y, z} = player.location;
		
		if (player.location.y < -50) return player.sendMessage("You cannot use this move so low!");

		playSound(player, 'dig.grass', 1, player.location, 2);
		player.teleport({ x: x, y: y + 4, z: z }, { dimension: player.dimension, keepVelociy: true });

		player.runCommand("clone ~ ~-8 ~ ~ ~-5 ~ ~ ~-4 ~");
		player.runCommand("fill ~ ~-8 ~ ~ ~-5 ~ air");

		delayedFunc(player, (earthPillarReturn) => {
			player.runCommand(`execute as @s positioned ${x} ${y + 4} ${z} run clone ~~-1~ ~~-4~ ~~-8~`);
			player.runCommand(`execute as @s positioned ${x} ${y + 4} ${z} run fill ~~~ ~~-4~ air`);
		}, 40);
    }
}

export default command