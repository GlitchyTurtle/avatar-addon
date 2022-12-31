const command = {
    name: 'Air Pull',
    description: 'The opposite of air push, pulls all nearby entities close to you with strong winds - from up to 20 blocks away!',
    style: 'air',
    unlockable: 3,
    unlockable_for_avatar: 3,
    cooldown: 'slow',
    execute(player) {
        player.runCommandAsync("scoreboard players set @s cooldown1 0");
        player.runCommandAsync("particle a:air_pull ~~~");
        player.runCommandAsync("playsound mob.blaze.shoot @a[r=10]");
        for (let i = 1; i < 20; i++) {
            try { 
                player.runCommandAsync(`execute as @e[r=20,name=!"${player.name}"] at @s run tp @s ^ ^ ^0.5 facing @p[name="${player.name}"]`)
                player.runCommandAsync(`execute as @e[r=20,name=!"${player.name}"] at @s run particle minecraft:egg_destroy_emitter ~ ~ ~`)
            } catch (error) {}
        }
        try { player.runCommandAsync(`damage @e[r=5,type=!item,name=!"${player.name}"] ${Math.ceil(Math.min(getScore("level", player)/4, 8))} none entity @s`); } catch (error) {}
    }
}

export default command