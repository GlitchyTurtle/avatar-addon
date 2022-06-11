export function bending(message) {
    message.cancel = true;
    let player = message.sender;
    player.runCommand(`playsound random.levelup "${player.nameTag}"`);
    if (!player.hasTag('antimagic')) {
        player.runCommand(`tag "${player.nameTag}" add antimagic`);
        player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§cYou no longer have your bending!§r"}]}`);
    } else {
        player.runCommand(`tag "${player.nameTag}" remove antimagic`);
        player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§aYou have your bending now!§r"}]}`);
    }
}
