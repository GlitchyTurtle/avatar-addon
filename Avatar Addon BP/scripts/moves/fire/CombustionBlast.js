import { getScore } from "./../../util.js";

const command = {
    name: 'Combustion Blast',
    description: 'Shoots out a beam that explodes when it hits either players or blocks!',
    style: 'fire',
    unlockable: 20,
    unlockable_for_avatar: 80,
    sub_bending_required: 'combustion',
    execute(player) {
        player.runCommandAsync("scoreboard players set @s cooldown1 0");
        player.runCommandAsync("playsound firework.blast @a[r=3]");
        for (let i = 3; i < 50; i++) {
            player.runCommandAsync(`execute positioned ^^1.5^${i} run function _internal/combustion_blast`)
        }
    }
}

export default command