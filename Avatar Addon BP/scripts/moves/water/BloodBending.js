import { world } from '@minecraft/server'
import { getScore } from "./../../util.js";

let startTick;
let kbSafeToggle;

const command = {
    name: 'Blood Bending',
    description: 'Pick up entities and launch them into the distance! Only works on full moons.',
    style: 'water',
    sub_bending_required: 'blood',
    unlockable: 12,
    unlockable_for_avatar: 0,
    cooldown: 'slow',
    execute(player) {
		player.runCommandAsync("scoreboard players set @s cooldown1 0");
		if (player.hasTag("full_moon") || getScore("level", player) >= 100) {
			player.addTag("kbsafe");
			kbSafeToggle = true
			player.runCommandAsync("playsound mob.turtle.swim @a[r=3] ~ ~ ~ 0.9 1");
			let kbTickW = world.events.tick.subscribe(event => {
				if (!startTick) startTick = event.currentTick;        
				if (event.currentTick - startTick < 50) {
					try { player.runCommandAsync(`execute as @s positioned ^^1^5 run tp @e[r=4] ~~~`); } catch (error) {}
				} else if (kbSafeToggle) {
					try { player.runCommandAsync(`summon a:knockback_instant ^^1^4.5`); } catch (error) {}
					kbSafeToggle = false
				}
				if (event.currentTick - startTick > 60) {
					world.events.tick.unsubscribe(kbTickW);
					startTick = undefined;
					player.removeTag("kbsafe");
					kbSafeToggle = true
				}
			})
		} else {
			return player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cYou need the power of a full moon for this, or an incredibly high mastery - level 100 or more. "}]}`);
		}
    }
}

export default command