import { World } from '@minecraft/server'
import commands from '../import.js';

const command = {
    name: 'Air Launch',
    description: 'Launch yourself into the air on a blast of air - about 60 blocks!',
    style: 'air',
    unlockable: 4,
    unlockable_for_avatar: 4,
    cooldown: "fast",
    execute(player) {
        player.runCommandAsync("particle a:air_puff");
        player.runCommandAsync("effect @s levitation 1 50 true");
        player.runCommandAsync("playsound firework.launch @s");
        player.runCommandAsync("scoreboard players set @s cooldown1 0");
    }
}

export default command