import { MolangVariableMap } from "@minecraft/server";
import { delayedFunc, setScore, calculateDistance } from "./../../util.js";

const command = {
    name: 'Sensory Breath',
    description: 'Displays the basic stats of all players in a 250 block radius.',
    style: 'air',
    unlockable: 0,
    unlockable_for_avatar: 0,
    cooldown: 'fast',
    skill_required: "Breathing",
    execute(player) {
        // Setup
        setScore(player, "cooldown", 0);
        player.playAnimation("animation.air.jump");

        // To be executed when the animation is done
        delayedFunc(player, (airBlast) => {
            const map = new MolangVariableMap();
            const entities = [...player.dimension.getEntities({ location: player.location, maxDistance: 250, excludeNames: [player.name], type: "player", excludeTags: ["bending_dmg_off"] })];
        
            if (!entities.length) return player.sendMessage(`§7No players could be found.`);

            // Loop through all nearby players
            entities.forEach(entity => {
                player.sendMessage(`§7${entity.name} is ${calculateDistance(player.location, entity.location).toFixed(0)} blocks away.`);
                entity.dimension.spawnParticle("a:air_shockwave_small", entity.location, map);
            });

            player.dimension.spawnParticle("a:air_shockwave_small", player.location, map);
        }, 15);
    }
}

export default command