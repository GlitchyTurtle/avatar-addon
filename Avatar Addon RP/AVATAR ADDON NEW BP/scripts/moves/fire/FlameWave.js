import { system, world } from "@minecraft/server";
import { calcVectorOffset, getScore, setScore, delayedFunc } from "../../util.js";

function findBlock(player, currentPos, currentTick) {
	var currentBlock = player.dimension.getBlock(currentPos);
    currentPos = { x: currentBlock.x, y: currentBlock.y, z: currentBlock.z }

	while (!currentBlock.isSolid) {
		currentPos = { x: currentPos.x, y: currentPos.y - 1, z: currentPos.z }
		currentBlock = player.dimension.getBlock(currentPos);
	}

    currentPos = { x: currentPos.x, y: currentPos.y + 1, z: currentPos.z }
    currentBlock = player.dimension.getBlock(currentPos);

    const currentType = currentBlock.typeId;
    const currentPermutation = currentBlock.permutation;
    
	currentBlock.setType("minecraft:fire");
    delayedFunc(player, (removeDirtBlock) => {
        currentBlock.setType(currentType)
        currentBlock.setPermutation(currentPermutation)
    }, currentTick + 100);
}

const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [1, 1],
    [-1, 1],
    [1, -1],
    [-1, -1]
]

const command = {
    name: 'Flame Wave',
    description: 'Send a line of fire out in every direction to push back opponents or just deal passive damage.',
    style: 'fire',
    unlockable: 0,
    unlockable_for_avatar: 0,
    cooldown: 'fast',
    skill_required: "Flame Wave",
    execute(player) {
        // Setup
        setScore(player, "cooldown", 0);

        player.playAnimation("animation.fire.shockwave");
        player.runCommand("inputpermission set @s movement disabled");

        // To be executed when the animation is done
        delayedFunc(player, (earthSpikes) => {
            player.addEffect("fire_resistance", 65, { amplifier: 1, showParticles: false });
            let currentTick = 1;
            let endRuntime = false;
            let currentLocation;
            
            const sched_ID = system.runInterval(function tick() {
                // In case of errors
                currentTick++;
                if (currentTick > 50) return system.clearRun(sched_ID);

                for (const direction of directions) {
                    const travelDir = {
                        x: direction[0],
                        y: 0.4,
                        z: direction[1]
                    }

                    let currentPos;
                    if (!currentLocation) currentLocation = player.location;
                    currentPos = calcVectorOffset(player, 0, 0, currentTick, travelDir, currentLocation);
                    findBlock(player, currentPos, currentTick);
                }

                if (currentTick < 15) player.playSound('mob.player.hurt_on_fire', { location: player.location });

                // The end of the runtime
                if (currentTick > 25 || endRuntime) {
                    return system.clearRun(sched_ID);
                }
            }, 1);
        }, 10);
        delayedFunc(player, (removeDirtBlock) => {
            player.runCommand("inputpermission set @s movement enabled");
        }, 20);
    }
}

export default command