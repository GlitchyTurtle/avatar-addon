import { world, World } from '@minecraft/server'
import commands from '../import.js';
import { getScore } from "./../../util.js";

let startTick;

const command = {
    name: 'Healing Cloud',
    description: 'Bend the water vapor in the air to heal everything around you.',
    style: 'water',
    sub_bending_required: 'healing',
    unlockable: 13,
    unlockable_for_avatar: 0,
    cooldown: 'fast',
    execute(player) {
        player.runCommandAsync("scoreboard players set @s cooldown1 0");
        player.runCommandAsync("summon a:healing_water");
    }
}

export default command