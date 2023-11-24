import { system, MolangVariableMap } from "@minecraft/server";
import { calcVectorOffset, createShockwave, setScore, getScore, delayedFunc, checkItemAmount } from "../../util.js";

function findBlock(player, currentPos) {
	var currentBlock = player.dimension.getBlock(currentPos);
	while (currentBlock.isAir) {
		currentPos = { x: currentPos.x, y: currentPos.y - 1, z: currentPos.z }
		currentBlock = player.dimension.getBlock(currentPos);
	}

    currentPos = { x: currentPos.x, y: currentPos.y + 1, z: currentPos.z }
    currentBlock = player.dimension.getBlock(currentPos);

    const currentType = currentBlock.type;
	currentBlock.setType("minecraft:fire");
    delayedFunc(player, (removeDirtBlock) => {
        currentBlock.setType(currentType)
    }, Math.random() * 25 + 100);
}

const command = {
    name: 'Fire Spear',
    description: 'Summons a line of fire directly out in the direction you are looking.',
    style: 'fire',
    unlockable: 0,
    unlockable_for_avatar: 0,
    cooldown: 'super_fast',
    skill_required: "Fire Spear",
    execute(player) {
        // Setup
        setScore(player, "cooldown", 0);
        player.playAnimation("animation.fire.blast");

        // To be executed when the animation is done
        delayedFunc(player, (fireSpear) => {
            const map = new MolangVariableMap();
            const travelDir = player.getViewDirection();

            let currentTick = 0;
            let endRuntime = false;
            let currentLocation;

            travelDir.y = 0.4;
            player.addEffect("fire_resistance", 65, { amplifier: 1, showParticles: false });
            const sched_ID = system.runInterval(function tick() {
                // In case of errors
                currentTick++;
                if (currentTick > 150) return system.clearRun(sched_ID);

                // Find the block current location based on the last particle location
                let currentPos;
                let currentBlock;
                try {
                    if (!currentLocation) currentLocation = calcVectorOffset(player, -0.2, 1, currentTick, travelDir);
                    currentPos = calcVectorOffset(player, -0.2, 1, currentTick, travelDir, currentLocation);
                    currentBlock = player.dimension.getBlock(currentPos);  
                } catch (error) {
                    return system.clearRun(sched_ID);
                }

                if (!currentPos || !currentBlock) return system.clearRun(sched_ID);

				findBlock(player, currentPos);

                const nearbyEntities = [...player.dimension.getEntities({ location: currentPos, maxDistance: 1.5, excludeNames: [player.name], excludeFamilies: ["inanimate"], excludeTags: ["bending_dmg_off"] })];
                if (nearbyEntities[0] != undefined) endRuntime = true;

                if (currentTick < 15) player.playSound('mob.player.hurt_on_fire', { location: player.location });

                // The end of the runtime
                if (currentTick > 50 || endRuntime) {
                    // Particle effects and sound
                    createShockwave(player, currentPos, "high", 3, 2);
                    return system.clearRun(sched_ID);
                }
            }, 1);
        }, 12);
    }
}

export default command