const command = {
    name: 'Deep Breath',
    description: 'Displays the basic stats of the player nearest to you in a 40 block radius!',
    style: 'air',
    unlockable: 13,
    cooldown: 'fast',
    execute(player) {
        player.runCommandAsync("scoreboard players set @s cooldown1 0");
        player.runCommandAsync("particle a:air_vanish ~~~");
        player.runCommandAsync(`execute as @p[name=!"${player.name}",r=40] run tellraw @p[name="${player.name}"] {"rawtext":[{"text":"§b You are not alone, ${player.name} is near."}]}`);
    }
}

export default command