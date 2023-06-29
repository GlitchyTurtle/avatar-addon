import { system, MinecraftBlockTypes } from "@minecraft/server";
import { calcVectorOffset, getScore, setScore, delayedFunc, playSound } from "../../util.js";

let removeBlocks = [];

function findBlock(player, currentPos) {
	var currentBlock = player.dimension.getBlock(currentPos);
	while (!currentBlock.isSolid()) {
		currentPos = { x: currentPos.x, y: currentPos.y - 1, z: currentPos.z }
		currentBlock = player.dimension.getBlock(currentPos);
	}

    const alreadyExists = removeBlocks.some(item => item.block.location === currentBlock.location);
    if (alreadyExists || currentBlock.typeId == "minecraft:air") return;

    const currentType = currentBlock.type;
    currentBlock.setType(MinecraftBlockTypes.air);

    removeBlocks.push({
        block: currentBlock,
        type: currentType
    });
    
}

function applyAngleTransform(viewVector, angleDegrees) {
    // Convert angle to radians
    const angle = angleDegrees * (Math.PI / 180);
  
    // Normalize the view vector
    const magnitude = Math.sqrt(viewVector.x ** 2 + viewVector.y ** 2 + viewVector.z ** 2);
    const normalizedVector = {
        x: viewVector.x / magnitude,
        y: viewVector.y / magnitude,
        z: viewVector.z / magnitude,
    };
  
    // Calculate sine and cosine of the angle
    const cosAngle = Math.cos(angle);
    const sinAngle = Math.sin(angle);
  
    // Apply the angle transform
    const transformedVector = {
        x: normalizedVector.x * cosAngle - normalizedVector.z * sinAngle,
        y: normalizedVector.y,
        z: normalizedVector.x * sinAngle + normalizedVector.z * cosAngle,
    };
  
    return transformedVector;
}

function resetBlocks(player) {
    if (removeBlocks.length > 0) {
        let currentItem = removeBlocks.shift();
        currentItem.block.setType(currentItem.type);
        delayedFunc(player, resetBlocks, 1);
    }
}
  

const command = {
    name: 'Earth Rend',
    description: 'Create a fissure in the earth in front of your feet to trap opponents underground.',
    style: 'earth',
    unlockable: 8,
    unlockable_for_avatar: 49,
    off_tier_required: 1,
    execute(player) {
        // Possible memory leak fix
        if (removeBlocks.length > 40) removeBlocks = [];

        // Setup
        setScore(player, "cooldown", 0);
        if (!getScore("ground", player)) return player.sendMessage("§cYou must be grounded to use this move.");

        player.playAnimation("animation.earth.shockwave");
        player.runCommand("inputpermission set @s movement disabled");

        // To be executed when the animation is done
        delayedFunc(player, (earthSpikes) => {
            let currentTick = 0;
            let endRuntime = false;
            let currentLocation;

            const playerView = player.getViewDirection();
            const directions = [
                playerView,
                applyAngleTransform(playerView, 15),
                applyAngleTransform(playerView, 5),
                applyAngleTransform(playerView, -5),
                applyAngleTransform(playerView, -15)
            ]
            
            const sched_ID = system.runInterval(function tick() {
                // In case of errors
                currentTick++;
                if (currentTick > 20) return system.clearRun(sched_ID);

                for (const direction of directions) {
                    const travelDir = {
                        x: direction.x,
                        y: 0.4,
                        z: direction.z
                    }
                    
                    let currentPos;
                    if (!currentLocation) currentLocation = player.location;
                    currentPos = calcVectorOffset(player, 0, 0, currentTick, travelDir, currentLocation);
                    findBlock(player, currentPos);
                }

                player.playSound('dig.grass', {
                    location: player.location
                });

                // The end of the runtime
                if (currentTick > 10 || endRuntime) {
                    setScore(player, "cooldown", 0);
                    return system.clearRun(sched_ID);
                }
            }, 1);
        }, 10);
        delayedFunc(player, (removeDirtBlock) => {
            player.runCommand("inputpermission set @s movement enabled");
        }, 35);
        delayedFunc(player, resetBlocks, 40);
    }
}

export default command