import { world, World } from 'mojang-minecraft'
import commands from '../import.js';

const command = {
    name: 'Lightning Strike',
    description: 'Strike lightning on enemies 7 blocks out!',
    style: 'fire',
    unlockable: 15,
    sub_bending_required: 'lightning',
    execute(player) {
        player.runCommand("scoreboard players set @s cooldown1 0");
        player.runCommand("execute @s ^^^7 summon lightning_bolt ~~-10~");
    }
}

export default command