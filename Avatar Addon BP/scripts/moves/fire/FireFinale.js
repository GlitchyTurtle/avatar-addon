import { MolangVariableMap } from "@minecraft/server";
import { setScore, playSound, delayedFunc, createShockwave } from "../../util.js";

const map = new MolangVariableMap();

const command = {
    name: 'Fire Finale',
    description: 'Punch a massive combustive impact into the ground, killing you (no matter what) and all nearby entities, but with a five second fuse! Hopefully you never have to use it.',
    style: 'fire',
    unlockable: 9,
    unlockable_for_avatar: 70,
    damage_factor: 10,
    execute(player) {
        setScore(player, "cooldown", 0);
        setScore(player, "combat", 100000);
        player.runCommand("inputpermission set @s movement disabled");
        player.runCommand("camerashake add @a[r=15] 0.4 10 positional");
        player.playAnimation("animation.fire.pull");

        // Loop through all nearby players
        const entities = [...player.dimension.getEntities({ location: player.location, maxDistance: 15, excludeNames: [player.name], type: "player" })];
        entities.forEach(entity => {
            entity.sendMessage(`§7${player.name} used Fire Finale! RUN!`);
        });

        delayedFunc(player, (fireFinale) => {
            const playerPos = player.location;
            player.runCommand("inputpermission set @s movement enabled");

            // Particle effects and sound
            player.dimension.spawnParticle("minecraft:huge_explosion_emitter", playerPos, map);
            player.dimension.createExplosion(playerPos, 5, { breaksBlocks: true });
            playSound(player, 'random.explode', 1, playerPos, 5);
            createShockwave(player, playerPos, 15, 15, this.damage_factor);
            player.kill();
        }, 200);
    }
}

export default command