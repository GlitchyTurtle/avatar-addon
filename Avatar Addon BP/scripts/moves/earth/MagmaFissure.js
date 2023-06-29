import { system, MolangVariableMap, MinecraftBlockTypes } from "@minecraft/server";
import { calcVectorOffset, createShockwave, setScore, getScore, delayedFunc, checkItemAmount } from "../../util.js";

function findBlock(player, currentPos) {
	var currentBlock = player.dimension.getBlock(currentPos);
	while (!currentBlock.isSolid()) {
		currentPos = { x: currentPos.x, y: currentPos.y - 1, z: currentPos.z }
		currentBlock = player.dimension.getBlock(currentPos);
	}

    const currentType = currentBlock.type;
	currentBlock.setType(MinecraftBlockTypes.lava);
    delayedFunc(player, (removeDirtBlock) => {
        currentBlock.setType(currentType)
    }, Math.random() * 25 + 100);
}

const command = {
    name: 'Magma Fissure',
    description: 'Summons a line of lava directly out in the direction you are looking.',
    style: 'earth',
    unlockable: 50,
    unlockable_for_avatar: 50,
    sub_bending_required: 'lava',
    cooldown: 'super_fast',
    execute(player) {
        // Setup
        setScore(player, "cooldown", 0);
        player.playAnimation("animation.air.blast");
        if (!getScore("ground", player)) return player.sendMessage("§cYou must be grounded to use this move.");

		if (checkItemAmount(player, 'minecraft:dirt') < 8) return player.sendMessage("§cYou don't have 8+ dirt to expend for this.");
		player.runCommand("clear @s dirt -1 8");

        // To be executed when the animation is done
        delayedFunc(player, (airBall) => {
            const map = new MolangVariableMap();
            const travelDir = player.getViewDirection();

            let currentTick = 0;
            let endRuntime = false;
            let currentLocation;

            travelDir.y = 0.4;
            
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

                // The end of the runtime
                if (currentTick > 50 || endRuntime) {
                    // Particle effects and sound
                    createShockwave(player, currentPos, 3, 3, 2);
                    return system.clearRun(sched_ID);
                }
            }, 1);
        }, 12);
    }
}

export default command