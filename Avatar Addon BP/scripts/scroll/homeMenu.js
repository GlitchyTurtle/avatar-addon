import { world, Location } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
import { getGamemode, getScore } from '../util.js';

export function homeMenu(source) {
	// Checks if the player is not in combat, and if they are, exit
	if (getScore("combat", source) > 0) return source.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cYou are in combat, don't cheat!"}]}`);

	let homeDelete = new ActionFormData();
    homeDelete.title("Home Menu: Delete");
    homeDelete.body("Pick a home to delete!");
	
	let homeTeleport = new ActionFormData();
    homeTeleport.title("Home Menu: Teleport");
    homeTeleport.body("Pick a home to teleport to!");
	let tags = source.getTags();
	let test = [];
	let count = 0
    for (let i = 0; i < tags.length; i++) {
		if (tags[i].startsWith("LocationHome:")) {
			let current = tags[i].split(" ")
            homeDelete.button(`${current[0].replace('LocationHome:', '')}`, "textures/ui/delete");
			homeTeleport.button(`${current[0].replace('LocationHome:', '')}`, "textures/ui/teleport");
			test.push(`${tags[i]}`)
			count = ++count;
        }
    }
    let homeMain = new ActionFormData();
    homeMain.title("Home Menu: Main");
    homeMain.body("Create a new home you can use, or delete one you have already created!");
    homeMain.button("Create", "textures/ui/create");
	if (count > 0) {
		homeMain.button("Teleport", "textures/ui/teleport");
		homeMain.button("Delete", "textures/ui/delete");
	}
	
	let homeCreate = new ModalFormData();
    homeCreate.title("Home Menu: Create");
    homeCreate.textField("Home Name:", "mymainhome");

    homeMain.show(source).then((ActionFormResponse) => {
		const { selection } = ActionFormResponse;
        if (selection === 0) {
            homeCreate.show(source).then((ModalFormResponse) => {
                const { formValues } = ModalFormResponse;
                let [args] = formValues;
				if (args.includes("/") || args.includes(" ") || args.includes(",") || args.includes(":")) {
					return source.runCommandAsync( `tellraw @s {"rawtext":[{"text":"§cYou can't use that character!"}]}`);
				}
				if (args.length > 20) {
					return source.runCommandAsync( `tellraw @s {"rawtext":[{"text":"§cThat's a pretty long name! Please shorten it."}]}`);
				}
				// Get current location
				let {x, y, z} = source.location;
				let homex = x.toFixed(0);
				let homey = y.toFixed(0);
				let homez = z.toFixed(0);
				let currentDimension;
				let verify = false;
				let counter = 0;
				let tags = source.getTags();
				for (let i = 0; i < tags.length; i++) {
					if (tags[i].startsWith("Moveset:" + args.toString()) || tags[i].startsWith(args.toString() + " X", 13)) {
						verify = true;
						source.runCommandAsync( `tellraw @s {"rawtext":[{"text":"§c"},{"text":"You already have a home or moveset named ${args}!"}]}`)
						break;
					}
					if (tags[i].startsWith("LocationHome:")) {
						counter = ++counter;
					}
					if (counter >= 6 && true) {
						verify = true;
						source.runCommandAsync( `tellraw @s {"rawtext":[{"text":"§c"},{"text":"You can only have 6 saved locations!"}]}`)
						break; 
					}
				}
				if (verify === true) {
					return;
				}
				// Save which dimension they were in
				if (source.dimension.id === "minecraft:overworld") {
					currentDimension = "overworld"
				}
				if (source.dimension.id === "minecraft:nether") {
					currentDimension = "nether"
				}
				if (source.dimension.id === "minecraft:the_end") {
					return source.runCommandAsync( `tellraw @s {"rawtext":[{"text":"§c"},{"text":"Not allowed to set home in this dimension!"}]}`)
				}
				// Store their new home coordinates
				source.addTag(`LocationHome:${args} X:${homex} Y:${homey} Z:${homez} Dimension:${currentDimension}`);
				source.runCommandAsync( `tellraw @s {"rawtext":[{"text":"§a"},{"text":"Saved home ${args}!"}]}`)
			})
        } else if (selection === 1) {
            homeTeleport.show(source).then((ActionFormResponse) => {
                const { selection } = ActionFormResponse;
				let homex;
				let homey;
				let homez;
				let dimension;
				let coordinatesArray = test[selection].split(' ');
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
				source.runCommandAsync( `tellraw "${source.nameTag}" {"rawtext":[{"text":"§a"},{"text":"Welcome back ${source.nameTag}!"}]}`);
				source.teleport(new Location(homex, homey, homez), world.getDimension(dimension), 0, 0);
				if (getGamemode(source) == "a") source.runCommandAsync( `gamemode s @s`);
			})
		} else if (selection === 2) {
            homeDelete.show(source).then((ActionFormResponse) => {
                const { selection } = ActionFormResponse;
				source.runCommandAsync( `tag @s remove "${test[selection]}"`)
			})
        }
    })
}