import { MolangVariableMap } from "@minecraft/server";
import { setScore, delayedFunc, playSound } from "./../../util.js";

const command = {
    name: 'Air Leap',
    description: 'Fling yourself into the air at high speeds by pushing off the ground.',
    style: 'air',
    unlockable: 1,
    unlockable_for_avatar: 1,
    cooldown: 'super_fast',
    execute(player) {
        // The actual move!
        
        player.playAnimation("animation.air.push");
        delayedFunc(player, airPush => {
            const map = new MolangVariableMap();
            player.dimension.spawnParticle("a:air_leap", player.location, map);
            playSound(player, "mob.fox.spit", 1, player.location, 3);
            playSound(player, 'random.explode', 1, player.location, 5);
            const viewDirection = player.getViewDirection();
            player.applyKnockback(viewDirection.x, viewDirection.z, 5, 0.7);
            player.addEffect("slow_falling", 265, { amplifier: 255, showParticles: false });
        }, 8);
    }
}

export default command