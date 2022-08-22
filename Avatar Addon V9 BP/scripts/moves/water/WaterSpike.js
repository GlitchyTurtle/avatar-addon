import { world, World } from 'mojang-minecraft'
import commands from '../import.js';
import { getScore } from "./../../util.js";

let startTick;

const command = {
    name: 'Water Spike',
    description: 'Blast mobs up into the air on a spike of ice!',
    style: 'water',
    unlockable: 0,
    execute(player) {
        player.addTag(`selfwater`);
        player.runCommand("scoreboard players set @s cooldown1 0");
        player.runCommand("playsound mob.turtle.swim @a[r=3] ~ ~ ~ 0.9 1");
        try { player.runCommand("execute @e[r=5,tag=!selfwater] ~ ~ ~ fill ~ ~ ~ ~ ~4 ~ ice 0 keep"); } catch (error) {}
        try { player.runCommand("execute @e[r=5,tag=!selfwater] ~ ~ ~ fill ~-1 ~ ~ ~ ~3 ~ ice 0 keep"); } catch (error) {}
        try { player.runCommand("execute @e[r=5,tag=!selfwater] ~ ~ ~ fill ~1 ~ ~ ~ ~3 ~ ice 0 keep"); } catch (error) {}
        try { player.runCommand("execute @e[r=5,tag=!selfwater] ~ ~ ~ fill ~ ~ ~-1 ~ ~3 ~ ice 0 keep"); } catch (error) {}
        try { player.runCommand("execute @e[r=5,tag=!selfwater] ~ ~ ~ fill ~ ~ ~1 ~ ~3 ~ ice 0 keep"); } catch (error) {}
        try { player.runCommand("execute @e[r=5,tag=!selfwater] ~ ~ ~ fill ~-1 ~1 ~1 ~1 ~ ~-1 ice 0 keep"); } catch (error) {}
        try { player.runCommand("execute @e[r=5,tag=!selfwater] ~ ~ ~ fill ~ ~ ~ ~ ~1 ~2 ice 0 keep"); } catch (error) {}
        try { player.runCommand("execute @e[r=5,tag=!selfwater] ~ ~ ~ fill ~ ~ ~ ~ ~1 ~-2 ice 0 keep"); } catch (error) {}
        try { player.runCommand("execute @e[r=5,tag=!selfwater] ~ ~ ~ fill ~ ~ ~ ~-2 ~1 ~ ice 0 keep"); } catch (error) {}
        try { player.runCommand("execute @e[r=5,tag=!selfwater] ~ ~ ~ fill ~ ~ ~ ~2 ~1 ~ ice 0 keep"); } catch (error) {}
        try { player.runCommand("execute @e[r=5,tag=!selfwater] ~ ~ ~ fill ~2 ~ ~-1 ~ ~ ~1 ice 0 keep"); } catch (error) {}
        try { player.runCommand("execute @e[r=5,tag=!selfwater] ~ ~ ~ fill ~-2 ~ ~-1 ~ ~ ~1 ice 0 keep"); } catch (error) {}
        try { player.runCommand("execute @e[r=5,tag=!selfwater] ~ ~ ~ fill ~-1 ~ ~-2 ~1 ~ ~ ice 0 keep"); } catch (error) {}
        try { player.runCommand("execute @e[r=5,tag=!selfwater] ~ ~ ~ fill ~-1 ~ ~2 ~1 ~ ~ ice 0 keep"); } catch (error) {}
        try { player.runCommand("execute @e[r=5,tag=!selfwater] ~ ~ ~ tp @s ~ ~5 ~"); } catch (error) {}
        try { player.runCommand("effect @e[r=5,tag=!selfwater] levitation 1 25 true"); } catch (error) {}
        player.removeTag(`selfwater`);
    }
}

export default command