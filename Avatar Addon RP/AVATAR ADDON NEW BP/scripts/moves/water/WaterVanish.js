import { MolangVariableMap } from "@minecraft/server";
import { getScore, setScore, playSound, delayedFunc } from "../../util.js";

const command = {
    name: 'Water Vanish',
    description: 'Floods a nearby area, and does a small bit of damage to players.',
    style: 'water',
    unlockable: 2,
    unlockable_for_avatar: 23,
    cooldown: 'fast',
    execute(player) {
        // Set cooldown so they can't spam
        setScore(player, "cooldown", 0);

        // Check if they have water
		if (getScore("water_loaded", player) < 1) return player.sendMessage("§cYou don't have enough water to do that!")
		setScore(player, "water_loaded", -1, true);

        player.playAnimation("animation.water.vanish");
        player.runCommand("inputpermission set @s movement disabled");
        player.addTag("hiddenWater");
        
        delayedFunc(player, (waterVanish) => {
            const currentLocation = { x: player.location.x, y: player.location.y, z: player.location.z };
            player.dimension.spawnParticle("a:water_vanish", currentLocation, new MolangVariableMap());
            player.addEffect("invisibility", 200, { amplifier: 1, showParticles: false });
            playSound(player, 'random.explode', 1, currentLocation, 2);
            player.runCommand("inputpermission set @s movement enabled");
        }, 10);

        delayedFunc(player, (waterVanish) => {
            player.removeTag("hiddenWater");
        }, 240);
    }
}

export default command