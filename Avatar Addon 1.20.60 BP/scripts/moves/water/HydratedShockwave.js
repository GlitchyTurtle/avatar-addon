import { MolangVariableMap } from "@minecraft/server";
import { delayedFunc, createShockwave, getScore, setScore, playSound } from "../../util.js";

const command = {
    name: 'Hydrated Shockwave',
    description: 'Blast out a powerful wave of water that consumes all the water you have, with the damage and range scaling the more water you had.',
    style: 'water',
    unlockable: 0,
    unlockable_for_avatar: 0,
    skill_required: "Hydrated Shockwave",
    execute(player) {
        
        

        // Check if they have water
        const WATER_LOADED = getScore("water_loaded", player);
        if (WATER_LOADED < 1) return player.sendMessage("§cYou don't have enough water to do that!")
        setScore(player, "water_loaded", 0);

        player.playAnimation("animation.water.shockwave");
        player.runCommand("inputpermission set @s movement disabled");

        // To be executed when the animation is done
        delayedFunc(player, shockWave => {
            const playerPos = player.location;
            const map = new MolangVariableMap();
            player.dimension.spawnParticle("a:water_wave", playerPos, map);
            playSound(player, 'random.explode', 1, playerPos, 5);
            createShockwave(player, playerPos, "ultra_heavy", WATER_LOADED*2.5, WATER_LOADED/3);
        }, 5);

        delayedFunc(player, movementReturn => {
            player.runCommand("inputpermission set @s movement enabled");
        }, 55)
    }
}

export default command