const command = {
    name: 'Ice Cage',
    description: 'Lock away all entities in a radius of 5 blocks in a cage of ice.',
    style: 'water',
    unlockable: 8,
    unlockable_for_avatar: 29,
    cooldown: 'slow',
    execute(player) {
        player.runCommandAsync("scoreboard players set @s cooldown1 0");
        player.runCommandAsync("playsound beacon.power @a[r=6]");
		try {
			player.runCommandAsync(`execute as @e[r=5,name=!"${player.name}"] at @s run fill ~1~-1~1 ~-1~2~-1 packed_ice 0 keep`); 
			player.runCommandAsync(`execute as @e[r=5,name=!"${player.name}"] at @s run fill ~~~ ~~1~ air 0 replace packed_ice`);
		} catch (error) {}
    }
}

export default command