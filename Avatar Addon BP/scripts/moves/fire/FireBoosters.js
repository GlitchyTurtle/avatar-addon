import { World } from '@minecraft/server'
import commands from '../import.js';
import { getScore } from "./../../util.js";

const command = {
    name: 'Fire Boosters',
    description: 'Lets you fly by shooting out fire! If you ram into entities, it does damage.',
    style: 'fire',
    unlockable: 6,
    unlockable_for_avatar: 67,
    execute(player) {
        player.runCommandAsync("scoreboard players set @s cooldown1 0");
        player.runCommandAsync("summon a:scooter");
        player.runCommandAsync("ride @s start_riding @e[r=10,type=a:scooter,c=1] teleport_ride");
        player.runCommandAsync("playsound mob.shulker.shoot @a[r=3]");
    }
}

export default command