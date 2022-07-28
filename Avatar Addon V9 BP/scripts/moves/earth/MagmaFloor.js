import { BlockLocation, world, World } from 'mojang-minecraft'
import commands from '../import.js';
import { getScore } from "./../../util.js";

let startTick;

const command = {
    name: 'Magma Floor',
    description: 'Replaces the floor with magma, as long as you have more than 8 dirt in your inventory.',
    style: 'earth',
    unlockable: 20,
    sub_bending_required: 'lava',
    execute(player) {
		player.runCommand("scoreboard players set @s cooldown1 0");
		let {x, y, z} = player.location;
		let verifyDirt = player.dimension.getBlock(new BlockLocation(x, y - 1, z));
		if (verifyDirt.type.id === "minecraft:grass") {
			try { player.runCommand("testfor @s[hasitem={item=dirt,quantity=8..}]"); } catch (error) { player.runCommand(`tellraw @s {"rawtext":[{"text":"§cYou don't have 8+ dirt to expend for this."}]}`); return; }
			player.runCommand("clear @s dirt -1 8");
			player.runCommand("playsound firework.blast @a[r=3]");
			try { player.runCommand(`fill ~1~-1~1~-1~-1~-1 magma 0 replace grass`); } catch (error) {}
			try { player.runCommand(`fill ~~-1~2~~-1~-2 magma 0 replace grass`); } catch (error) {}
			try { player.runCommand(`fill ~2~-1~~-2~-1~ magma 0 replace grass`); } catch (error) {}
			let {x, y, z} = player.location;
			let dropTick = world.events.tick.subscribe(event => {
				if (!startTick) startTick = event.currentTick;
				if (event.currentTick - startTick > 100) {
					world.events.tick.unsubscribe(dropTick);
					try { player.runCommand(`execute @s ${x} ${y} ${z} fill ~1~-1~1 ~-1~-1~-1 grass 0 replace magma`); } catch (error) {}
					try { player.runCommand(`execute @s ${x} ${y} ${z} fill ~~-1~2 ~~-1~-2 grass 0 replace magma`); } catch (error) {}
					try { player.runCommand(`execute @s ${x} ${y} ${z} fill ~2~-1~ ~-2~-1~ grass 0 replace magma`); } catch (error) {}
					startTick = undefined;
				}
			})
		} else {
			player.runCommand(`tellraw @s {"rawtext":[{"text":"§cYou need to be on grass for this to work!"}]}`);
		}
    }
}

export default command