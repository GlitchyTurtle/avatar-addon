import { getScore } from "./../util.js";

export function fireRuntime(player) {
    if (player.dimension.id === "minecraft:nether") {
        player.addEffect("strength", 200, { amplifier: 0, showParticles: false });
        player.addEffect("resistance", 200, { amplifier: 0, showParticles: false });
        player.addEffect("speed", 200, { amplifier: 0, showParticles: false });
        player.addEffect("haste", 200, { amplifier: 0, showParticles: false });
    }

    if (getScore("defTier", player) >= 5) {
        player.removeEffect("blindness");
        player.removeEffect("wither");
        player.removeEffect("poison");
        player.removeEffect("fatal_poison");
        player.removeEffect("instant_damage");
    }

    if (getScore("utiTier", player) >= 10) player.addEffect("fire_resistance", 400, { amplifier: 1, showParticles: false });
    if (getScore("mobTier", player) >= 2) player.addEffect("village_hero", 400, { amplifier: 0, showParticles: false });
    if (getScore("mobTier", player) >= 5) player.addEffect("speed", 400, { amplifier: 0, showParticles: false });
    if (getScore("mobTier", player) >= 10) player.addEffect("haste", 400, { amplifier: 1, showParticles: false });
}