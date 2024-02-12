import { MolangVariableMap } from "@minecraft/server";
import { setScore, getScore, delayedFunc, playSound } from "./../../util.js";

const map = new MolangVariableMap();

const command = {
    name: 'Fire Charge',
    description: "Invigorate yourself mid-fight with fire to get a few extra hearts!",
    style: 'fire',
    unlockable: 5,
    unlockable_for_avatar: 66,
    execute(player) {
        
        player.runCommand("inputpermission set @s movement disabled");
        player.runCommand("camerashake add @a[r=15] 0.4 1 positional");
        player.playAnimation("animation.fire.pull");
        playSound(player, 'mob.shulker.shoot', 1, player.location, 3);
        player.addEffect("resistance", 10, { amplifier: 255, showParticles: false });

        if (getScore("level", player) >= 100) {
            player.dimension.spawnParticle("a:fire_blue_charge_quick", player.location, map);
        } else {
            player.dimension.spawnParticle("a:fire_charge_quick", player.location, map);
        }

        delayedFunc(player, (fireCharge) => {
            player.addEffect("saturation", 600, { amplifier: 255, showParticles: false });
            player.addEffect("regeneration", 100, { amplifier: 1, showParticles: false });
            player.addEffect("speed", 10, { amplifier: 5, showParticles: false });
        }, 10);

        delayedFunc(player, (moveAgain) => {
            player.runCommand("inputpermission set @s movement enabled");
        }, 20);
    }
}

export default command