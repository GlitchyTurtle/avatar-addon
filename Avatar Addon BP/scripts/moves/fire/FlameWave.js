import { system, MinecraftBlockTypes } from "@minecraft/server";
import { calcVectorOffset, getScore, setScore, delayedFunc } from "../../util.js";

function findBlock(player, currentPos) {
	var currentBlock = player.dimension.getBlock(currentPos);
	while (currentBlock.isAir()) {
		currentPos = { x: currentPos.x, y: currentPos.y - 1, z: currentPos.z }
		currentBlock = player.dimension.getBlock(currentPos);
	}

    currentPos = { x: currentPos.x, y: currentPos.y + 1, z: currentPos.z }
    currentBlock = player.dimension.getBlock(currentPos);

    const currentType = currentBlock.type;
	currentBlock.setType(MinecraftBlockTypes.fire);
    delayedFunc(player, (removeDirtBlock) => {
        currentBlock.setType(currentType)
    }, Math.random() * 25 + 100);
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
    unlockable: 8,
    unlockable_for_avatar: 49,
    cooldown: 'fast',
    off_tier_required: 5,
    execute(player) {
        // Setup
        setScore(player, "cooldown", 0);

        player.playAnimation("animation.fire.shockwave");
        player.runCommand("inputpermission set @s movement disabled");

        // To be executed when the animation is done
        delayedFunc(player, (earthSpikes) => {
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
                    findBlock(player, currentPos);
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
        }, 35);
    }
}

export default command