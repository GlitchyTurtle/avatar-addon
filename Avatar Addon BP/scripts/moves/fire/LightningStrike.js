import { getScore } from "./../../util.js";

const command = {
    name: 'Lightning Strike',
    description: 'Strike lightning on enemies 7 blocks out!',
    style: 'fire',
    unlockable: 15,
    unlockable_for_avatar: 0,
    sub_bending_required: 'lightning',
    execute(player) {
        player.runCommandAsync("scoreboard players set @s cooldown1 0");
        player.runCommandAsync("summon lightning_bolt ^^^7");
        player.runCommandAsync(`execute as @s positioned ^^^7 damage @e[r=5,type=!item,name=!${player.name}] ${Math.ceil(getScore("level", player)/4)} lightning entity ${player.name}`);
    }
}

export default command