import { world, World } from 'mojang-minecraft'
import commands from '../import.js';
import { getScore } from "./../../util.js";

let startTick;
let saved;

const command = {
    name: 'Air Spirit',
    description: 'Become a spirit and float through blocks!',
    style: 'air',
    unlockable: 50,
    sub_bending_required: 'spirit',
    execute(player) {
        player.runCommand("scoreboard players set @s cooldown1 0");
        player.runCommand("playsound mob.shulker.shoot @a[r=3]");
		//I know theres a better way to do this, but I'm dumb
		try { 
			player.runCommand("testfor @s[m=c]"); saved = "c"; 
		} catch (error) {
			try { 
				player.runCommand("testfor @s[m=s]"); saved = "s"; 
			} catch (error) {
				player.runCommand("testfor @s[m=a]"); saved = "a"; 
			}
		}
		player.addTag("spirit");
        player.runCommand("gamemode spectator @s");
        player.runCommand("summon a:spirit_player ~~~");
        player.runCommand(`tag @e[c=1,r=13,type=a:spirit_player] add ${player.name}`);
        let spiritTick = world.events.tick.subscribe(event => {
			if (!startTick) startTick = event.currentTick;
			try { 
				player.runCommand("scoreboard players set @s cooldown1 0");
				player.runCommand(`execute @e[type=a:spirit_player,tag=${player.name}] ~~~ particle a:air_charge ~~~`);
			} catch (error) {}
			if (event.currentTick - startTick > 300) {
				world.events.tick.unsubscribe(spiritTick);
				player.removeTag("spirit");
				try { 
					player.runCommand(`tp @s @e[c=1,type=a:spirit_player,tag=${player.name}]`);
					player.runCommand(`execute @e[c=1,type=a:spirit_player,tag=${player.name}] ~~~ event entity @s minecraft:despawn`);
					player.runCommand(`gamemode ${saved} @s`);
				} catch (error) {
					player.runCommand(`gamemode ${saved} @s`);
					player.runCommand(`tellraw @s {"rawtext":[{"text":"§cYour spirit marker was killed."}]}`);
					player.runCommand("kill @s");
				}
				startTick = undefined;
			}
        })
    }
}

export default command