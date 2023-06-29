import { system, MolangVariableMap } from "@minecraft/server";
import { calcVectorOffset, getScore, setScore, delayedFunc } from "../../util.js";

function findBlock(player, currentPos) {
	var currentBlock = player.dimension.getBlock(currentPos);
	while (!currentBlock.isSolid()) {
		currentPos = { x: currentPos.x, y: currentPos.y - 1, z: currentPos.z }
		currentBlock = player.dimension.getBlock(currentPos);
	}
	player.runCommand(`summon evocation_fang ${currentPos.x} ${currentPos.y + 1} ${currentPos.z}`)
}

const command = {
    name: 'Earth Spikes',
    description: 'Summons spikes in a line out from the player, which can be steered by moving.',
    style: 'earth',
    unlockable: 8,
    unlockable_for_avatar: 49,
    cooldown: 'fast',
    execute(player) {
        // Setup
        setScore(player, "cooldown", 0);
        if (!getScore("ground", player)) return player.sendMessage("§cYou must be grounded to use this move.");

        player.playAnimation("animation.earth.spikes");
        player.runCommand("inputpermission set @s movement disabled");

        // To be executed when the animation is done
        delayedFunc(player, (earthSpikes) => {
            const travelDir = player.getViewDirection();

            // I've found this specific number to be the best
            travelDir.y = 0.4;

            let currentTick = 0;
            let endRuntime = false;
            let currentLocation;
            
            const sched_ID = system.runInterval(function tick() {
                // In case of errors
                currentTick++;
                if (currentTick > 150) return system.clearRun(sched_ID);

                // Find the block current location based on the last particle location
                let currentPos;
                let currentBlock;
                try {
                    if (!currentLocation) currentLocation = calcVectorOffset(player, 0, 1, currentTick + 1, travelDir);
                    currentPos = calcVectorOffset(player, 0, 1, currentTick + 1, travelDir, currentLocation);
                    currentBlock = player.dimension.getBlock(currentPos);  
                } catch (error) {
                    return system.clearRun(sched_ID);
                }

                if (!currentPos || !currentBlock) return system.clearRun(sched_ID);

				findBlock(player, currentPos);

                // The end of the runtime
                if (currentTick > 50 || endRuntime) {
                    return system.clearRun(sched_ID);
                }
            }, 1);
        }, 20);
        delayedFunc(player, (removeDirtBlock) => {
            player.runCommand("inputpermission set @s movement enabled");
        }, 35);
    }
}

export default command