import { createShockwave, setScore, getScore, delayedFunc } from "./../../util.js";

const command = {
    name: 'Earth Headbutt',
    description: 'Run fast and deal damage to nearby players!',
    style: 'earth',
    unlockable: 5,
    unlockable_for_avatar: 46,
    cooldown: 'slow',
    execute(player) {
        setScore(player, "cooldown", 0);
        if (!getScore("ground", player)) return player.sendMessage("§cYou must be grounded to use this move.");
		player.runCommandAsync("camerashake add @a[r=10] 0.3 0.4 positional");
		player.playSound('dig.grass', { location: player.location });
		const viewDirection = player.getViewDirection();
		player.applyKnockback(viewDirection.x, viewDirection.z, 15, viewDirection.y * 2);
		createShockwave(player, player.location, 7, 7, 1);
		delayedFunc(player, (removeDirtBlock) => {
			createShockwave(player, player.location, 7, 7, 1);
		}, 10);
		delayedFunc(player, (removeDirtBlock) => {
			createShockwave(player, player.location, 7, 7, 1);
		}, 5);
    }
}

export default command