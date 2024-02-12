import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
import { refreshSidebar } from './../runtimes/main.js';
import { getScore, setScore, delayedFunc } from "./../util.js";

export function movesetMenu(source) {
	const movesetDelete = new ActionFormData()
		.title("Moveset Menu: Delete")
		.body("Pick a moveset to delete!");
	
	const movesetLoad = new ActionFormData()
    	.title("Moveset Menu: Teleport")
    	.body("Pick a moveset to load!");

	const tags = source.getTags();
	const test = [];
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

    movesetMain.show(source).then((ActionFormResponse) => {
		const { selection } = ActionFormResponse;
        if (selection === 0) {
            movesetCreate.show(source).then((ModalFormResponse) => {
                const { formValues } = ModalFormResponse;
                const [args] = formValues;
				if (args.includes("/") || args.includes(" ") || args.includes(",") || args.includes(":")) {
					return source.sendMessage("§cYou can't use that character (No spaces, slashes, commas, etc)!");
				}
				if (args.length > 20) {
					return source.sendMessage("§cThat's a pretty long name! Please shorten it.");
				}

				let counter = 0;
				for (let i = 0; i < tags.length; i++) {
					if (tags[i].startsWith("Moveset:" + args.toString()) || tags[i].startsWith(args.toString() + " X", 13)) {
						return source.sendMessage(`§cYou already have a moveset named that!`);
					}
					if (tags[i].startsWith("Moveset:")) {
						counter = ++counter;
					}
					if (counter >= 6 && true) {
						return source.sendMessage(`§cYou can only have 6 saved movesets!`);
					}
				}
				
				source.addTag(`Moveset:${args} ${getScore("moveslot1", source)} ${getScore("moveslot2", source)} ${getScore("moveslot3", source)} ${getScore("moveslot4", source)} ${getScore("moveslot5", source)} ${getScore("moveslot6", source)} ${getScore("moveslot7", source)} ${getScore("moveslot8", source)} ${getScore("moveslot9", source)}`);
				source.sendMessage(`§7Saved moveset ${args} successfully!`)
			})
        } else if (selection === 1) {
            movesetLoad.show(source).then((ActionFormResponse) => {
                const { selection } = ActionFormResponse;
				let home = test[selection].split(' ');
				let tags = source.getTags();
				for (let i = 0; i < tags.length; i++) {
					if (tags[i].startsWith("Moveset:") && tags[i].startsWith(home[0].toString())) {
						for (let b = 1; b < 10; b++) {
							setScore(source, `moveslot${b}`, parseInt(home[b]));
						}
						source.sendMessage(`§7Loaded moveset ${home[0].replace("Moveset:","")} successfully!`);
						break;
					}
				}

				delayedFunc(source, (bendingCooldown) => {
					refreshSidebar(source);
				}, 25);
			})
		} else if (selection === 2) {
            movesetDelete.show(source).then((ActionFormResponse) => {
                const { selection } = ActionFormResponse;
				let home = test[selection].split(' ');
	
				source.removeTag(test[selection])
				source.sendMessage(`§7Deleted moveset ${home[0].replace("Moveset:","")} successfully!`);
			})
        }
    })
}