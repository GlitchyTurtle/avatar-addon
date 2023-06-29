import { MolangVariableMap } from "@minecraft/server";
import { delayedFunc, createShockwave, getScore, setScore, playSound } from "./../../util.js";

const command = {
    name: 'Fire Shockwave',
    description: 'Explodes out a shockwave of powerful fire that does damage.',
    style: 'fire',
    unlockable: 7,
    unlockable_for_avatar: 68,
    damage_factor: 3,
    execute(player) {
        // Setup
        setScore(player, "cooldown", 0);
        player.playAnimation("animation.fire.shockwave");
        player.runCommand("inputpermission set @s movement disabled");

        // To be executed when the animation is done
        delayedFunc(player, shockWave => {
            const playerPos = player.location;
            const map = new MolangVariableMap();
            if (getScore("level", player) >= 100) {
                player.dimension.spawnParticle("a:fire_blue_shockwave", playerPos, map);
            } else {
                player.dimension.spawnParticle("a:fire_shockwave", playerPos, map);
            }
            playSound(player, 'random.explode', 1, playerPos, 5);
            createShockwave(player, playerPos, 7, 7, this.damage_factor);
        }, 5);

        delayedFunc(player, movementReturn => {
            player.runCommand("inputpermission set @s movement enabled");
        }, 35)
    }
}

export default command