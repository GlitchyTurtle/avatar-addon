import { system, MolangVariableMap } from '@minecraft/server'
import { setScore, delayedFunc, calcVectorOffset, createShockwave, traceLine } from "../../util.js";

const command = {
    name: 'Lightning Discharge',
    description: 'Charge and release a shockwave sphere of lightning on multiple enemies in a radius of up to 8 blocks out!',
    style: 'fire',
    unlockable: 0,
    unlockable_for_avatar: 0,
    skill_required: 'Lightning Discharge',
    cooldown: 'super_fast',
    execute(player) {

        const directions = [
            [-0.78, 0.099, 0.244],
            [0.195, -0.764, 0.667],
            [0.315, -0.808, 0.68],
            [0.761, -0.796, 0.519],
            [-0.844, 0.948, 0.481],
            [0.853, -0.897, -0.08],
            [-0.934, -0.401, -0.993],
            [0.662, 0.949, 0.363],
            [0.479, -0.493, -0.37],
            [0.19, 0.707, 0.797],
            [0.06, -0.767, -0.973],
            [0.941, 0.55, 0.398],
            [0.739, 0.708, -0.1],
            [0.313, 0.547, -0.99],
            [0.801, 0.29, -0.605],
            [0.455, -0.178, -0.143],
            [0.029, -0.69, -0.167],
            [-0.713, -0.498, -0.057],
            [0.533, -0.649, 0.904],
            [-0.553, 0.943, 0.103],
            [-0.571, -0.123, -0.687],
            [-0.82, 0.983, -0.702],
            [0.012, 0.583, 0.284],
            [0.056, -0.266, -0.841],
            [-0.855, 0.53, -0.567],
            [-0.825, -0.526, 0.37],
            [-0.252, 0.645, 0.449],
            [-0.628, 0.245, -0.786],
            [0.377, 0.723, -0.276],
            [-0.354, -0.538, -0.289],
            [0.277, 0.784, 0.315],
            [0.164, 0.385, 0.964],
            [-0.848, 0.977, -0.463],
            [0.34, 0.562, 0.428],
            [0.179, -0.987, -0.728],
            [0.561, -0.044, -0.268],
            [-0.195, 0.125, -0.612],
            [-0.319, 0.607, 0.874],
            [0.305, -0.727, -0.066],
            [-0.443, 0.49, -0.059],
            [-0.532, -0.947, 0.032],
            [0.588, -0.614, 0.862],
            [-0.817, 0.849, 0.143],
            [0.403, -0.903, -0.36],
            [-0.001, -0.14, -0.671],
            [-0.352, 0.68, -0.89],
            [-0.145, 0.163, -0.55],
            [-0.733, 0.283, -0.056],
            [0.34, 0.199, 0.681],
            [-0.312, -0.688, 0.818],
            [-0.605, 0.961, 0.056],
            [0.696, 0.69, 0.672],
            [0.405, 0.11, -0.754],
            [-0.257, -0.977, -0.653],
            [0.188, -0.672, 0.094],
            [-0.831, 0.993, -0.026],
            [0.341, 0.066, -0.142],
            [-0.802, 0.329, -0.769],
            [0.094, -0.014, 0.278],
            [-0.289, 0.486, 0.236],
            [-0.002, 0.318, 0.487],
            [-0.311, 0.164, 0.033],
            [0.629, 0.252, -0.8],
            [-0.64, -0.482, 0.927],
            [-0.665, -0.124, -0.901],
            [0.433, -0.066, 0.262],
            [0.766, 0.68, 0.231],
            [0.218, -0.591, 0.13],
            [0.96, 0.218, 0.172]
        ]

        // Setup
        setScore(player, "cooldown", 0);

        player.playAnimation("animation.earth.shockwave");
        player.runCommand("inputpermission set @s movement disabled");

        //player.dimension.spawnParticle("a:lightning_charge", player.location, map);

        // To be executed when the animation is done
        delayedFunc(player, (earthSpikes) => {
            let currentTick = 1;
            let endRuntime = false;
            let currentLocation;

            createShockwave(player, player.location, "ultra_heavy", 10, 2);
            
            player.runCommandAsync("camerashake add @a[r=10] 0.5 0.3 positional");
            const sched_ID = system.runInterval(function tick() {
                // In case of errors
                currentTick++;
                if (currentTick > 6) return system.clearRun(sched_ID);

                for (const direction of directions) {
                    const travelDir = {
                        x: direction[0],
                        y: direction[1],
                        z: direction[2]
                    }

                    let currentPos;
                    let previousPos;
                    if (!currentLocation) currentLocation = player.location;
                    previousPos = calcVectorOffset(player, 0, 0, currentTick - 1, travelDir, currentLocation);
                    currentPos = calcVectorOffset(player, 0, 0, currentTick, travelDir, currentLocation);
                    
                    if (previousPos) traceLine(player, currentPos, previousPos, 8, "a:lightning_remain")

                    const currentBlock = player.dimension.getBlock(currentPos);
                    if (currentBlock.isSolid) {
                        directions.splice(directions.indexOf(direction), 1);
                        continue;
                    };
                }

                // The end of the runtime
                if (currentTick > 5 || endRuntime) {
                    return system.clearRun(sched_ID);
                }
            }, 1);
        }, 5);
        delayedFunc(player, (removeDirtBlock) => {
            player.runCommand("inputpermission set @s movement enabled");
        }, 20);
    }
}

export default command