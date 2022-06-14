import { world, Location } from "mojang-minecraft";
const World = world;

export function gohome(message, args) {
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

    let homex;
    let homey;
    let homez;
    let dimension;
    let coordinatesArray;
    let tags = player.getTags();
    for (let i = 0; i < tags.length; i++) {
        if (tags[i].startsWith(args[0].toString() + " X", 13)) {
            // Split string into array
            coordinatesArray = tags[i].split(' ');
            break;
        }
    }

    try {
        for (let i = 0; i < coordinatesArray.length; i++) {
            // Get their location from the array
            if (coordinatesArray[i].includes("X:")) {
                homex = parseInt(coordinatesArray[i].replace("X:", ""));
            }
            if (coordinatesArray[i].includes("Y:")) {
                homey = parseInt(coordinatesArray[i].replace("Y:", ""));
            }
            if (coordinatesArray[i].includes("Z:")) {
                homez = parseInt(coordinatesArray[i].replace("Z:", ""));
            }
            if (coordinatesArray[i].includes("Dimension:")) {
                dimension = coordinatesArray[i].replace("Dimension:", "");
            }
        }
    } catch (error) {}

    if (!homex || !homey || !homez || !dimension) {
        player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§c"},{"text":"${args[0]} does not exist!"}]}`);
    } else {
        player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§a"},{"text":"Welcome back ${player.nameTag}!"}]}`);
        player.teleport(new Location(homex, homey, homez), World.getDimension(dimension), 0, 0);
    }
}