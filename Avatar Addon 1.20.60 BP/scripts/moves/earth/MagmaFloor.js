import { delayedFunc, getScore, setScore, playSound, checkItemAmount } from "./../../util.js";

const command = {
    name: 'Magma Floor',
    description: 'Floods the floor around you (a circle with a radius of 7 blocks) with lava!',
    style: 'earth',
    unlockable: 0,
    unlockable_for_avatar: 0,
    cooldown: 'super_fast',
	skill_required: "Magma Floor",
    execute(player) {
		
		if (!getScore("ground", player)) return player.sendMessage("§cYou must be grounded to use this move.");

		player.playAnimation("animation.earth.shockwave");
        player.runCommand("inputpermission set @s movement disabled");

        const { x, y, z } = player.location;
        const dimension = player.dimension;

        delayedFunc(player, (removeLavaBlock) => {
			if (player.location.y < -50) return player.sendMessage("You cannot use this move so low!");
            
            playSound(player, 'dig.grass', 1, player.location, 2);
			player.addEffect("fire_resistance", 400, { amplifier: 20, showParticles: false });

			const radius = 7;
			for (let xBlock = x - radius; xBlock <= x + radius; xBlock++) {
				for (let zBlock = z - radius; zBlock <= z + radius; zBlock++) {
					if (Math.sqrt(Math.pow(xBlock - x, 2) + Math.pow(zBlock - z, 2)) <= radius && !(Math.floor(xBlock) == Math.floor(x) && Math.floor(zBlock) == Math.floor(z))) {
						const block = dimension.getBlock({x: xBlock, y: y - 1, z: zBlock })
						if (!block.isSolid) continue;
		
						const typeOfBlock = block.type;
						block.setType("minecraft:lava");
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