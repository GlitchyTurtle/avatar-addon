import { World } from 'mojang-minecraft'
import commands from '../import.js';

const command = {
    name: 'Air Launch',
    description: 'Launch yourself into the air on a blast of air - about 60 blocks!',
    style: 'air',
    unlockable: 0,
    execute(player) {
        player.runCommand("particle a:air_puff");
        player.runCommand("effect @s levitation 1 50 true");
        player.runCommand("playsound firework.launch @s");
        player.runCommand("scoreboard players set @s cooldown1 0");
    }
}

export default command