import { world } from '@minecraft/server'
import { getScore } from "./../../util.js";

let startTick;

async function create(player) {
    await player.runCommandAsync("summon a:move_help ^ ^1 ^2");
    await player.runCommandAsync("tag @e[c=1,r=13,type=a:move_help] add fireseeking");
}

const command = {
    name: 'Fire Finder',
    description: 'Shoots a blast of fire that locks on to the closest entity, and does damage on impact!',
    style: 'fire',
    unlockable: 1,
    unlockable_for_avatar: 62,
    cooldown: 'fast',
    execute(player) {
        player.runCommandAsync("scoreboard players set @s cooldown1 0");
        player.runCommandAsync("playsound mob.shulker.shoot @a[r=3]");
        create(player);
        let finderTick = world.events.tick.subscribe(event => {
            if (!startTick) { startTick = event.currentTick; }
                try {
                    player.runCommandAsync("execute as @e[type=a:move_help,tag=fireseeking,c=1] at @s run particle minecraft:large_explosion ~ ~1 ~");
                    if (getScore("level", player) >= 100) {
                        player.runCommandAsync("execute as @e[type=a:move_help,tag=fireseeking,c=1] at @s run particle a:flame_blue_single ~ ~1 ~"); 
                    } else {
                        player.runCommandAsync("execute as @e[type=a:move_help,tag=fireseeking,c=1] at @s run particle minecraft:mobflame_single ~ ~1 ~"); 
                    }
                    player.runCommandAsync(`execute as @e[type=a:move_help,tag=fireseeking,c=1] at @s run tp @s ^ ^ ^1.5 facing @e[r=100,type=!a:move_help,name=!${player.nameTag},c=1,type=!item,type=!xp_orb]`);
                } catch (error) {}
                player.runCommandAsync(`execute as @e[type=a:move_help,tag=fireseeking,c=1] at @s run testfor @e[r=1,name=!${player.nameTag},type=!a:move_help]`).then(({successCount})=> {
                    player.runCommandAsync(`execute as @e[type=a:move_help,tag=fireseeking,c=1] at @s run summon a:explosion_low ~~1~`);
                    player.runCommandAsync(`execute as @e[type=a:move_help,tag=fireseeking,c=1] at @s run damage @e[r=5,type=!item,name=!${player.name}] 10`);
                    player.runCommandAsync(`execute as @e[type=a:move_help,tag=fireseeking,c=1] at @s run event entity @s instant_despawn`);
                })
            if (event.currentTick - startTick > 40) {
                world.events.tick.unsubscribe(finderTick);
                try { player.runCommandAsync("execute as @e[type=a:move_help,tag=fireseeking,c=1] at @s run event entity @s instant_despawn"); } catch (error) {}
                startTick = undefined;
            }
        })
    }
}

export default command