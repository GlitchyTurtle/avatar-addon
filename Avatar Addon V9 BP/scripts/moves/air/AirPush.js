import { world, World } from 'mojang-minecraft'
import commands from '../import.js';

let startTick;

const command = {
    name: 'Air Push',
    description: 'Push the air around you to shoot back all nearby entities - up to 20 blocks away from you!',
    style: 'air',
    unlockable: 0,
    execute(player) {
        player.runCommand("scoreboard players set @s cooldown1 0");
        player.runCommand("particle a:air_push ~~~");
        player.runCommand("particle minecraft:explosion_manual ~~~");
        player.addTag("kbsafe");
        player.runCommand("summon a:knockback_instant ~~~");
        player.runCommand("playsound random.explode @a[r=5]");
        try { player.runCommand(`damage @e[r=10,rm=0.5] ${Math.ceil(Math.min(getScore("level", player)/4, 8))} none entity @s`); } catch (error) {}
        let kbTick = world.events.tick.subscribe(event => {
			if (!startTick) startTick = event.currentTick;        
			if (event.currentTick - startTick > 10) {
				world.events.tick.unsubscribe(kbTick);
				player.removeTag("kbsafe");
				startTick = undefined;
			}
        })
    }
}

export default command