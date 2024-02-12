import { setScore } from "./../../util.js";

const command = {
    name: 'Avatar State',
    description: 'Enter or exit the avatar state on command by using this move.',
    style: 'avatar',
    unlockable: 100,
    unlockable_for_avatar: 100,
    cooldown: 'slow',
    execute(player) {
        
        player.playAnimation("animation.air.bubble");
        if (player.hasTag("avatar_state")) {
            player.removeTag("avatar_state");
            player.sendMessage("§7You have exited the avatar state.");
        } else {
            player.addTag("avatar_state")
            player.sendMessage("§7You have entered the avatar state. Be careful, dying here is dangerous.");
        }
    }
}

export default command