import { MolangVariableMap } from "@minecraft/server";
import { createShockwave, calcVectorOffset, setScore, playSound } from "../../util.js";

const command = {
    name: 'Concussive Pop',
    description: "Shoot enemies away with a small explosion or yourself up into the air!",
    style: 'fire',
    unlockable: 0,
    unlockable_for_avatar: 0,
    cooldown: 'super_fast',
    skill_required: 'Concussive Pop',
    execute(player) {
        // Setup
        

        var currentPos = calcVectorOffset(player, 0, 1, 5);
        var currentBlock = player.dimension.getBlock(currentPos);

        while (currentBlock.isSolid) {
            currentPos = { x: currentPos.x, y: currentPos.y + 1.5, z: currentPos.z }
            currentBlock = player.dimension.getBlock(currentPos);
        }
        
        const viewDirection = player.getViewDirection();
        player.applyKnockback(viewDirection.x, viewDirection.z, -3, -viewDirection.y/2);

        const map = new MolangVariableMap();
        player.dimension.spawnParticle("minecraft:large_explosion", currentPos, map);
        playSound(player, 'random.explode', 1, currentPos, 5);
        createShockwave(player, currentPos, "high", 3, 3);  
    }
}

export default command