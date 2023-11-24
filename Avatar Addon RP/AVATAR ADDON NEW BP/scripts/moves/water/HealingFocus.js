import { MolangVariableMap } from "@minecraft/server";
import { getScore, setScore, playSound, delayedFunc } from "../../util.js";

const map = new MolangVariableMap();

const command = {
    name: 'Healing Focus',
    description: 'Heal just yourself, quickly.',
    style: 'water',
    unlockable: 0,
    unlockable_for_avatar: 0,
    cooldown: 'fast',
    skill_required: "Healing Focus",
    execute(player) {
        // Set cooldown so they can't spam
        setScore(player, "cooldown", 0);

        // Check if they have water
        if (getScore("water_loaded", player) < 1) return player.sendMessage("§cYou don't have enough water to do that!")
        setScore(player, "water_loaded", -1, true);

        // Actual move
        player.runCommand("inputpermission set @s movement disabled");
        player.dimension.spawnParticle("a:water_healing", player.location, map);
        player.playAnimation("animation.water.slow_healing");

        delayedFunc(player, (healingFocus) => {
            playSound(player, 'beacon.power', 1, player.location, 2);
            player.addEffect("regeneration", 45, { amplifier: 3, showParticles: true });
            player.addEffect("fire_resistance", 300, { amplifier: 1, showParticles: false });
            player.addEffect("saturation", 600, { amplifier: 255, showParticles: false });
            player.removeEffect("blindness");
            player.removeEffect("wither");
            player.removeEffect("poison");
            player.removeEffect("fatal_poison");
        }, 18);

        delayedFunc(player, (moveAgain) => {
            player.runCommand("inputpermission set @s movement enabled");
        }, 35)
    }
}

export default command