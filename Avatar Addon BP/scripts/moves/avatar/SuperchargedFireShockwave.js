import { world } from '@minecraft/server'
import { getScore } from "../../util.js";

let startTick;

const command = {
    name: 'Supercharged Fire Shockwave',
    description: "Damage everyone near you, with zero max damage cap! Just don't let anyone get close to you, and don't let them drink fire resistance!",
    style: 'avatar',
    unlockable: 100,
    unlockable_for_avatar: 100,
    cooldown: 'slow',
    execute(player) {
		if (!player.hasTag("avatar_state")) return player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cYou must be in avatar state to use this move!"}]}`);
        player.runCommandAsync("scoreboard players set @s cooldown1 0");
        player.runCommandAsync("playsound random.explode @a[r=3]");
		player.runCommandAsync("particle a:supercharged_fire_blue_shockwave");
        try { player.runCommandAsync(`damage @e[r=40,type=!item,name=!"${player.name}"] ${Math.ceil(getScore("level", player)/4)} fire_tick entity @s`); } catch (error) {}
        try { player.runCommandAsync(`damage @e[r=10,type=!item,name=!"${player.name}"] ${getScore("level", player)} fire_tick entity @s`); } catch (error) {}
    }
}

export default command