import { World } from 'mojang-minecraft'
import commands from '../import.js';
import { getScore } from "./../../util.js";

const command = {
    name: 'Air Vanish',
    description: 'Puff up a smokesreen and get invisiblity for 10 seconds to vanish out of sight.',
    style: 'air',
    unlockable: 0,
    execute(player) {
        player.runCommand("scoreboard players set @s cooldown1 0");
        player.runCommand("playsound random.explode @a[r=3]");
        player.runCommand("particle a:air_vanish ~~~");
        player.runCommand("effect @s invisibility 10 3 true");
    }
}

export default command