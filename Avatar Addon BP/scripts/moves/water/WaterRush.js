import { world } from '@minecraft/server'

let startTick;
let endEarly;

const command = {
    name: 'Water Rush',
    description: 'Speed toward the nearest entity, it will stop you 3 blocks away.',
    style: 'water',
    unlockable: 5,
    unlockable_for_avatar: 26,
    cooldown: 'super_fast',
    execute(player) {
        player.runCommandAsync("scoreboard players set @s cooldown1 0");
        player.runCommandAsync("playsound mob.turtle.swim @a[r=3] ~ ~ ~ 0.9 1");
		endEarly = false
        let rushWaterTick = world.events.tick.subscribe(event => {
			if (!startTick) startTick = event.currentTick;
			try {
				player.runCommandAsync(`particle a:water_dodge ~~~`); 
				player.runCommandAsync(`tp @s ^ ^ ^1.5 facing @e[name=!"${player.name}",c=1,type=!item,type=!xp_orb]`);
			} catch (error) {}
			try {
				player.runCommandAsync(`testfor @e[r=3,name=!"${player.name}"]`);
				endEarly = true;
			} catch (error) {}
			if (event.currentTick - startTick > 100 || endEarly === true) {
				world.events.tick.unsubscribe(rushWaterTick);	
				startTick = undefined;
			}
        })
    }
}

export default command