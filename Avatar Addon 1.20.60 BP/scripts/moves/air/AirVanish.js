import { MolangVariableMap } from "@minecraft/server";
import { setScore, playSound, delayedFunc } from "../../util.js";

const command = {
    name: 'Air Vanish',
    description: 'Puff up a smokesreen and get invisiblity for 10 seconds to vanish out of sight.',
    style: 'air',
    unlockable: 8,
    unlockable_for_avatar: 8,
    cooldown: 'fast',
    execute(player) {
        
        player.playAnimation("animation.air.vanish");
        player.runCommand("inputpermission set @s movement disabled");
        
        delayedFunc(player, (airVanish) => {
            const currentLocation = { x: player.location.x, y: player.location.y, z: player.location.z };
            player.dimension.spawnParticle("a:air_vanish", currentLocation, new MolangVariableMap());
            player.addEffect("invisibility", 200, { amplifier: 1, showParticles: false });
            playSound(player, 'random.explode', 1, currentLocation, 2);
            player.runCommand("inputpermission set @s movement enabled");
        }, 10);
    }
}

export default command