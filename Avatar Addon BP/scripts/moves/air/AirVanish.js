import { World } from '@minecraft/server'
import commands from '../import.js';
import { getScore } from "./../../util.js";

const command = {
    name: 'Air Vanish',
    description: 'Puff up a smokesreen and get invisiblity for 10 seconds to vanish out of sight.',
    style: 'air',
    unlockable: 8,
    unlockable_for_avatar: 8,
    cooldown: 'fast',
    execute(player) {
        player.runCommandAsync("scoreboard players set @s cooldown1 0");
        player.runCommandAsync("playsound random.explode @a[r=3]");
        player.runCommandAsync("particle a:air_vanish ~~~");
        player.runCommandAsync("effect @s invisibility 10 3 true");
    }
}

export default command