import { MolangVariableMap } from "@minecraft/server";
import { createShockwave, calcVectorOffset, setScore, playSound } from "../../util.js";

const command = {
    name: 'Concussive Pop',
    description: "Shoot enemies away with a small explosion or yourself up into the air!",
    style: 'fire',
    unlockable: 15,
    unlockable_for_avatar: 0,
    cooldown: 'super_fast',
    sub_bending_required: 'combustion',
    damage_factor: 3,
    execute(player) {
        // Setup
        setScore(player, "cooldown", 0);

        var currentPos = calcVectorOffset(player, 0, 1, 5);
        var currentBlock = player.dimension.getBlock(currentPos);

        while (currentBlock.isSolid()) {
            currentPos = { x: currentPos.x, y: currentPos.y + 1.5, z: currentPos.z }
            currentBlock = player.dimension.getBlock(currentPos);
        }
        
        const viewDirection = player.getViewDirection();
        player.applyKnockback(viewDirection.x, viewDirection.z, -3, -viewDirection.y/2);

        const map = new MolangVariableMap();
        player.dimension.spawnParticle("minecraft:large_explosion", currentPos, map);
        playSound(player, 'random.explode', 1, currentPos, 5);
        createShockwave(player, currentPos, 3, 3, this.damage_factor);  
    }
}

export default command