import { MolangVariableMap } from "@minecraft/server";
import { setScore, delayedFunc, playSound, createShockwave } from "./../../util.js";

const command = {
    name: 'Air Push',
    description: 'Push the air around you to shoot back all nearby entities - up to 20 blocks away from you!',
    style: 'air',
    unlockable: 2,
    unlockable_for_avatar: 2,
    cooldown: 'slow',
    execute(player) {
        setScore(player, "cooldown", 0);
        player.playAnimation("animation.air.push");
        delayedFunc(player, airPush => {
            const map = new MolangVariableMap();
            const playerPos = player.location;
            createShockwave(player, playerPos, 20, 12, 0);
            player.dimension.spawnParticle("a:air_push", playerPos, map);
            player.dimension.spawnParticle("minecraft:explosion_manual", playerPos, map);
            playSound(player, 'random.explode', 1, playerPos, 5);
        }, 8);
    }
}

export default command