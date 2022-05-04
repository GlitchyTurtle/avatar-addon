export function movemsg(message) {
    message.cancel = true;
    let player = message.sender;
    player.runCommand(`playsound random.levelup "${player.nameTag}"`);
    if (!player.hasTag('chatmsgoff')) {
        player.runCommand(`tag "${player.nameTag}" add chatmsgoff`);
        player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§cYou will no longer see move messages!§r"}]}`);
    } else {
        player.runCommand(`tag "${player.nameTag}" remove chatmsgoff`);
        player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§aYou will now see move messages!§r"}]}`);
    }
}
