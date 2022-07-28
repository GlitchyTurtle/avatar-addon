import { World } from 'mojang-minecraft'
import commands from '../import.js';
import { getScore } from "./../../util.js";

const command = {
    name: 'Air Scooter',
    description: 'Hop on a bubble of air you can control! If you ram into entities, it does damage.',
    style: 'air',
    unlockable: 0,
    execute(player) {
        player.runCommand("scoreboard players set @s cooldown1 0");
        player.runCommand("summon a:scooter");
        player.runCommand("ride @s start_riding @e[r=10,type=a:scooter,c=1] teleport_ride");
        player.runCommand("playsound monb.mob.shulker.shoot @a[r=3]");
    }
}

export default command