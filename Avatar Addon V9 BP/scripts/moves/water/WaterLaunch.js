import { World } from 'mojang-minecraft'
import commands from '../import.js';

const command = {
    name: 'Water Launch',
    description: 'Launch yourself into the air on a blast of water - about 25 blocks!',
    style: 'water',
    unlockable: 0,
    execute(player) {
        player.runCommand("particle a:water_wave");
        player.runCommand("effect @s levitation 1 25 true");
        player.runCommand("playsound firework.launch @s");
        player.runCommand("scoreboard players set @s cooldown1 0");
    }
}

export default command