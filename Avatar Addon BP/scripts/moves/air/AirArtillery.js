import { world } from '@minecraft/server'

let startTick;

async function create(player) {
    await player.runCommandAsync("summon a:move_help ^ ^1 ^2");
    await player.runCommandAsync("tag @e[c=1,r=13,type=a:move_help] add seeking");
}

const command = {
    name: 'Air Artillery',
    description: 'Shoots a blast of air that locks on to the closest entity, and does damage on impact!',
    style: 'air',
    unlockable: 11,
    unlockable_for_avatar: 11,
    cooldown: 'fast',
    execute(player) {
        player.runCommandAsync("scoreboard players set @s cooldown1 0");
        player.runCommandAsync("playsound mob.shulker.shoot @a[r=3]");
        create(player);
        let artilleryTick = world.events.tick.subscribe(event => {
            if (!startTick) startTick = event.currentTick;

            player.runCommandAsync("execute as @e[type=a:move_help,tag=seeking,c=1] at @s run particle minecraft:large_explosion ~ ~1 ~");
            player.runCommandAsync(`execute as @e[type=a:move_help,tag=seeking,c=1] at @s run tp @s ^ ^ ^1.5 facing @e[r=100,type=!a:move_help,name=!"${player.name}",c=1,type=!item,type=!xp_orb]`);
            player.runCommandAsync(`execute as @e[type=a:move_help,tag=seeking,c=1] at @s run testfor @e[r=1,name=!"${player.name}",type=!a:move_help]`).then(({successCount})=> {
                player.runCommandAsync(`execute as @e[type=a:move_help,tag=seeking,c=1] at @s run summon a:explosion_low ~~1~`);
                player.runCommandAsync(`execute as @e[type=a:move_help,tag=seeking,c=1] at @s run damage @e[r=5,type=!item,name=!"${player.name}"] 10`);
                player.runCommandAsync(`execute as @e[type=a:move_help,tag=seeking,c=1] at @s run event entity @s instant_despawn`);
            })
            if (event.currentTick - startTick > 50) {
                world.events.tick.unsubscribe(artilleryTick);
                try { player.runCommandAsync("event entity @e[type=a:move_help,tag=seeking,c=1] instant_despawn"); } catch (error) {}
                startTick = undefined;
            }
        })
    }
}

export default command