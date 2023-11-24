import { MolangVariableMap } from "@minecraft/server";
import { setScore, delayedFunc, playSound } from "./../../util.js";

const command = {
    name: 'Purifying Breath',
    description: 'By harnessing the power of air, you can rid yourself of harmful substances and maintain your physical health and well-being: wither, blindness, and posion.',
    style: 'air',
    unlockable: 0,
    unlockable_for_avatar: 0,
    skill_required: "Breathing",
    cooldown: 'super_fast',
    execute(player) {
        setScore(player, "cooldown", 0);
        player.playAnimation("animation.air.vanish");
        player.runCommand("inputpermission set @s movement disabled");
        

        delayedFunc(player, airPush => {
            playSound(player, 'firework.blast', 0.5, player.location, 3);
            
            // Add 0 second effects that "override" the old ones
            player.removeEffect("blindness");
            player.removeEffect("wither");
            player.removeEffect("poison");
            player.removeEffect("fatal_poison");

            // Particle effects
            const map = new MolangVariableMap();
            player.dimension.spawnParticle("a:air_leap", player.location, map);
            player.runCommand("inputpermission set @s movement enabled");
        }, 12);
    }
}

export default command