import { MolangVariableMap } from "@minecraft/server";
import { setScore, playSound } from "./../../util.js";

const command = {
    name: 'Elytra Boost',
    description: 'Speed yourself up in the air, just like a rocket!',
    style: 'air',
    unlockable: 12,
    unlockable_for_avatar: 12,
    cooldown: 'fast',
    execute(player) {
        // Check that we are in the air
        let map = new MolangVariableMap();
        let {x, y, z} = player.location;
        let ground = player.dimension.getBlock({x: x, y: y - 3, z: z});
        if (!ground.isAir) return player.sendMessage("§cYou must be in the air to use this move!");
        
        // Add velocity and other effects
        const viewDirection = player.getViewDirection();
        player.playAnimation("animation.air.spin");
        player.applyKnockback(viewDirection.x, viewDirection.z, 4, viewDirection.y);
        player.dimension.spawnParticle("a:air_leap", player.location, map);
        
        playSound(player, 'random.explode', 1, player.location, 3);
    }
}

export default command