import { MolangVariableMap } from "@minecraft/server";
import { setScore, delayedFunc, playSound, createShockwave } from "./../../util.js";

const command = {
    name: 'Supercharged Air Shove',
    description: 'Push the air around you to damage and shoot back all nearby entities - up to 150 blocks away from you!',
    style: 'avatar',
    unlockable: 100,
    unlockable_for_avatar: 100,
    cooldown: 'slow',
    execute(player) {
        setScore(player, "cooldown", 0);
        if (!player.hasTag("avatar_state")) return player.sendMessage("§cYou must be in avatar state to use this move!");

        player.playAnimation("animation.air.push");
        delayedFunc(player, airPush => {
            const map = new MolangVariableMap();
            const playerPos = player.location;
            createShockwave(player, playerPos, 50, 150, 0);
            player.dimension.spawnParticle("a:supercharged_air_push", playerPos, map);
            player.dimension.spawnParticle("minecraft:explosion_manual", playerPos, map);
            playSound(player, 'random.explode', 1.5, playerPos, 15);
        }, 8);
    }
}

export default command