import { system, world } from "@minecraft/server";
import { ActionFormData, ModalFormData, MessageFormData } from "@minecraft/server-ui";
import { findPlayerHome, getScore, checkItemAmount } from "./../util.js";

export function claimMenu(source) {
    const claimMenu = new ActionFormData();
    claimMenu.title("Land Claim Menu: Main");
    claimMenu.body("Claim this land! Creating a new one will replace the old one.");
    claimMenu.button("Create Claim", "textures/ui/avatar/create");
	claimMenu.button("Add Whitelisted Player", "textures/ui/avatar/whitelist_add");
	claimMenu.button("Remove Whitelisted Player", "textures/ui/avatar/whitelist_remove");
	claimMenu.button("Delete Claim", "textures/ui/avatar/delete");

	const options = ["create", "whitelist_add", "whitelist_remove", "delete"];

    claimMenu.show(source).then(response => {
		const { selection } = response;
		if (selection === undefined) return source.sendMessage("§cYour selection was not saved!");

		switch (options[selection]) {
			case "create":
				system.run(() => createClaim(source));
				break;
			case "whitelist_add":
				whitelistPlayers(source);
				break;
			case "whitelist_remove":
				removeWhitelistedPlayer(source);
				break;
			case "delete":
				system.run(() => removeClaim(source));
				break;
		};
	});
}

function createClaim(source) {
	if (findPlayerHome(source)) return source.sendMessage("§cYou already have a land claim!");

	const nearbyCheck = [...source.dimension.getEntities({ location: source.location, maxDistance: 151, families: ["land_claim"], excludeNames: [source.id] })];
	if (nearbyCheck.length) return source.sendMessage("§cYou cannot claim here!");

	const claim = source.dimension.spawnEntity("a:land_claim", source.location);
	claim.nameTag = source.id;
	claim.addTag('Name:' + source.name);
	claim.addTag('Size:25');
	source.sendMessage("§7Land successfully claimed!");
}

function whitelistPlayers(source) {
	const home = findPlayerHome(source);
	if (!home) return source.sendMessage("§cYou don't have a land claim yet!");

	const playerNames = world.getAllPlayers().map(player => player.name);
	const playerSettingMenuLevel = new ModalFormData();
    playerSettingMenuLevel.title("Select player to whitelist");
	playerSettingMenuLevel.dropdown("Player Name:", playerNames, 0);

	playerSettingMenuLevel.show(source).then((ModalFormResponse) => {
		const { formValues } = ModalFormResponse;
		if (!formValues) return source.sendMessage("§cYour selection was not saved!");

		const [playerSelected] = formValues;
		const target = playerNames[playerSelected];

		if (target == source.name) return source.sendMessage("§cYou can't whitelist yourself!");

		home.addTag(`Safe:${target}`)
	})
}

function removeWhitelistedPlayer(source) {
	const home = findPlayerHome(source);
	if (!home) return source.sendMessage("§cYou don't have a land claim yet!");

	const playerNames = [];
	const tags = home.getTags();
	for (let i = 0; i < tags.length; i++) {
		if (tags[i].startsWith("Safe:")) {
			playerNames.push(tags[i].replace("Safe:", ""));
			break;
		}
	}

	if (!playerNames.length) return source.sendMessage("§cYou don't have anyone whitelisted yet!");

	const playerSettingMenuLevel = new ModalFormData();
    playerSettingMenuLevel.title("Select player to un-whitelist");
	playerSettingMenuLevel.dropdown("Player Name:", playerNames, 0);

	playerSettingMenuLevel.show(source).then((ModalFormResponse) => {
		const { formValues } = ModalFormResponse;
		if (!formValues) return source.sendMessage("§cYour selection was not saved!");

		const [playerSelected] = formValues;
		const target = playerNames[playerSelected];

		if (target == source.name) return source.sendMessage("§cYou can't unwhitelist yourself!");

		home.removeTag(`Safe:${target}`)
	})
}

function removeClaim(source) {
	const home = findPlayerHome(source);
	if (!home) return source.sendMessage("§cYou don't have a land claim yet!");

	const messageForm = new MessageFormData()
    .title("Warning!")
    .body("Are you sure you want to do this? Deleting your home will delete any items you have listed on the shop - permanently! It will also forget all of your whitelisted players.")
    .button1("Cancel")
    .button2("Confirm");

  	messageForm.show(source).then((formData) => {
      if (formData.canceled || formData.selection === undefined) return source.sendMessage("§cYou exited the menu, so your selection was not saved!");
      
      if (formData.selection === 0) {
		source.sendMessage("§7Canceled!");
	  } else {
		home.triggerEvent("minecraft:despawn");
		source.sendMessage("§7Successfully deleted your claim!");
	  }
    });
}