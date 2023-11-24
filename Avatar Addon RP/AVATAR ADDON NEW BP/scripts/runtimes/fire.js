import { getScore } from "./../util.js";

export function fireRuntime(player) {
    if (player.dimension.id === "minecraft:nether" && player.hasTag("nether_buff")) {
        player.addEffect("strength", 200, { amplifier: 2, showParticles: false });
        player.addEffect("resistance", 200, { amplifier: 1, showParticles: false });
        player.addEffect("speed", 200, { amplifier: 1, showParticles: false });
        player.addEffect("haste", 200, { amplifier: 1, showParticles: false });
    }

    if (player.hasTag("hot_blood")) {
        player.removeEffect("blindness");
        player.removeEffect("wither");
        player.removeEffect("poison");
        player.removeEffect("fatal_poison");
        player.removeEffect("instant_damage");
    }

    if (player.hasTag("nether_buff")) player.addEffect("fire_resistance", 400, { amplifier: 1, showParticles: false });
    if (player.hasTag("village_hero")) player.addEffect("village_hero", 400, { amplifier: 1, showParticles: false });
}