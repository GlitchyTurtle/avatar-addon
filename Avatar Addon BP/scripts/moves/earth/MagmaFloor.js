import { MinecraftBlockTypes } from "@minecraft/server";
import { delayedFunc, getScore, setScore, playSound, checkItemAmount } from "./../../util.js";

const command = {
    name: 'Magma Floor',
    description: 'Replaces the floor with lava, as long as you have more than 8 dirt in your inventory.',
    style: 'earth',
    unlockable: 15,
    unlockable_for_avatar: 60,
    cooldown: 'super_fast',
    sub_bending_required: 'lava',
    execute(player) {
		setScore(player, "cooldown", 0);
		if (!getScore("ground", player)) return player.sendMessage("§cYou must be grounded to use this move.");

		if (checkItemAmount(player, 'minecraft:dirt') < 8) return player.sendMessage("§cYou don't have 8+ dirt to expend for this.");
		player.runCommand("clear @s dirt -1 8");
			
		player.playAnimation("animation.earth.shockwave");
        player.runCommand("inputpermission set @s movement disabled");

        const { x, y, z } = player.location;
        const dimension = player.dimension;

        delayedFunc(player, (removeLavaBlock) => {
            setScore(player, "cooldown", 0);
            playSound(player, 'dig.grass', 1, player.location, 2);
			player.addEffect("fire_resistance", 400, { amplifier: 20, showParticles: false });

			const radius = 4;
			for (let xBlock = x - radius; xBlock <= x + radius; xBlock++) {
				for (let zBlock = z - radius; zBlock <= z + radius; zBlock++) {
					if (Math.sqrt(Math.pow(xBlock - x, 2) + Math.pow(zBlock - z, 2)) <= radius && !(Math.floor(xBlock) == Math.floor(x) && Math.floor(zBlock) == Math.floor(z))) {
						const block = dimension.getBlock({x: xBlock, y: y - 1, z: zBlock })
						if (!block.isSolid()) continue;
		
						const typeOfBlock = block.type;
						block.setType(MinecraftBlockTypes.lava);
						delayedFunc(player, (removeDirtBlock) => {
							block.setType(typeOfBlock)
						}, Math.random() * 20 + 50);
					}
				}
			}
        }, 20);
        delayedFunc(player, (removeDirtBlock) => {
            player.runCommand("inputpermission set @s movement enabled");
        }, 35);
    }
}

export default command