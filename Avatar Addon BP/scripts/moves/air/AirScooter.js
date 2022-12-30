import { World } from '@minecraft/server'
import commands from '../import.js';
import { getScore } from "./../../util.js";

const command = {
    name: 'Air Scooter',
    description: 'Hop on a bubble of air you can control! If you ram into entities, it does damage.',
    style: 'air',
    unlockable: 9,
    unlockable_for_avatar: 9,
    cooldown: 'slow',
    execute(player) {
        player.runCommandAsync("scoreboard players set @s cooldown1 0");
        player.runCommandAsync("summon a:scooter");
        player.runCommandAsync("ride @s start_riding @e[r=10,type=a:scooter,c=1] teleport_ride");
        player.runCommandAsync("playsound monb.mob.shulker.shoot @a[r=3]");
    }
}

export default command