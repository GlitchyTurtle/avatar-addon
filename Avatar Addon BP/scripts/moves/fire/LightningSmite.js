import { getScore } from "./../../util.js";

const command = {
    name: 'Lightning Smite',
    description: 'Strike lightning on multiple enemies in a radius of up to 8 blocks out!',
    style: 'fire',
    unlockable: 20,
    unlockable_for_avatar: 80,
    sub_bending_required: 'lightning',
    execute(player) {
        player.runCommandAsync("scoreboard players set @s cooldown1 0");
        try { player.runCommandAsync(`execute as @e[r=8,name=!${player.name}] at @s run summon lightning_bolt`); } catch (error) {}
        player.runCommandAsync(`execute as @e[r=8,name=!${player.name}] at @s run damage @s[type=!item,name=!${player.name}] ${Math.ceil(getScore("level", player)/4)} lightning entity ${player.name}`);
    }
}

export default command