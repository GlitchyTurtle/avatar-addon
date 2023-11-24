import { MolangVariableMap } from '@minecraft/server';
import { setScore, delayedFunc, playSound } from "./../../util.js";

const command = {
    name: 'Air Launch',
    description: 'Launch yourself into the air on a blast of air - about 10 blocks!',
    style: 'air',
    unlockable: 4,
    unlockable_for_avatar: 4,
    cooldown: "fast",
    execute(player, decay) {
        setScore(player, "cooldown", 0);
        player.playAnimation("animation.air.jump");
        delayedFunc(player, (airLaunch) => {
            const currentLocation = { x: player.location.x, y: player.location.y, z: player.location.z };

            const map = new MolangVariableMap();
            map.setVector3("variable.plane", { x: 0.6 / decay, y: 100 / decay, z: 35 / decay });
            player.dimension.spawnParticle("a:air_shockwave_dynamic", currentLocation, map);

            //0.02, 100, 65
            playSound(player, 'firework.launch', 1, currentLocation, 2);
            player.applyKnockback(0, 0, 0, 2.5/decay);
            
            player.addEffect("slow_falling", 365, { amplifier: 255, showParticles: false });
        }, 10);
    }
}

export default command