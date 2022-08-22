import { world, World } from 'mojang-minecraft'
import commands from '../import.js';

const command = {
    name: 'Lightning Smite',
    description: 'Strike lightning on multiple enemies in a radius of up to 8 blocks out!',
    style: 'fire',
    unlockable: 35,
    sub_bending_required: 'lightning',
    execute(player) {
        player.runCommand("scoreboard players set @s cooldown1 0");
        try { player.runCommand("execute @e[r=8,rm=1] ~~~ summon lightning_bolt"); } catch (error) {}
    }
}

export default command