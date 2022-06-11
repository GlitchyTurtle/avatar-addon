export function mobile(message) {
    message.cancel = true;
    message.sender.runCommand(`playsound random.levelup "${message.sender.nameTag}"`);
    if (!player.hasTag('mmode')) {
        message.sender.runCommand(`execute "${message.sender.nameTag}" ~~~ function touchscreen_mode/on`);
    } else {
        message.sender.runCommand(`execute "${message.sender.nameTag}" ~~~ function touchscreen_mode/off`);
    }
}
