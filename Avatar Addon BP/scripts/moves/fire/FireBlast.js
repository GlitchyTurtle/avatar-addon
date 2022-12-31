import { getScore } from "./../../util.js";

const command = {
    name: 'Fire Blast',
    description: 'Shoots fire 10 blocks in front of you!',
    style: 'fire',
    unlockable: 0,
    unlockable_for_avatar: 65,
    cooldown: 'super_fast',
    execute(player) {
		let firetype = "fire_blast"
		if (getScore("level", player) > 100) { firetype = "fire_blue_blast" }
        player.runCommandAsync("scoreboard players set @s cooldown1 0");
		player.runCommandAsync("playsound firework.blast @a[r=3]");
        for (let i = 1; i < 15; i++) {
            try {
				player.runCommandAsync(`particle a:${firetype} ^^1^${i/2}`);
				player.runCommandAsync(`particle a:${firetype} ^^${1 + i/20}^${i/2}`);
				player.runCommandAsync(`particle a:${firetype} ^^${1 - i/20}^${i/2}`);
				player.runCommandAsync(`particle a:${firetype} ^-${i/20}^1^${i/2}`);
				player.runCommandAsync(`particle a:${firetype} ^${i/20}^1^${i/2}`);
			} catch (error) {}
        }
		try { player.runCommandAsync(`execute as @s positioned ^^^7.5 run damage @e[r=5,type=!item,name=!"${player.name}"] ${Math.ceil(Math.min(getScore("level", player)/4, 19))} none entity @s`); } catch (error) {}
    }
}

export default command