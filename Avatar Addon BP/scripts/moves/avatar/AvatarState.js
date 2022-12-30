const command = {
    name: 'Avatar State',
    description: 'Enter or exit the avatar state on command by using this move.',
    style: 'avatar',
    unlockable: 100,
    unlockable_for_avatar: 100,
    cooldown: 'slow',
    execute(player) {
        if (player.hasTag("avatar_state")) {
            player.removeTag("avatar_state");
            player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cYou have exited the avatar state.§r"}]}`);
        } else {
            player.addTag("avatar_state")
            player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§aYou have entered the avatar state. Be careful.§r"}]}`);
            player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cYou can disable the particles in settings.§r"}]}`);
        }
        player.runCommandAsync("scoreboard players set @s cooldown1 0");
    }
}

export default command