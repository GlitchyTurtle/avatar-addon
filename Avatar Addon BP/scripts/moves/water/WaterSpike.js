const command = {
    name: 'Water Spike',
    description: 'Blast mobs up into the air on a spike of ice!',
    style: 'water',
    unlockable: 9,
    unlockable_for_avatar: 30,
    cooldown: 'fast',
    execute(player) {
        player.runCommandAsync(`scoreboard players set @s cooldown1 0`);
        player.runCommandAsync(`playsound mob.turtle.swim @a[r=3] ~ ~ ~ 0.9 1`);
        try { player.runCommandAsync(`execute as @e[r=5,type=!item,type=!a:move_help,name=!"${player.name}"] at @s run fill ~ ~ ~ ~ ~4 ~ ice 0 keep`); } catch (error) {}
        try { player.runCommandAsync(`execute as @e[r=5,type=!item,type=!a:move_help,name=!"${player.name}"] at @s run fill ~-1 ~ ~ ~ ~3 ~ ice 0 keep`); } catch (error) {}
        try { player.runCommandAsync(`execute as @e[r=5,type=!item,type=!a:move_help,name=!"${player.name}"] at @s run fill ~1 ~ ~ ~ ~3 ~ ice 0 keep`); } catch (error) {}
        try { player.runCommandAsync(`execute as @e[r=5,type=!item,type=!a:move_help,name=!"${player.name}"] at @s run fill ~ ~ ~-1 ~ ~3 ~ ice 0 keep`); } catch (error) {}
        try { player.runCommandAsync(`execute as @e[r=5,type=!item,type=!a:move_help,name=!"${player.name}"] at @s run fill ~ ~ ~1 ~ ~3 ~ ice 0 keep`); } catch (error) {}
        try { player.runCommandAsync(`execute as @e[r=5,type=!item,type=!a:move_help,name=!"${player.name}"] at @s run fill ~-1 ~1 ~1 ~1 ~ ~-1 ice 0 keep`); } catch (error) {}
        try { player.runCommandAsync(`execute as @e[r=5,type=!item,type=!a:move_help,name=!"${player.name}"] at @s run fill ~ ~ ~ ~ ~1 ~2 ice 0 keep`); } catch (error) {}
        try { player.runCommandAsync(`execute as @e[r=5,type=!item,type=!a:move_help,name=!"${player.name}"] at @s run fill ~ ~ ~ ~ ~1 ~-2 ice 0 keep`); } catch (error) {}
        try { player.runCommandAsync(`execute as @e[r=5,type=!item,type=!a:move_help,name=!"${player.name}"] at @s run fill ~ ~ ~ ~-2 ~1 ~ ice 0 keep`); } catch (error) {}
        try { player.runCommandAsync(`execute as @e[r=5,type=!item,type=!a:move_help,name=!"${player.name}"] at @s run fill ~ ~ ~ ~2 ~1 ~ ice 0 keep`); } catch (error) {}
        try { player.runCommandAsync(`execute as @e[r=5,type=!item,type=!a:move_help,name=!"${player.name}"] at @s run fill ~2 ~ ~-1 ~ ~ ~1 ice 0 keep`); } catch (error) {}
        try { player.runCommandAsync(`execute as @e[r=5,type=!item,type=!a:move_help,name=!"${player.name}"] at @s run fill ~-2 ~ ~-1 ~ ~ ~1 ice 0 keep`); } catch (error) {}
        try { player.runCommandAsync(`execute as @e[r=5,type=!item,type=!a:move_help,name=!"${player.name}"] at @s run fill ~-1 ~ ~-2 ~1 ~ ~ ice 0 keep`); } catch (error) {}
        try { player.runCommandAsync(`execute as @e[r=5,type=!item,type=!a:move_help,name=!"${player.name}"] at @s run fill ~-1 ~ ~2 ~1 ~ ~ ice 0 keep`); } catch (error) {}
        try { player.runCommandAsync(`execute as @e[r=5,type=!item,type=!a:move_help,name=!"${player.name}"] at @s run tp @s ~ ~5 ~`); } catch (error) {}
        try { player.runCommandAsync(`effect @e[r=10,name=!"${player.name}"] levitation 1 25 true`); } catch (error) {}
    }
}

export default command