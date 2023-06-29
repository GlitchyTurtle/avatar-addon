import { system } from "@minecraft/server";
import { calcVectorOffset, getScore, setScore, delayedFunc } from "../../util.js";

function findBlock(player, currentPos) {
	var currentBlock = player.dimension.getBlock(currentPos);
	while (!currentBlock.isSolid()) {
		currentPos = { x: currentPos.x, y: currentPos.y - 1, z: currentPos.z }
		currentBlock = player.dimension.getBlock(currentPos);
	}
	player.runCommand(`summon evocation_fang ${currentPos.x} ${currentPos.y + 1} ${currentPos.z}`)
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
    name: 'Earth Spike Wave',
    description: 'Send a shockwave of spikes out in every direction to push back opponents or just deal heavy damage.',
    style: 'earth',
    unlockable: 8,
    unlockable_for_avatar: 49,
    cooldown: 'fast',
    off_tier_required: 10,
    execute(player) {
        // Setup
        setScore(player, "cooldown", 0);
        if (!getScore("ground", player)) return player.sendMessage("§cYou must be grounded to use this move.");

        player.playAnimation("animation.earth.shockwave");
        player.runCommand("inputpermission set @s movement disabled");

        // To be executed when the animation is done
        delayedFunc(player, (earthSpikes) => {
            let currentTick = 1;
            let endRuntime = false;
            let currentLocation;
            
            const sched_ID = system.runInterval(function tick() {
                // In case of errors
                currentTick++;
                if (currentTick > 150) return system.clearRun(sched_ID);

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

                // The end of the runtime
                if (currentTick > 50 || endRuntime) {
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