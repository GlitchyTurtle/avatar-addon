import { World } from 'mojang-minecraft'

const command = {
    name: 'Fire Shield',
    description: 'Block all incoming blasts with the power of fire!',
    style: 'fire',
    unlockable: 0,
    execute(player) {
        player.runCommand("scoreboard players set @s cooldown1 0");
        player.runCommand("playsound mob.blaze.shoot @a[r=5]");
        player.runCommand("effect @s resistance 3 255 true");
        player.runCommand("particle a:fire_shield ~~~");
		player.runCommand("particle a:fire_wave ~~~");
    }
}

export default command