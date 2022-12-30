import { world } from '@minecraft/server'
import { checkItemAmount } from "./../../util.js";

let startTick;

const command = {
    name: 'Metal Powerup',
    description: 'Gain full resistance by converting 2 iron ingots to defense! Almost no cooldown because it consumes iron instead!',
    style: 'earth',
    unlockable: 0,
    unlockable_for_avatar: 0,
    cooldown: 'slow',
    sub_bending_required: 'metal',
    execute(player) {
	    player.runCommandAsync("scoreboard players set @s cooldown1 0");
        if (checkItemAmount(player, 'minecraft:iron_ingot') < 2) {
            player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cYou don't have 2+ iron ingots to expend for this."}]}`);
            return;
        }
		player.runCommandAsync("clear @s iron_ingot -1 2");
		player.runCommandAsync("camerashake add @s 0.4 0.1 positional");
		player.runCommandAsync("effect @s resistance 100 2 true");
		player.runCommandAsync("particle a:metal_powerup ~~~");
		let particleTick = world.events.tick.subscribe(event => {
			if (!startTick) startTick = event.currentTick;
			player.runCommandAsync("particle a:metal_powerup_signal ~~~");
			if (event.currentTick - startTick > 100) {
				world.events.tick.unsubscribe(particleTick);
				startTick = undefined;
			}
		})
    }
}

export default command