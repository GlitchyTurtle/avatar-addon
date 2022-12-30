import { world } from '@minecraft/server';
import { getScore } from "../../util.js";

let startTick;

const command = {
    name: 'Supercharged Ice Throw',
    description: 'Summons 3 pieces of ice you can aim by looking around. Punch to fire, or just wait till your cooldown is up. Be careful, these explosions are very powerful.',
    style: 'avatar',
    unlockable: 100,
    unlockable_for_avatar: 100,
    cooldown: 'slow',
    execute(player) {
		if (!player.hasTag("avatar_state")) return player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cYou must be in avatar state to use this move!"}]}`);
        player.runCommandAsync("scoreboard players set @s cooldown1 0");
        player.runCommandAsync("playsound mob.turtle.swim @a[r=3] ~ ~ ~ 0.9 1");
		async function summon() {
			await player.runCommandAsync("summon a:ice_block ^^0.3^1");
			await player.runCommandAsync("tag @e[c=1,type=a:ice_block,tag=!n1,tag=!n2,tag=!n3] add n1");
			await player.runCommandAsync("summon a:ice_block ^-1^0.3^1");
			await player.runCommandAsync("tag @e[c=1,type=a:ice_block,tag=!n1,tag=!n3] add n2");
			await player.runCommandAsync("summon a:ice_block ^1^0.3^1");
			await player.runCommandAsync("tag @e[c=1,type=a:ice_block,tag=!n1,tag=!n2] add n3");
		}
		summon();
		player.runCommandAsync("scoreboard players set @s detect_left 0");
		player.runCommandAsync(`titleraw @s actionbar {"rawtext":[{"text":"§bPunch to shoot."}]}`);
        let iceThrowTick = world.events.tick.subscribe(event => {
			if (!startTick) startTick = event.currentTick;
			if (event.currentTick - startTick > 50) {
				try { player.runCommandAsync(`tag @e[r=10,c=3,type=a:ice_block] add launch`); } catch (error) {}
			}
			try { player.runCommandAsync(`tp @e[c=1,tag=n1,type=a:ice_block,tag=!launch] ^-1^0.3^1.5 facing ${player.nameTag}`); } catch (error) {}
			try { player.runCommandAsync(`tp @e[c=1,tag=n2,type=a:ice_block,tag=!launch] ^^0.3^1.5 facing ${player.nameTag}`); } catch (error) {}
			try { player.runCommandAsync(`tp @e[c=1,tag=n3,type=a:ice_block,tag=!launch] ^1^0.3^1.5 facing ${player.nameTag}`); } catch (error) {}
			if (getScore("detect_left", player) === 1) { 
				try { player.runCommandAsync(`tag @e[r=10,c=3,type=a:ice_block] add launch`); } catch (error) {}
			}
			try {
				player.runCommandAsync(`execute as @e[c=3,type=a:ice_block,tag=launch] at @s run tp @s ^^^-1`);
				player.runCommandAsync(`execute as @e[c=3,type=a:ice_block,tag=launch] at @s run execute as @e[r=2,name=!${player.nameTag},type=!a:ice_block] at @s run event entity @e[r=5,type=a:ice_block] minecraft:explode_mega`);
			} catch (error) { 
				console.warn("error")
			}
			player.runCommandAsync(`testfor @e[type=a:ice_block,r=50,c=3]`).catch(err=>{
				world.events.tick.unsubscribe(iceThrowTick);
				startTick = undefined;
			});
        })
    }
}

export default command