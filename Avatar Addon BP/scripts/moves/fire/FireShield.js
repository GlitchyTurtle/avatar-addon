import { world } from '@minecraft/server'
import { getScore } from "./../../util.js";

let startTick;

const command = {
    name: 'Fire Shield',
    description: 'Block all incoming blasts with the power of fire!',
    style: 'fire',
    unlockable: 2,
    unlockable_for_avatar: 63,
    cooldown: 'fast',
    execute(player) {
        player.runCommandAsync("scoreboard players set @s cooldown1 0");
        player.runCommandAsync("playsound mob.blaze.shoot @a[r=5]");
        
        player.runCommandAsync("effect @s resistance 1 255 true");
        if (getScore("level", player) >= 100) {
            player.runCommandAsync("particle a:fire_shield_blue ~~~");
		    player.runCommandAsync("particle a:fire_wave_blue ~~~");
        } else {
            player.runCommandAsync("particle a:fire_shield ~~~");
		    player.runCommandAsync("particle a:fire_wave ~~~");
        }
    
        let {x, y, z} = player.location;
        let fireShieldTick = world.events.tick.subscribe(event => {
            if (!startTick) startTick = event.currentTick;
            try { player.runCommandAsync(`execute as @e[x=${x},y=${y},z=${z},name=!${player.nameTag},r=4] at @s run tp @s ^^^-1 facing ${x} ${y} ${z}`); } catch (error) {}
            if (event.currentTick - startTick > 120) {
                world.events.tick.unsubscribe(fireShieldTick);
                startTick = undefined;
            }
        })
    }
}

export default command