import { system } from "@minecraft/server";
import { calcVectorOffset, getScore, setScore, delayedFunc, playSound } from "../../util.js";

let removeBlocks = [];

function findBlock(player, currentPos) {
	var currentBlock = player.dimension.getBlock(currentPos);
	while (!currentBlock.isSolid) {
		currentPos = { x: currentPos.x, y: currentPos.y - 1, z: currentPos.z }
		currentBlock = player.dimension.getBlock(currentPos);
	}

    currentPos = { x: currentPos.x, y: currentPos.y + 1, z: currentPos.z }
    currentBlock = player.dimension.getBlock(currentPos);

    const alreadyExists = removeBlocks.some(item => item.block.location === currentBlock.location);
    if (alreadyExists || currentBlock.typeId == "minecraft:fire") return;

    const currentType = currentBlock.typeId;
    const currentPermutation = currentBlock.permutation;

    currentBlock.setType("minecraft:fire");

    removeBlocks.push({
        block: currentBlock,
        type: currentType,
        permutation: currentPermutation
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
        currentItem.block.setPermutation(currentItem.permutation)
        delayedFunc(player, resetBlocks, 1);
    }
}
  

const command = {
    name: 'Fire Spread',
    description: 'Spreads a large amount of fire directly out from the player. It\'s a surefire way to damage your opponents.',
    style: 'fire',
    unlockable: 0,
    unlockable_for_avatar: 0,
    skill_required: "Fire Spread",
    execute(player) {
        if (removeBlocks.length > 80) removeBlocks = [];

        // Setup
        

        player.playAnimation("animation.fire.push");
        player.runCommand("inputpermission set @s movement disabled");

        // To be executed when the animation is done
        delayedFunc(player, (earthSpikes) => {
            let currentTick = 1;
            let endRuntime = false;
            let currentLocation;

            const playerView = player.getViewDirection();
            const directions = [
                playerView,
                applyAngleTransform(playerView, 25),
                applyAngleTransform(playerView, 15),
                applyAngleTransform(playerView, 5),
                applyAngleTransform(playerView, -5),
                applyAngleTransform(playerView, -15),
                applyAngleTransform(playerView, -25)
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

                player.playSound('mob.ghast.fireball', {
                    location: player.location
                });

                // The end of the runtime
                if (currentTick > 10 || endRuntime) {
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