import { world } from '@minecraft/server';
import { getGamemode } from '../../util.js';

let startTick;

const command = {
    name: 'Air Spirit',
    description: 'Become a spirit and float through blocks! [DUE TO BEDROCK BUGS, THIS MAY CRASH OR NOT WORK]',
    style: 'air',
    unlockable: 20,
    unlockable_for_avatar: 20,
    cooldown: 'slow',
    sub_bending_required: 'spirit',
    execute(player) {
        player.runCommandAsync("scoreboard players set @s cooldown1 0");
        player.runCommandAsync("playsound mob.shulker.shoot @a[r=3]");
		const saved = getGamemode(player);
		player.addTag("spirit");
        player.runCommandAsync("gamemode spectator @s");
        player.runCommandAsync("summon a:spirit_player ~~~");
        player.runCommandAsync(`tag @e[c=1,r=13,type=a:spirit_player] add ${player.name}`);
        let spiritTick = world.events.tick.subscribe(event => {
			if (!startTick) startTick = event.currentTick;
			try { 
				player.runCommandAsync("scoreboard players set @s cooldown1 0");
				player.runCommandAsync(`execute as @e[type=a:spirit_player,tag=${player.name}] at @s run particle a:air_charge ~~~`);
			} catch (error) {}
			if (event.currentTick - startTick > 300) {
				world.events.tick.unsubscribe(spiritTick);
				player.removeTag("spirit");
				player.runCommandAsync(`tp @s @e[c=1,type=a:spirit_player,tag=${player.name}]`).catch(err => {
					player.runCommandAsync(`gamemode surival @s`);
					player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cYour spirit marker was killed."}]}`);
					player.runCommandAsync("kill @s");
				})
				player.runCommandAsync(`execute as @e[c=1,type=a:spirit_player,tag=${player.name}] at @s run event entity @s minecraft:despawn`);
				player.runCommandAsync(`gamemode ${saved} @s`);
				startTick = undefined;
			}
        })
    }
}

export default command