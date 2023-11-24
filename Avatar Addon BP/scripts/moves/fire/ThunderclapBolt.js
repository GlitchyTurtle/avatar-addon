import { system, MolangVariableMap } from "@minecraft/server";
import { calcVectorOffset, traceLine, setScore, delayedFunc, createShockwave, applyBasicDamage } from "../../util.js";

const command = {
    name: 'Thunderclap Bolt',
    description: 'A powerful move meant for only the firebender royal family. Channel all your power into one super powerful bolt of lightning!',
    style: 'fire',
    unlockable: 0,
    unlockable_for_avatar: 0,
    cooldown: 'slow',
    skill_required: 'Thunderclap Bolt',
    execute(player) {
        // Setup
        setScore(player, "cooldown", 0);
        player.playAnimation("animation.air.blast");
        
        player.playAnimation("animation.earth.spikes");
        player.runCommand("inputpermission set @s movement disabled");

        // To be executed when the animation is done
        delayedFunc(player, (airBall) => {
            let currentTick = 0;
            player.runCommand("inputpermission set @s movement disabled");
            player.runCommandAsync("camerashake add @a[r=10] 0.8 0.2 positional");
            const sched_ID = system.runInterval(function tick() {
                // In case of errors
                currentTick++;
                if (currentTick > 3) {
                    player.runCommand("inputpermission set @s movement enabled");
                    return system.clearRun(sched_ID);
                }

                for (let i = 0; i < 2; i++) {
                    const numLocations = 6;
                    const locations = [];
                    
                    for (let i = 0; i < numLocations; i++) {
                        const xOffset = i === numLocations - 1 ? 0 : i === 0 ? 0 : Math.random() * 2 - 1;
                        const yOffset = i === numLocations - 1 ? 0 : i === 0 ? 0.6 : Math.random() * 2 - 0.5;
                        const zOffset = i === numLocations - 1 ? 24 : 4 * i + Math.random() * 4;
                    
                        locations.push(calcVectorOffset(player, xOffset, yOffset, zOffset));
                    
                        if (i > 0) {
                            traceLine(player, locations[i - 1], locations[i], 20, "a:lightning");
                            createShockwave(player, locations[i - 1], "ultra_heavy", 3, 2);
                        }
                    }
                }

                const viewDirection = player.getViewDirection();
                player.applyKnockback(viewDirection.x, viewDirection.z, -0.5, 0);
            }, 1);
        }, 20);
        delayedFunc(player, (removeDirtBlock) => {
            player.runCommand("inputpermission set @s movement enabled");
        }, 25);
    }
}

export default command