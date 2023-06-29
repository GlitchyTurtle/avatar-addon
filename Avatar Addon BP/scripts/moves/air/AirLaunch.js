import { MolangVariableMap } from '@minecraft/server';
import { setScore, delayedFunc, playSound } from "./../../util.js";

const command = {
    name: 'Air Launch',
    description: 'Launch yourself into the air on a blast of air - about 10 blocks!',
    style: 'air',
    unlockable: 4,
    unlockable_for_avatar: 4,
    cooldown: "fast",
    execute(player) {
        setScore(player, "cooldown", 0);
        player.playAnimation("animation.air.jump");
        delayedFunc(player, (airLaunch) => {
            const currentLocation = { x: player.location.x, y: player.location.y, z: player.location.z };
            player.dimension.spawnParticle("a:air_shockwave_small", currentLocation, new MolangVariableMap());
            playSound(player, 'firework.launch', 1, currentLocation, 2);
            player.applyKnockback(0, 0, 0, 2.5);
        }, 10);
    }
}

export default command