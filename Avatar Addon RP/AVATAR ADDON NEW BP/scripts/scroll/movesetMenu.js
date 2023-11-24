import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
import { refreshSidebar } from './../runtimes/main.js';
import { getScore } from "./../util.js";

export function movesetMenu(source) {
	if (!source.hasTag("avatar") && !source.hasTag("air") && !source.hasTag("fire") && !source.hasTag("water") && !source.hasTag("earth")) return source.runCommandAsync( `tellraw @s {"rawtext":[{"text":"§cYou can't bend, what do you need this for?§r"}]}`);
	
	let movesetDelete = new ActionFormData();
    movesetDelete.title("Moveset Menu: Delete");
    movesetDelete.body("Pick a moveset to delete!");
	
	let movesetLoad = new ActionFormData();
    movesetLoad.title("Moveset Menu: Teleport");
    movesetLoad.body("Pick a moveset to load!");
	let tags = source.getTags();
	let test = [];
	let count = 0
    for (let i = 0; i < tags.length; i++) {
		if (tags[i].startsWith("Moveset:")) {
			let current = tags[i].split(" ")
            movesetDelete.button(`${current[0].replace('Moveset:', '')}`, "textures/ui/avatar/delete");
			movesetLoad.button(`${current[0].replace('Moveset:', '')}`, "textures/ui/avatar/load");
			test.push(`${tags[i]}`)
			count = ++count;
        }
    }
	
    let movesetMain = new ActionFormData();
    movesetMain.title("Moveset Menu: Main");
    movesetMain.body("Create a new moveset, or delete one you have already created!");
    movesetMain.button("Create", "textures/ui/avatar/create");
	if (count > 0) {
		movesetMain.button("Load", "textures/ui/avatar/load");
		movesetMain.button("Delete", "textures/ui/avatar/delete");
	}
	
	let movesetCreate = new ModalFormData();
    movesetCreate.title("Moveset Menu: Create");
    movesetCreate.textField("Moveset Name:", "mymovesetmain");

	refreshSidebar(source);

    movesetMain.show(source).then((ActionFormResponse) => {
		const { selection } = ActionFormResponse;
        if (selection === 0) {
            movesetCreate.show(source).then((ModalFormResponse) => {
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
						source.runCommandAsync( `tellraw @s {"rawtext":[{"text":"§c"},{"text":"You already have a moveset or home named ${args}!"}]}`)
						break;
					}
					if (tags[i].startsWith("Moveset:")) {
						counter = ++counter;
					}
					if (counter >= 6 && true) {
						verify = true;
						source.runCommandAsync( `tellraw @s {"rawtext":[{"text":"§c"},{"text":"You can only have 6 saved movesets!"}]}`)
						break; 
					}
				}
				if (verify === true) {
					return;
				}
				// Store their new moveset lists
				source.addTag(`Moveset:${args} ${getScore("moveslot1", source)} ${getScore("moveslot2", source)} ${getScore("moveslot3", source)} ${getScore("moveslot4", source)} ${getScore("moveslot5", source)} ${getScore("moveslot6", source)} ${getScore("moveslot7", source)} ${getScore("moveslot8", source)} ${getScore("moveslot9", source)}`);
				source.runCommandAsync( `tellraw @s {"rawtext":[{"text":"§a"},{"text":"Saved moveset ${args}!"}]}`)
			})
        } else if (selection === 1) {
            movesetLoad.show(source).then((ActionFormResponse) => {
                const { selection } = ActionFormResponse;
				let home = test[selection].split(' ');
				let tags = source.getTags();
				for (let i = 0; i < tags.length; i++) {
					if (tags[i].startsWith("Moveset:") && tags[i].startsWith(home[0].toString())) {
						for (let b = 1; b < 10; b++) {
							source.runCommandAsync( `scoreboard players set @s moveslot${b} ${home[b]}`);
						}
						source.runCommandAsync( `tellraw @s {"rawtext":[{"text":"§a"},{"text":"Loaded moveset ${home[0].replace("Moveset:","")} successfully!"}]}`);
						break;
					}
				}
			})
		} else if (selection === 2) {
            movesetDelete.show(source).then((ActionFormResponse) => {
                const { selection } = ActionFormResponse;
				let home = test[selection].split(' ');
				source.runCommandAsync( `tag @s remove "${test[selection]}"`)
				source.runCommandAsync( `tellraw @s {"rawtext":[{"text":"§c"},{"text":"Deleted moveset ${home[0].replace("Moveset:","")} successfully!"}]}`);
			})
        }
    })
}