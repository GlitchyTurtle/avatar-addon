import { BlockLocation, world } from '@minecraft/server'
import { checkItemAmount } from "./../../util.js";

let startTick;

const command = {
    name: 'Magma Floor',
    description: 'Replaces the floor with lava, as long as you have more than 8 dirt in your inventory.',
    style: 'earth',
    unlockable: 15,
    unlockable_for_avatar: 60,
    cooldown: 'super_fast',
    sub_bending_required: 'lava',
    execute(player) {
		player.runCommandAsync("scoreboard players set @s cooldown1 0");
		let {x, y, z} = player.location;
		let verifyDirt = player.dimension.getBlock(new BlockLocation(x, y - 1, z));
		if (verifyDirt.type.id === "minecraft:grass") {
			if (checkItemAmount(player, 'minecraft:dirt') < 8) {
				player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cYou don't have 8+ dirt to expend for this."}]}`);
				return;
			}
			player.runCommandAsync("clear @s dirt -1 8");
			player.runCommandAsync("playsound firework.blast @a[r=3]");
			try { player.runCommandAsync(`fill ~1~-1~1~-1~-1~-1 lava 0 replace grass`); } catch (error) {}
			try { player.runCommandAsync(`fill ~~-1~2~~-1~-2 lava 0 replace grass`); } catch (error) {}
			try { player.runCommandAsync(`fill ~2~-1~~-2~-1~ lava 0 replace grass`); } catch (error) {}
			try { player.runCommandAsync(`fill ~~-1~~~-1~ grass`); } catch (error) {}
			let {x, y, z} = player.location;
			let dropTick = world.events.tick.subscribe(event => {
				if (!startTick) startTick = event.currentTick;
				if (event.currentTick - startTick > 100) {
					world.events.tick.unsubscribe(dropTick);
					try { player.runCommandAsync(`execute as @s positioned ${x} ${y} ${z} run fill ~2~-1~2 ~-2~-1~-2 grass 0 replace lava`); } catch (error) {}
					startTick = undefined;
				}
			})
		} else {
			player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cYou need to be on grass for this to work!"}]}`);
		}
    }
}

export default command