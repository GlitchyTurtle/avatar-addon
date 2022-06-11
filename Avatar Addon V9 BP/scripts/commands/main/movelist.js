export function movelist(message) {
    message.cancel = true;
    message.sender.runCommand(`playsound random.levelup "${message.sender.nameTag}"`);
    if (message.sender.hasTag('air')) {
        message.sender.runCommand(`execute "${message.sender.nameTag}" ~~~ function become/movelist_air`);
    } else if (message.sender.hasTag('fire')) {
        message.sender.runCommand(`execute "${message.sender.nameTag}" ~~~ function become/movelist_fire`);
    } else if (message.sender.hasTag('earth')) {
        message.sender.runCommand(`execute "${message.sender.nameTag}" ~~~ function become/movelist_earth`);
    } else if (message.sender.hasTag('water')) {
        message.sender.runCommand(`execute "${message.sender.nameTag}" ~~~ function become/movelist_water`);
    } else if (message.sender.hasTag('avatar')) {
        message.sender.runCommand(`execute "${message.sender.nameTag}" ~~~ function become/movelist_avatar`);
    }
}