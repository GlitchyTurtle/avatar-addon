const command = {
    name: 'Fire Smite',
    description: 'Set all entities near you on fire and do some basic damage!',
    style: 'fire',
    unlockable: 8,
    unlockable_for_avatar: 69,
    execute(player) {
        if (getScore("level", player) < 100) {
            player.runCommandAsync("particle a:fire_shockwave");
        } else {
            player.runCommandAsync("particle a:fire_blue_shockwave");
        }
        player.runCommandAsync("scoreboard players set @s cooldown1 0");
        player.runCommandAsync("playsound mob.shulker.shoot @a[r=3]");
        try { player.runCommandAsync(`execute as @e[r=20,name=!"${player.name}"] at @s run setblock ~~~ fire`); } catch (error) {}
        try { player.runCommandAsync(`execute as @e[r=20,name=!"${player.name}"] at @s run damage @s[type=!item,name=!"${player.name}"] 5 none`); } catch (error) {}
    }
}

export default command