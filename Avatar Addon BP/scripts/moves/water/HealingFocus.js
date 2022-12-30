import { world, World } from '@minecraft/server'
import commands from '../import.js';
import { getScore } from "./../../util.js";

const command = {
    name: 'Healing Focus',
    description: 'Heal everyone in a radius of 2.',
    style: 'water',
    sub_bending_required: 'healing',
    unlockable: 15,
    unlockable_for_avatar: 40,
    cooldown: 'fast',
    execute(player) {
        player.runCommandAsync("scoreboard players set @s cooldown1 0");
        player.runCommandAsync("effect @e[r=2] regeneration 1 4");
    }
}

export default command