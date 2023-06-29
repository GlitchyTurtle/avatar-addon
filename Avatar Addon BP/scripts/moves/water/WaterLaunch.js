import { MolangVariableMap } from '@minecraft/server'
import { getScore, setScore, delayedFunc, playSound } from "./../../util.js";

const command = {
    name: 'Water Launch',
    description: 'Launch yourself into the air on a blast of water - about 25 blocks!',
    style: 'water',
    unlockable: 4,
    unlockable_for_avatar: 25,
    cooldown: 'super_fast',
    execute(player) {
        // Set cooldown so they can't spam
        setScore(player, "cooldown", 0);

        // Check if they have water
		if (getScore("water_loaded", player) < 1) return player.sendMessage("§cYou don't have enough water to do that!")
		setScore(player, "water_loaded", -1, true);

        player.addTag("hiddenWater");
        player.playAnimation("animation.water.jump");
        delayedFunc(player, (waterLaunch) => {
            const currentLocation = player.location;
            player.dimension.spawnParticle("a:water_wave", currentLocation, new MolangVariableMap());
            playSound(player, 'firework.launch', 1, currentLocation, 2);
            player.applyKnockback(0, 0, 0, 1.5);
            player.addEffect("slow_falling", 140, { amplifier: 1, showParticles: false });
            player.removeTag("hiddenWater");
        }, 10);
    }
}

export default command