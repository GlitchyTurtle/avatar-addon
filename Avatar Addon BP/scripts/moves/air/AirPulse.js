import { MolangVariableMap } from "@minecraft/server";
import { delayedFunc, createShockwave, calcVectorOffset, setScore, playSound } from "../../util.js";

const command = {
    name: 'Air Pulse',
    description: 'Explodes a small shockwave of air a few blocks in front of you that does damage.',
    style: 'air',
    unlockable: 0,
    unlockable_for_avatar: 0,
    cooldown: 'fast',
    damage_factor: 1,
    off_tier_required: 2,
    execute(player) {
        // Setup
        setScore(player, "cooldown", 0);
        player.playAnimation("animation.air.blast");

        // To be executed when the animation is done
        delayedFunc(player, airPulse => {
            var currentPos = calcVectorOffset(player, 0, 1, 5);
            var currentBlock = player.dimension.getBlock(currentPos);

            while (currentBlock.isSolid()) {
                currentPos = { x: currentPos.x, y: currentPos.y + 1.5, z: currentPos.z }
                currentBlock = player.dimension.getBlock(currentPos);
            }

            const map = new MolangVariableMap();
            player.dimension.spawnParticle("a:air_shockwave_small", currentPos, map);
            player.dimension.spawnParticle("a:air_pulse", currentPos, map);
            playSound(player, 'random.explode', 1, currentPos, 5);
            createShockwave(player, currentPos, 3, 3, this.damage_factor);  
        }, 10);
    }
}

export default command