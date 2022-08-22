import { world, World } from 'mojang-minecraft'
import commands from '../import.js';
import { getScore } from "./../../util.js";

const command = {
    name: 'Healing Focus',
    description: 'Heal everyone in a radius of 2.',
    style: 'water',
    sub_bending_required: 'healing',
    unlockable: 0,
    execute(player) {
        player.runCommand("scoreboard players set @s cooldown1 0");
        player.runCommand("effect @e[r=2] regeneration 1 8");
    }
}

export default command