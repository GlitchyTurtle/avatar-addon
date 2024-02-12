import { MolangVariableMap } from "@minecraft/server";
import { setScore, getScore, delayedFunc, playSound } from "./../../util.js";

const map = new MolangVariableMap();

const command = {
    name: 'Fire Smite',
    description: 'Set all entities near you on fire and do some basic damage!',
    style: 'fire',
    unlockable: 8,
    unlockable_for_avatar: 69,
    cooldown: 'super_fast',
    execute(player) {
        
        
        playSound(player, 'mob.shulker.shoot', 1, player.location, 3);
        player.playAnimation("animation.fire.push");
        
        delayedFunc(player, (fireSmite) => {
            if (getScore("level", player) <= 100) {
                player.dimension.spawnParticle("a:fire_shockwave", player.location, map);
            } else {
                player.dimension.spawnParticle("a:fire_blue_shockwave", player.location, map);
            }
            player.runCommand(`execute as @e[r=20,name=!"${player.name}"] at @s run setblock ~~~ fire`);
        }, 5);
    }
}

export default command