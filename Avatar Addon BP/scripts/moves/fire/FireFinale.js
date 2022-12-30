import { world } from '@minecraft/server'
import { getScore } from "./../../util.js";

let startTick;

const command = {
    name: 'Fire Finale',
    description: 'Punch a massive combustive impact into the ground, killing you (no matter what) and all nearby entities, but with a five second fuse!',
    style: 'fire',
    unlockable: 9,
    unlockable_for_avatar: 70,
    execute(player) {
        let alreadyRan = false;
        player.runCommandAsync("scoreboard players set @s cooldown1 0");
        player.runCommandAsync("playsound mob.shulker.shoot @a[r=3]");
        let x, y, z;
        let bombTimerTick = world.events.tick.subscribe(event => {
            if (!startTick) { startTick = event.currentTick; }
            player.runCommandAsync(`titleraw @a[r=20] actionbar {"rawtext":[{"text":"§cFire Finale: ${100 - (event.currentTick - startTick)}"}]}`);
            if (event.currentTick - startTick > 99 && !alreadyRan) {
                player.runCommandAsync("summon a:explosion_massive");
                try { player.runCommandAsync("kill @s"); } catch (error) {}
                alreadyRan = true;
                ({ x, y, z } = player.location);
            }
            if (event.currentTick - startTick > 102) {
                world.getDimension('overworld').runCommandAsync(`kill @e[r=20,type=item,x=${x},y=${y},z=${z}]`);
                world.events.tick.unsubscribe(bombTimerTick);
                startTick = undefined;
            }
        })
    }
}

export default command