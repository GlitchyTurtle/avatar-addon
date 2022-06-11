export function delhome(message, args) {
    // Validate that required params are defined
    if (!message) {
        return console.warn(`${new Date()} | ` + "Error: ${message} isnt defined. Did you forget to pass it?");
    }

    message.cancel = true;

    let player = message.sender;

    // Don't allow spaces
    if (args.length > 1) {
        return player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§c"},{"text":"No spaces in names please!"}]}`);
    }

    // Find and delete this saved home location
    let verify = false;
    let tags = player.getTags();
    for (let i = 0; i < tags.length; i++) {
        if (tags[i].startsWith(args[0].toString() + " X", 13)) {
            verify = true;
            player.removeTag(tags[i])
            player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§c"},{"text":"You have successfully deleted ${args[0]}!"}]}`)
            break;
        }
    }
    if (verify === true) {
        return;
    } else {
        player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§c"},{"text":"${args[0]} does not exist!"}]}`)
    }
}