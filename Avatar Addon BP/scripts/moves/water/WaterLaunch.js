const command = {
    name: 'Water Launch',
    description: 'Launch yourself into the air on a blast of water - about 25 blocks!',
    style: 'water',
    unlockable: 4,
    unlockable_for_avatar: 25,
    cooldown: 'super_fast',
    execute(player) {
        player.runCommandAsync("particle a:water_wave");
        player.runCommandAsync("effect @s levitation 1 25 true");
        player.runCommandAsync("playsound firework.launch @s");
        player.runCommandAsync("scoreboard players set @s cooldown1 0");
    }
}

export default command