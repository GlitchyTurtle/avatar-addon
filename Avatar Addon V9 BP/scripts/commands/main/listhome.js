export function listhome(message, args) {
    // Validate that required params are defined
    if (!message) {
        return console.warn(`${new Date()} | ` + "Error: ${message} isnt defined. Did you forget to pass it?");
    }

    message.cancel = true;

    let player = message.sender;

    let tags = player.getTags();
    let counter = 0;
    let verify = false;
    for (let i = 0; i < tags.length; i++) {
        if (tags[i].startsWith("LocationHome:")) {
            // Split string into array
            let coordinatesArray = tags[i].split(' ');
            let home;
            let homex;
            let homey;
            let homez;
            let dimension;
            counter = ++counter;
            for (let i = 0; i < coordinatesArray.length; i++) {
                // Get their location from the array
                if (coordinatesArray[i].includes("LocationHome:")) {
                    home = coordinatesArray[i].replace("LocationHome:", "");
                }
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
                if (!homex || !homey || !homez || !dimension) {
                    continue;
                } else {
                    verify = true;
                    if (counter === 1) {
                        player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§b§lYour Homes:"}]}`);
                    }
                    player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§b"},{"text":"Home Name: §r${home} §bCoords: §r${homex} ${homey} ${homez} ${dimension}"}]}`);
                    continue;
                }
            }
            continue;
        }
        continue;
    }
    if (verify === false) {
        player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§c"},{"text":"You do not have any saved locations!"}]}`);
    }
    return;
}