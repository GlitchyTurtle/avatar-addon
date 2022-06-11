export function sethome(message, args) {
    // Validate that required params are defined
    if (!message) {
        return console.warn(`${new Date()} | ` + "Error: ${message} isnt defined. Did you forget to pass it? ./commands/utility/sethome.js:8)");
    }

    message.cancel = true;

    let player = message.sender;

    // Get current location
    let {x, y, z} = player.location;

    let homex = x.toFixed(0);
    let homey = y.toFixed(0);
    let homez = z.toFixed(0);
    let currentDimension;

    // Don't allow spaces
    if (args.length > 1) {
        return player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§c "},{"text":"No spaces in names please!"}]}`);
    }

    // Make sure this name doesn't exist already and it doesn't exceed limitations
    let verify = false;
    let counter = 0;
    let tags = player.getTags();
    for (let i = 0; i < tags.length; i++) {
        if (tags[i].startsWith(args[0].toString() + " X", 13)) {
            verify = true;
            player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§c"},{"text":"You already have a home named ${args[0]}!"}]}`)
            break;
        }
        if (tags[i].startsWith("LocationHome:")) {
            counter = ++counter;
        }
        if (counter >= 3 && true) {
            verify = true;
            player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§c"},{"text":"You can only have 3 saved locations!"}]}`)
            break; 
        }
    }
    if (verify === true) {
        return;
    }

    // Save which dimension they were in
    if (player.dimension.id === "minecraft:overworld") {
        currentDimension = "overworld"
    }
    if (player.dimension.id === "minecraft:nether") {
        currentDimension = "nether"
    }
    if (player.dimension.id === "minecraft:the_end") {
        return player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§c"},{"text":"Not allowed to set home in this dimension!"}]}`)
    }

    // Store their new home coordinates
    player.addTag(`LocationHome:${args[0]} X:${homex} Y:${homey} Z:${homez} Dimension:${currentDimension}`);
    
    player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§a"},{"text":"${args[0]} has been set at ${homex} ${homey} ${homez}!"}]}`)
}