import { getScore } from "./../../util.js";

const command = {
    name: 'Fire Charge',
    description: "Invigorate yourself mid-fight with fire to get a few extra hearts!",
    style: 'fire',
    unlockable: 5,
    unlockable_for_avatar: 66,
    execute(player) {
        player.runCommandAsync("scoreboard players set @s cooldown1 0");
        player.runCommandAsync("playsound mob.shulker.shoot @a[r=3]");
        player.runCommandAsync("effect @s regeneration 2 5 true");
        if (getScore("level", player) >= 100) {
            player.runCommandAsync("particle a:fire_blue_charge_quick ~~~");
            player.runCommandAsync("effect @s speed 3 6 true");
        } else {
           player.runCommandAsync("particle a:fire_charge_quick ~~~"); 
           player.runCommandAsync("effect @s speed 1 5 true");
        }
        player.runCommandAsync("effect @s absorption 60 1 true");
        player.runCommandAsync("camerashake add @s 0.4 0.1 positional");
    }
}

export default command