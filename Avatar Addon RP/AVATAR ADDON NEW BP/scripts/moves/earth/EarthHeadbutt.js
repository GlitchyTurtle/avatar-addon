import { system } from '@minecraft/server'
import { applyBasicDamage, setScore, getScore, delayedFunc } from "./../../util.js";

const command = {
    name: 'Earth Headbutt',
    description: 'Run fast and deal damage to nearby players!',
    style: 'earth',
    unlockable: 5,
    unlockable_for_avatar: 46,
    cooldown: 'slow',
    execute(player) {
        setScore(player, "cooldown", 0);
        if (!getScore("ground", player)) return player.sendMessage("§cYou must be grounded to use this move.");
		player.playSound('dig.grass', { location: player.location });
        player.playAnimation("animation.earth.pound");

        // To be executed when the animation is done
        delayedFunc(player, (earthHeadbutt) => {
            let currentTick = 0;
            const sched_ID = system.runInterval(function tick() {
                // Code
                currentTick++;
                if (currentTick > 100) return system.clearRun(sched_ID);

				player.runCommand("fill ~-1~~-1 ~1~2~1 air destroy");
				player.runCommand(`kill @e[type=item,name="bedrock"]`);
				player.runCommand("camerashake add @a[r=10] 0.1 0.1 positional");

				const entities = player.getEntitiesFromViewDirection({ maxDistance: 75, excludeTypes: ["item"], excludeFamilies: ["inanimate"], excludeTags: ["bending_dmg_off"] });
				entities.forEach(eventEntity => applyBasicDamage(player, eventEntity.entity, "super_light", 1));

                // The end of the runtime
                if (currentTick > 50) return system.clearRun(sched_ID);
            }, 1);
        }, 12);

    }
}

export default command