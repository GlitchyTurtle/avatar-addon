import { setScore, getScore, playSound, delayedFunc } from "./../../util.js";

const command = {
    name: 'Earth Lift',
    description: 'Lifts a huge chunk of earth up with you.',
    style: 'earth',
    unlockable: 10,
    unlockable_for_avatar: 51,
    cooldown: 'slow',
    execute(player) {
        

		if (!getScore("ground", player)) return player.sendMessage("§cYou must be grounded to use this move.");

		player.playAnimation("animation.earth.lift");
        player.runCommand("inputpermission set @s movement disabled");

		delayedFunc(player, (earthPillarReturn) => {
			if (player.location.y < -50) return player.sendMessage("You cannot use this move so low!");
			let {x, y, z} = player.location;
			player.runCommand("clone ~5~-2~5 ~-5~4~-5 ~-5~4~-5 masked move");
			player.runCommand("execute as @e[r=10] at @s run tp @s ~~6~");
			playSound(player, 'dig.grass', 1, player.location, 2);
			player.runCommand("inputpermission set @s movement enabled");
			

			delayedFunc(player, (earthPillarReturn) => {
				player.runCommand(`execute as @s positioned ${x} ${y+6} ${z} run clone ~5 ~4 ~5 ~-5 ~-4 ~-5 ~-5 ~-10 ~-5 masked move`);
			}, 60);
		}, 20);
    }
}

export default command