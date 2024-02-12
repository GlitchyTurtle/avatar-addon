import { MolangVariableMap } from "@minecraft/server";
import { getScore, setScore, playSound, delayedFunc } from "../../util.js";

const map = new MolangVariableMap();

const command = {
    name: 'Healing Cloud',
    description: 'Bend the water vapor in the air to heal everything around you.',
    style: 'water',
    unlockable: 0,
    unlockable_for_avatar: 0,
    skill_required: "Healing Cloud",
    execute(player) {
        
        

        // Check if they have water
        if (getScore("water_loaded", player) < 1) return player.sendMessage("§cYou don't have enough water to do that!")
        setScore(player, "water_loaded", -1, true);

        // Actual move
        player.playAnimation("animation.water.healing");
        
        // To be executed when the animation is done
        delayedFunc(player, (healingCloud) => {
            playSound(player, 'beacon.power', 1, player.location, 2);
            player.dimension.spawnParticle("a:water_healing_area", player.location, map);
            const location = player.location;

            const entities = [...player.dimension.getEntities({ location: location, maxDistance: 10 })];
            entities.forEach(entity => {
                entity.addEffect("regeneration", 200, { amplifier: 1, showParticles: true });
                entity.addEffect("fire_resistance", 300, { amplifier: 1, showParticles: false });
            });
        }, 6);
    }
}

export default command