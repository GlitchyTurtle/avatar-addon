import { world } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
import { getGamemode, getScore } from '../util.js';

export function homeMenu(source) {
	// Checks if the player is not in combat, and if they are, exit
	if (getScore("combat", source) > 0) return source.sendMessage("§cYou are in combat, don't cheat!");
	if (source.hasTag("in_opp_claim")) return source.sendMessage("§cYou cannot create, delete, or teleport to homes while in an opponents land claim!");

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
            homeDelete.button(`${current[0].replace('LocationHome:', '')}`, "textures/ui/avatar/delete");
			homeTeleport.button(`${current[0].replace('LocationHome:', '')}`, "textures/ui/avatar/teleport");
			test.push(`${tags[i]}`)
			count = ++count;
        }
    }
    let homeMain = new ActionFormData();
    homeMain.title("Home Menu: Main");
    homeMain.body("Create a new home you can use, or delete one you have already created!");
    homeMain.button("Create", "textures/ui/avatar/create");
	if (count > 0) {
		homeMain.button("Teleport", "textures/ui/avatar/teleport");
		homeMain.button("Delete", "textures/ui/avatar/delete");
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
				if (args.includes("/") || args.includes(" ") || args.includes(",") || args.includes(":")) return source.sendMessage("§cYou can't use that character!");
				if (args.length > 20) return source.sendMessage("§cThat's a pretty long name! Please shorten it.");
				
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
						source.sendMessage(`§cYou already have a home or moveset named ${args}!`);
						break;
					}
					if (tags[i].startsWith("LocationHome:")) {
						counter = ++counter;
					}
					if (counter >= 6 && true) {
						verify = true;
						source.sendMessage("§cYou can only have 6 saved locations!");
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
					currentDimension = "the_end"
				}
				// Store their new home coordinates
				source.addTag(`LocationHome:${args} X:${homex} Y:${homey} Z:${homez} Dimension:${currentDimension}`);
				source.sendMessage(`§aSaved home ${args}!`);
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
				source.sendMessage(`§aWelcome back ${source.nameTag}!`);
				source.teleport({ x: homex, y: homey, z: homez }, { dimension: world.getDimension(dimension), keepVelociy: false });
			})
		} else if (selection === 2) {
            homeDelete.show(source).then((ActionFormResponse) => {
                const { selection } = ActionFormResponse;
				source.removeTag(test[selection])
			})
        }
    })
}