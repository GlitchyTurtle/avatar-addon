import { MolangVariableMap } from "@minecraft/server";
import { delayedFunc, createShockwave, setScore, playSound } from "./../../util.js";

const map = new MolangVariableMap();

const command = {
    name: 'Earth Shove',
    description: 'Blasts a shockwave and does lots of damage to nearby players. Can also stop you from taking damage.',
    style: 'earth',
    unlockable: 2,
    unlockable_for_avatar: 43,
    cooldown: 'super_fast',
    damage_factor: 4,
    execute(player) {
        // Setup
        setScore(player, "cooldown", 0);

        player.playAnimation("animation.earth.shockwave");
        player.runCommand("inputpermission set @s movement disabled");
        
        // To be executed when the animation is done
        delayedFunc(player, earthShockwave => {
            const playerPos = player.location;
            playSound(player, "dig.grass", 1, playerPos, 5);
            createShockwave(player, player.location, "high", 7, 3);
            player.dimension.spawnParticle("a:earth_shockwave", playerPos, map);
            player.addEffect("resistance", 25, { amplifier: 255, showParticles: false });
            player.runCommandAsync("camerashake add @a[r=10] 0.3 0.1 positional");
        }, 10);
        delayedFunc(player, (removeDirtBlock) => {
            player.runCommand("inputpermission set @s movement enabled");
        }, 35);
    }
}

export default command