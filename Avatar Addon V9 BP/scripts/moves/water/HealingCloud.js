import { world, World } from 'mojang-minecraft'
import commands from '../import.js';
import { getScore } from "./../../util.js";

let startTick;

const command = {
    name: 'Healing Cloud',
    description: 'Bend the water vapor in the air to heal everything around you.',
    style: 'water',
    sub_bending_required: 'healing',
    unlockable: 0,
    execute(player) {
        player.runCommand("scoreboard players set @s cooldown1 0");
        player.runCommand("summon a:healing_water");
    }
}

export default command