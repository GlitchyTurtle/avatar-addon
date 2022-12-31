import { getScore } from "./../../util.js";

const command = {
    name: 'Air Shockwave',
    description: 'Explodes out a shockwave of powerful air that does damage.',
    style: 'air',
    unlockable: 5,
    unlockable_for_avatar: 5,
    cooldown: 'fast',
    execute(player) {
        player.runCommandAsync("scoreboard players set @s cooldown1 0");
        player.runCommandAsync("playsound random.explode @a[r=3]");
        player.runCommandAsync("particle a:air_puff");
        try { player.runCommandAsync(`damage @e[r=15,type=!item,name=!"${player.name}"] ${Math.ceil(Math.min(getScore("level", player)/4, 15))} none entity @s`); } catch (error) {}
    }
}

export default command