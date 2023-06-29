import { MolangVariableMap, MinecraftBlockTypes } from "@minecraft/server";
import { getScore, setScore, delayedFunc } from "../../util.js";

const map = new MolangVariableMap();

const command = {
    name: 'Earth Burrow',
    description: 'Burrow 2 blocks under the ground to escape enemies, and look like you just teleported.',
    style: 'earth',
    unlockable: 1,
    unlockable_for_avatar: 42,
    cooldown: 'slow',
    execute(player) {
        // Setup
        setScore(player, "cooldown", 0);
        if (!getScore("ground", player)) return player.sendMessage("§cYou must be grounded to use this move.");

        player.playAnimation("animation.earth.spin");
        player.runCommand("inputpermission set @s movement disabled");
		player.runCommand("camerashake add @s 0.4 0.1 positional");

        delayedFunc(player, (removeDirtBlock) => {
            player.runCommand("inputpermission set @s movement enabled");
            player.dimension.spawnParticle("a:earth_shockwave_small", player.location, map);
            
            const { x, y, z } = player.location;
            player.teleport({ x: x, y: y - 4, z: z}, { dimension: player.dimension, keepVelociy: true });
            const head = player.dimension.getBlock({ x: player.location.x, y: player.location.y + 1, z: player.location.z });
            const feet = player.dimension.getBlock({ x: player.location.x, y: player.location.y, z: player.location.z });
            if (head.typeId === "minecraft:bedrock" || feet.typeId === "minecraft:bedrock") return player.sendMessage("§cDon't even try that.");
            head.setType(MinecraftBlockTypes.air);
            feet.setType(MinecraftBlockTypes.air);
        }, 10);
    }
}

export default command