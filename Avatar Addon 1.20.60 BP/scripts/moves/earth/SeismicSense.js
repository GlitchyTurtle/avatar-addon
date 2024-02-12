import { delayedFunc, setScore, calculateDistance, getScore } from "../../util.js";

const command = {
    name: 'Seismic Sense',
    description: 'Displays the basic stats of all players in a 150 block radius along with their location!',
    style: 'earth',
    unlockable: 0,
    unlockable_for_avatar: 0,
    cooldown: 'fast',
    skill_required: "Seismic Sense",
    execute(player) {
        // Setup
        
        player.playAnimation("animation.earth.shockwave");

        // To be executed when the animation is done
        delayedFunc(player, (airBlast) => {
            const entities = [...player.dimension.getEntities({ location: player.location, maxDistance: 500, excludeNames: [player.name], type: "player", excludeTags: ["bending_dmg_off"] })];
        
            if (!entities.length) return player.sendMessage(`§7No players could be found.`);

            // Loop through all nearby players
            entities.forEach(entity => {
                const loc = entity.location;
                player.sendMessage(`§7${entity.name} is ${calculateDistance(player.location, loc).toFixed(0)} blocks away, at ${loc.x.toFixed(0)} ${loc.y.toFixed(0)} ${loc.z.toFixed(0)}.`);
            });
        }, 15);
    }
}

export default command