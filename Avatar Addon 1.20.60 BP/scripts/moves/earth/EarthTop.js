import { getScore, setScore, delayedFunc, playSound } from "./../../util.js";

const command = {
    name: 'Earth Top',
    description: 'Go to the highest block above you. Useful for getting out of caves or escaping!',
    style: 'earth',
    unlockable: 7,
    unlockable_for_avatar: 48,
    cooldown: 'super_fast',
    execute(player) {
        // Setup
        
        if (getScore("ground", player) === 0) return player.sendMessage("§cYou must be on earth to use this move!");
        player.playAnimation("animation.air.vanish");

        // Main
        delayedFunc(player, earthTop => {
            playSound(player, "dig.grass", 1, player.location, 5);
            player.addEffect("resistance", 25, { amplifier: 255, showParticles: false });
            player.runCommandAsync("camerashake add @s 0.4 0.1 positional");
            player.runCommandAsync("spreadplayers ~~ 0 1 @s");
        }, 20)
    }
}

export default command