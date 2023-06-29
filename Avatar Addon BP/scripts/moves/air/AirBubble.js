import { MolangVariableMap } from "@minecraft/server";
import { calcVectorOffset, setScore, playSound, delayedFunc } from "./../../util.js";

const map = new MolangVariableMap();

const command = {
    name: 'Air Bubble',
    description: 'Defend yourself from projectiles',
    style: 'air',
    unlockable: 6,
    unlockable_for_avatar: 6,
    cooldown: 'fast',
    execute(player) {
        setScore(player, "cooldown", 0);
        player.playAnimation("animation.air.bubble");

        delayedFunc(player, (airBubble) => {
            player.addEffect("resistancce", 25, { amplifier: 200, showParticles: false });
            player.dimension.spawnParticle("a:air_bubble", player.location, map);
        }, 12);
    }
}

export default command