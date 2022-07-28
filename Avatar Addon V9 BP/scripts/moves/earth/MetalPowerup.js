import { world } from 'mojang-minecraft'
import commands from '../import.js';
import { getScore } from "./../../util.js";

let startTick;

const command = {
    name: 'Metal Powerup',
    description: 'Gain resistance by converting 2 iron ingots to defense! Almost no cooldown because it consumes iron instead!',
    style: 'earth',
    unlockable: 0,
    sub_bending_required: 'metal',
    execute(player) {
	    player.runCommand("scoreboard players set @s cooldown1 80");
        try { player.runCommand("testfor @s[hasitem={item=iron_ingot,quantity=2..}]"); } catch (error) { player.runCommand(`tellraw @s {"rawtext":[{"text":"§cYou don't have 2+ iron to expend for this."}]}`); return; }
		player.runCommand("clear @s iron_ingot -1 2");
		player.runCommand("camerashake add @s 0.4 0.1 positional");
		player.runCommand("effect @s resistance 6 2 true");
		player.runCommand("particle a:metal_powerup ~~~");
		let particleTick = world.events.tick.subscribe(event => {
			if (!startTick) startTick = event.currentTick;
			player.runCommand("particle a:metal_powerup_signal ~~~");
			if (event.currentTick - startTick > 100) {
				world.events.tick.unsubscribe(particleTick);
				startTick = undefined;
			}
		})
    }
}

export default command