const command = {
    name: 'Water Wake',
    description: 'Shoot youself over 5 blocks to the left side to dodge other moves.',
    style: 'water',
    unlockable: 1,
    unlockable_for_avatar: 22,
    cooldown: 'super_fast',
    execute(player) {
        player.runCommandAsync("scoreboard players set @s cooldown1 0");
        player.runCommandAsync("playsound mob.fox.spit @a[r=3]");
        for (let i = 1; i < 20; i++) {
	try { 
	    player.runCommandAsync(`execute as @s at @s run tp @s ^0.2^^ true`);
	    player.runCommandAsync(`execute as @s at @s run particle a:water_dodge ~ ~ ~`);
	} catch (error) {}
        }
    }
}

export default command