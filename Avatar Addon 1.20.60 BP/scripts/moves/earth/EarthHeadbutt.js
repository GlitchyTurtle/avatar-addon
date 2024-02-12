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
        
        if (!getScore("ground", player)) return player.sendMessage("§cYou must be grounded to use this move.");
		player.playSound('dig.grass', { location: player.location });
        player.playAnimation("animation.earth.pound");

        if (player.location.y < -50) return player.sendMessage("You cannot use this move so low!");

        // To be executed when the animation is done
        delayedFunc(player, (earthHeadbutt) => {
            let currentTick = 0;
            const sched_ID = system.runInterval(function tick() {
                // Code
                currentTick++;
                if (currentTick > 100) return system.clearRun(sched_ID);

                // 
				player.runCommand("fill ~-1~~-1 ~1~2~1 air destroy");
				player.runCommand("camerashake add @a[r=10] 0.1 0.1 positional");
                if (player.location.y < -50) return player.sendMessage("You cannot use this move so low!");
	
                // Apply knockback (and a little bit of damage) to the entities
                const playerViewDir = player.getViewDirection()
                const entities = [...player.dimension.getEntities({ location: player.location, maxDistance: 3, excludeNames: [player.name], excludeTypes: ["item"], excludeFamilies: ["inanimate"], excludeTags: ["bending_dmg_off"] })];
                let items = [...player.dimension.getEntities({ location: player.location, maxDistance: 3, type: "item" })];
                entities.forEach(entity => applyBasicDamage(player, entity, "super_light", 1));
                items.forEach(item => { item.applyImpulse(playerViewDir) });

                
                // The end of the runtime
                if (currentTick > 50) return system.clearRun(sched_ID);
            }, 1);
        }, 12);

    }
}

export default command