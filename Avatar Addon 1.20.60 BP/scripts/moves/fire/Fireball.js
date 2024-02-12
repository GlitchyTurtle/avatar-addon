import { setScore, playSound, calcVectorOffset, delayedFunc } from "../../util.js";

const command = {
    name: 'Fireball',
    description: "Launch a fireball in the direction you're looking!",
    style: 'fire',
    unlockable: 4,
    unlockable_for_avatar: 65,
    cooldown: 'super_fast',
    execute(player) {
        // Setup
        
        player.playAnimation("animation.fire.blast");

        // After Animation
        delayedFunc(player, async (fireball) => {
            playSound(player, 'mob.shulker.shoot', 1, player.location, 3);
            player.dimension.spawnEntity('minecraft:fireball', calcVectorOffset(player, 0, 1, 2));
            player.runCommand("damage @e[r=10,c=1,type=fireball] 1 entity_attack entity @s");
        }, 10);
    }
}

export default command