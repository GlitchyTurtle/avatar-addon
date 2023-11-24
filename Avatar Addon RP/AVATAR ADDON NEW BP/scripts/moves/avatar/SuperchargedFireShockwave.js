import { MolangVariableMap } from "@minecraft/server";
import { delayedFunc, createShockwave, getScore, setScore, playSound } from "./../../util.js";

const command = {
    name: 'Supercharged Fire Shockwave',
    description: "Damage everyone near you, with zero max damage cap! Just don't let anyone get close to you, and don't let them drink fire resistance!",
    style: 'avatar',
    unlockable: 100,
    unlockable_for_avatar: 100,
    cooldown: 'slow',
    execute(player) {
        // Setup
        setScore(player, "cooldown", 0);
        if (!player.hasTag("avatar_state")) return player.sendMessage("§cYou must be in avatar state to use this move!");

        player.playAnimation("animation.fire.shockwave");
        player.runCommand("inputpermission set @s movement disabled");

        // To be executed when the animation is done
        delayedFunc(player, shockWave => {
            const playerPos = player.location;
            const map = new MolangVariableMap();
            player.dimension.spawnParticle("a:supercharged_fire_blue_shockwave", playerPos, map);
            playSound(player, 'random.explode', 1, playerPos, 5);
            createShockwave(player, playerPos, "ultra_heavy", 20, 15);
        }, 5);

        delayedFunc(player, movementReturn => {
            player.runCommand("inputpermission set @s movement enabled");
        }, 35)
    }
}

export default command