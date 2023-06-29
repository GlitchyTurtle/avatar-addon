import { MolangVariableMap } from "@minecraft/server";
import { getScore, setScore, playSound, checkItemAmount, delayedFunc } from "../../util.js";

const map = new MolangVariableMap();

const command = {
    name: 'Metal Powerup',
    description: 'Gain full resistance by converting 2 iron ingots to defense! Almost no cooldown because it consumes iron instead!',
    style: 'earth',
    unlockable: 0,
    unlockable_for_avatar: 0,
    cooldown: 'slow',
    sub_bending_required: 'metal',
    execute(player) {
        // Set cooldown so they can't spam
        setScore(player, "cooldown", 0);

        if (!getScore("ground", player)) return player.sendMessage("§cYou must be grounded to use this move.");
		if (checkItemAmount(player, 'minecraft:iron_ingot') < 2) return player.sendMessage("§cYou don't have 2+ iron to expend for this.");
		player.runCommand("clear @s iron_ingot -1 2");

        // Actual move
        player.runCommand("inputpermission set @s movement disabled");
        player.dimension.spawnParticle("a:metal_powerup", player.location, map);
        player.playAnimation("animation.earth.pull");

        delayedFunc(player, (healingFocus) => {
            player.dimension.spawnParticle("a:metal_powerup_signal", player.location, map);
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