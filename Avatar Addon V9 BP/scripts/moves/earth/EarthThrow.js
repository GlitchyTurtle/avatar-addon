import { BlockLocation, Location, world, World } from 'mojang-minecraft'
import commands from '../import.js';
import { getScore } from "./../../util.js";

let startTick;

const command = {
    name: 'Earth Throw',
    description: 'Lets you throw a chunk of earth that explodes on impact!',
    style: 'earth',
    unlockable: 0,
    execute(player) {
		player.runCommand("scoreboard players set @s cooldown1 0");
		if (getScore("ground", player) === 1) {
			let {x, y, z} = player.location;
			let verifyDirt = player.dimension.getBlock(new BlockLocation(x, y - 1, z));
			if (verifyDirt.type.id === "minecraft:dirt" || verifyDirt.type.id === "minecraft:grass" || verifyDirt.type.id === "minecraft:mycelium" || verifyDirt.type.id === "minecraft:grass_path" ) {
				player.runCommand("playsound dig.grass @a[r=10]");
				player.runCommand("summon a:dirt_block ~~-0.8~");
				let earthThrowTick = world.events.tick.subscribe(event => {
					if (!startTick) startTick = event.currentTick;
					try { player.runCommand("execute @e[type=a:dirt_block] ~~~ execute @a[r=1,tag=!earth,tag=!avatar] ~~~ event entity @e[r=3,c=1,type=a:dirt_block] minecraft:explode"); } catch (error) {}
					if (event.currentTick - startTick < 15) { try { player.runCommand("execute @e[type=a:dirt_block,c=1] ~~~ tp @s ~~0.1~"); } catch (error) {} }
					try { player.runCommand(`execute @e[type=a:dirt_block,tag=traveleast] ~~~ tp @s ~0.9~~`); } catch (error) {}
					try { player.runCommand(`execute @e[type=a:dirt_block,tag=travelwest] ~~~ tp @s ~-0.9~~`); } catch (error) {}
					try { player.runCommand(`execute @e[type=a:dirt_block,tag=travelnorth] ~~~ tp @s ~~~-0.9`); } catch (error) {}
					try { player.runCommand(`execute @e[type=a:dirt_block,tag=travelsouth] ~~~ tp @s ~~~0.9`); } catch (error) {}
					try { player.runCommand(`testfor @e[type=a:dirt_block,r=50,c=1]`); } catch (error) {
						world.events.tick.unsubscribe(earthThrowTick);
						startTick = undefined;
					}
				})
			}
		}
    }
}

export default command