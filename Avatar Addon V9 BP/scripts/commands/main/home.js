import { world, Location } from "mojang-minecraft";

const World = world;

export function home(message, args) {
	message.cancel = true;
	let player = message.sender;
	if (args[0] === 'set') {
		// Get current location
		let {x, y, z} = player.location;

		let homex = x.toFixed(0);
		let homey = y.toFixed(0);
		let homez = z.toFixed(0);
		let currentDimension;

		// Don't allow spaces
		if (args.length > 2) {
			return player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§c "},{"text":"No spaces in names please!"}]}`);
		}

		// Make sure this name doesn't exist already and it doesn't exceed limitations
		let verify = false;
		let counter = 0;
		let tags = player.getTags();
		for (let i = 0; i < tags.length; i++) {
			if (tags[i].startsWith(args[1].toString() + " X", 13)) {
				verify = true;
				player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§c"},{"text":"You already have a home named ${args[1]}!"}]}`)
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
		player.addTag(`LocationHome:${args[1]} X:${homex} Y:${homey} Z:${homez} Dimension:${currentDimension}`);
		
		player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§a"},{"text":"${args[1]} has been set at ${homex} ${homey} ${homez}!"}]}`)
	} else if (args[0] === 'delete') {
		// Don't allow spaces
		if (args.length > 2) {
			return player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§c"},{"text":"No spaces in names please!"}]}`);
		}

		// Find and delete this saved home location
		let verify = false;
		let tags = player.getTags();
		for (let i = 0; i < tags.length; i++) {
			if (tags[i].startsWith(args[1].toString() + " X", 13)) {
				verify = true;
				player.removeTag(tags[i])
				player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§c"},{"text":"You have successfully deleted ${args[1]}!"}]}`)
				break;
			}
		}
		if (verify === true) {
			return;
		} else {
			player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§c"},{"text":"${args[1]} does not exist!"}]}`)
		}
	} else if (args[0] === 'list') {
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
	} else if (args[0] === 'teleport') {
		// Don't allow spaces
		if (args.length > 2) {
			return player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§c"},{"text":"No spaces in names please!"}]}`);
		}

		let homex;
		let homey;
		let homez;
		let dimension;
		let coordinatesArray;
		let tags = player.getTags();
		for (let i = 0; i < tags.length; i++) {
			if (tags[i].startsWith(args[1].toString() + " X", 13)) {
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
			player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§c"},{"text":"${args[1]} does not exist!"}]}`);
		} else {
			player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§a"},{"text":"Welcome back ${player.nameTag}!"}]}`);
			player.teleport(new Location(homex, homey, homez), World.getDimension(dimension), 0, 0);
		}	
	} else if (args[0] === 'help') {
		player.runCommand('tellraw @s {"rawtext":[{"text":"-----------------------------------------§r"}]}');
		player.runCommand('tellraw @s {"rawtext":[{"text":"§bHome Subcommands:§r"}]}');
		player.runCommand(`tellraw @s {"rawtext":[{"text":"§b!home set <name>§r - Creates a new home you can tp back to where you stand.!"}]}`);
		player.runCommand(`tellraw @s {"rawtext":[{"text":"§b!home teleport <name>§r - Teleports you back to one of your homes!"}]}`);
		player.runCommand(`tellraw @s {"rawtext":[{"text":"§b!home delete <name>§r - Delete one of your homes!"}]}`);
		player.runCommand(`tellraw @s {"rawtext":[{"text":"§b!home list§r - List your homes!"}]}`);
		player.runCommand('tellraw @s {"rawtext":[{"text":"-----------------------------------------§r"}]}');
	}
}