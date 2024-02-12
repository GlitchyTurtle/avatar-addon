import { system, MolangVariableMap } from "@minecraft/server";
import { calcVectorOffset, traceLine, setScore, delayedFunc, createShockwave } from "../../util.js";

const command = {
    name: 'Lightning Burst',
    description: 'Shoot a shotgun style blast of lightning good for close encounters and movement!',
    style: 'fire',
    unlockable: 0,
    unlockable_for_avatar: 0,
    cooldown: 'fast',
    skill_required: "Lightning Burst",
    execute(player) {
        // Setup
        
        player.playAnimation("animation.air.blast");
        
        // To be executed when the animation is done
        delayedFunc(player, (airBall) => {

            player.runCommandAsync("camerashake add @a[r=10] 0.4 0.2 positional");
            for (let i = 0; i < 8; i++) {
                const locationA = calcVectorOffset(player, 0, 0.6, 0.2)
                const locationB = calcVectorOffset(player, Math.random() * 4 - 2, Math.random() * 2 - 0.5, 2 + Math.random())
                const locationC = calcVectorOffset(player, Math.random() * 8 - 4, Math.random() * 4 - 1, 4 + Math.random())
    
                //player.dimension.spawnParticle("a:air_blast", locationA, map);
                traceLine(player, locationA, locationB, 20, "a:lightning");
                traceLine(player, locationB, locationC, 20, "a:lightning");

                createShockwave(player, locationB, "normal", 5, 1);
            }

            const viewDirection = player.getViewDirection();
            player.applyKnockback(viewDirection.x, viewDirection.z, -2.5, -viewDirection.y);
            
        }, 12);
    }
}

export default command