import { ActionFormData, ModalFormData } from "@minecraft/server-ui";

export function protectArea(source) {
    const entities = [...source.dimension.getEntities({ families: ["protection_area"] })];
    const protAreas = [];
    entities.forEach(entity => {
        protAreas.push(entity);
    })

	const protAreaDelete = new ActionFormData();
    protAreaDelete.title("Protection Area Menu: Delete");
    protAreaDelete.body("Pick a protection area to delete!");
    entities.forEach(entity => {
        protAreaDelete.button(entity.nameTag, "textures/ui/avatar/delete");
    })
	
    const protAreaMain = new ActionFormData();
    protAreaMain.title("Protection Area Menu: Main");
    protAreaMain.body("Create a new protection area, or delete one you have already created! A protection area is zone with a radius of 100 that no players can bend in. Because bending causes enviromental damage, it can be useful to disable it in enviroments like spawns or houses.");
    protAreaMain.button("Create", "textures/ui/avatar/create");
	if (protAreas.length > 0) protAreaMain.button("Delete", "textures/ui/avatar/delete");

	const protAreaCreate = new ModalFormData();
    protAreaCreate.title("Protection Area Menu: Create");
    protAreaCreate.textField("Protection area name:", "spawn");

    protAreaMain.show(source).then((ActionFormResponse) => {
		const { selection } = ActionFormResponse;
        if (selection === 0) {
            protAreaCreate.show(source).then((ModalFormResponse) => {
                const { formValues } = ModalFormResponse;
                let [args] = formValues;
				if (args.includes("/") || args.includes(" ") || args.includes(",") || args.includes(":")) {
					return source.sendMessage("§cYou can't use that character!");
				}
				if (args.length > 20) {
					return source.sendMessage("§cThat's a pretty long name! Please shorten it.");
				}

                const protArea = source.dimension.spawnEntity("a:protection_area", source.location);
                protArea.nameTag = args;
                source.sendMessage(`§7Created the protection area called "§b${protArea.nameTag}§7" successfully.`);
			})
        } else if (selection === 1) {
            protAreaDelete.show(source).then((ActionFormResponse) => {
                const { selection } = ActionFormResponse;

                const delArea = protAreas[selection];
                source.sendMessage(`§7Deleted the protection area called "§b${delArea.nameTag}§7" successfully.`);
                delArea.triggerEvent("minecraft:despawn")
                
			})
		}
    })
}