import { MolangVariableMap } from "@minecraft/server";
import { getScore, setScore, playSound, createShockwave, delayedFunc } from "../../util.js";

const map = new MolangVariableMap();

const command = {
    name: 'Water Splash',
    description: 'Pushes all nearby mobs and players away with a wave of water.',
    style: 'water',
    unlockable: 6,
    unlockable_for_avatar: 27,
    damage_factor: 2,
    execute(player) {
        // Set cooldown so they can't spam
        setScore(player, "cooldown", 0);

        // Check if they have water
        if (getScore("water_loaded", player) < 1) return player.sendMessage("§cYou don't have enough water to do that!")
        setScore(player, "water_loaded", -1, true);

        player.playAnimation("animation.water.push");

        delayedFunc(player, (iceCage) => {
            playSound(player, 'beacon.activate', 3, player.location, 5);
            playSound(player, 'cauldron.takewater', 2, player.location, 5);
            player.dimension.spawnParticle("a:water_splash", player.location, map);
            createShockwave(player, player.location, 6, 25, this.damage_factor);
        });
    }
}

export default command