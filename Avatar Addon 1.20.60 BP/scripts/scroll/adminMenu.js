import { world } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
import { getScore, setScore, getBendingStyle, parseSettings, levelUp, applyBasicDamage } from "./../util.js";
import { showStats } from "./statsMenu.js";
import { chooseType, resetPlayer } from "./chooseBendingMenu.js";
import { protectArea } from "../admin/protect.js";
import { debug } from "../admin/debug.js";

function playerSettings(source) {
	let playerNames = [];
	let players = [];
    for (let player of world.getPlayers()) {
        playerNames.push(player.name);
		players.push(player);
    }

	let playerSettingMenuLevel = new ModalFormData();
    playerSettingMenuLevel.title("Select player to edit");
	playerSettingMenuLevel.dropdown("Player Name:", playerNames, 0);

	playerSettingMenuLevel.show(source).then((ModalFormResponse) => {
		const { formValues } = ModalFormResponse;
		if (!formValues) return source.sendMessage("§cYou exited the menu, so your selection was not saved!");

		const [playerSelected] = formValues;
		const target = players[playerSelected];
		playerOptions(source, target);
	})
}

function playerOptions(player, target) {
	let playerOptions = new ActionFormData();
    playerOptions.title(`Edit Player: ${target.name}`);
    playerOptions.body("Choose a setting to edit for the selected player.");
	playerOptions.button("Player Level", "textures/ui/avatar/player_settings");
	playerOptions.button("Player Inventory", "textures/ui/avatar/inventory");
	playerOptions.button("Bending Options", `textures/ui/avatar/avatar_logo`);
	playerOptions.button("Player Stats", `textures/ui/avatar/info`);
	playerOptions.button("Reset Player", `textures/ui/avatar/delete`);
	playerOptions.button("Ender Chest Wipe", `textures/ui/avatar/inventory`);

	let selectionList = ["PlayerLevel", "PlayerInventory", "BendingOptions", "PlayerStats", "ResetPlayer", "EnderWipe"];
	playerOptions.show(player).then((ActionFormResponse) => {
		const { selection } = ActionFormResponse;
		switch(selectionList[selection]) {
			case "PlayerLevel":
				playerLevel(player, target);
				break;
			case "PlayerInventory":
				seeInventory(player, target);
				break;
			case "BendingOptions":
				playerBending(player, target)
				break;
			case "PlayerStats":
				showStats(player, target);
				break;
			case "ResetPlayer":
				resetPlayer(target);
				player.sendMessage(`§7${target.name} has been completely reset.`)
				break;
			case "EnderWipe":
				ecwipe(target);
				player.sendMessage(`§7${target.name}'s ender chest has been cleared.`)
				break;
		}
	})
}

function ecwipe(target) {
	for (let i = 0; i < 30; i++) {
		target.runCommand(`replaceitem entity @s slot.enderchest ${i} air`);
	}
}

function playerLevel(player, target) {
	const prevLvl = getScore("level", target);
	
	let levelTreeSettings = new ModalFormData();
    levelTreeSettings.title("Edit Player Skills Level");
	levelTreeSettings.slider("Level", 0, 100, 1, prevLvl);

	levelTreeSettings.show(player).then((ModalFormResponse) => {
		const { formValues } = ModalFormResponse;
		if (!formValues) return player.sendMessage("§cYou exited the menu, so your selection was not saved!");
		const [level] = formValues;

		if (prevLvl < level) {
			for (var i = prevLvl; i < level; i++) {
				levelUp(target);
			}
		} else {
			setScore(target, "level", level);
		}
		player.sendMessage(`§hUpdated ${target.name}'s level: §b${prevLvl}§7 => §b${level}`);
	})
}

function playerBending(player, target) {
	let playerBendingMenu = new ActionFormData();
	const selectionList = ["Non-Bender", "Air", "Water", "Fire", "Earth", "Avatar"];
	const selectedBendingType = getBendingStyle(target);
	for (const bendingType of selectionList) {
		const texturePath = bendingType === "Non-Bender"
			? "textures/ui/brewing_fuel_empty"
			: `textures/ui/avatar/${bendingType.toLowerCase()}`;
	  
		const highlightedText = bendingType === selectedBendingType
			? `${bendingType} §l[Selected]§r`
			: bendingType;
	  
		playerBendingMenu.button(highlightedText, texturePath);
	}
	
	// Show the menu and respond	
	playerBendingMenu.show(player).then((ActionFormResponse) => {
		const { selection } = ActionFormResponse;
		if (selection === undefined) return player.sendMessage("§cYou exited the menu, so your selection was not saved.");

		// Reset the tags and scores, then add new ones
		resetPlayer(target);
		player.sendMessage(`§hSet §b${target.name}'s§h bending style to §b${selectionList[selection]}§h.`);
		switch(selectionList[selection]) {
			case "Non-Bender":
				setScore(target, "level", 20, false)
				target.onScreenDisplay.setTitle("a:reset");
				break;
			case "Air":
				chooseType(target, "air");
				break;
			case "Water":
				chooseType(target, "water");
				break;
			case "Fire":
				chooseType(target, "fire");
				break;
			case "Earth":
				chooseType(target, "earth");
				break;
			case "Avatar":
				chooseType(target, "avatar");
				break;
		}
	});
}

function seeInventory(player, target) {
		let container = target.getComponent('inventory').container;
		player.sendMessage('-----------------------------------------');
		player.sendMessage(`§b${target.nameTag}§r's inventory:\n`);
		for (let i = 0; i < container.size; i++) {
			if (container.getItem(i)) {
				let o = container.getItem(i);
				player.sendMessage(`§bSlot ${i+1}:§r ${o.typeId.replace("minecraft:", "").replace("a:", "")} x${o.amount}§r`);
			}
		}
		player.sendMessage('-----------------------------------------');
}

function worldSettings(player) {
	let PREV_SETTINGS = parseSettings(getScore("settings", player));
	const settings = [
		{ name: "Choosing Bending", value: PREV_SETTINGS.BENDING_OPT, type: "dropdown", options: ["Chosen", "Random", "Admin Only"]},
		{ name: "Avatar Setting", value: PREV_SETTINGS.AVATAR_OPT, type: "dropdown", options: ["No Avatar", "Avatar Random", "Avatar For All"]},
		{ name: "Leveling Speed", value: PREV_SETTINGS.LEVEL_SPD, type: "slider", min: 1, max: 8, step: 1},
		{ name: "Chat ranks", value: PREV_SETTINGS.CHAT_RANKS, type: "toggle"},
		{ name: "Shop System", value: PREV_SETTINGS.SHOP_SYS, type: "toggle"},
		{ name: "Sethome System", value: PREV_SETTINGS.HOME_SYS, type: "toggle"},
		{ name: "Bending Choice Final", value: PREV_SETTINGS.CHOICE_FINAL, type: "toggle"},
		{ name: "Instant Cooldown (buggy)", value: PREV_SETTINGS.COOLDOWNS, type: "toggle"}
	];
	
	const worldSettings = new ModalFormData().title("Settings")	
	for (let i = 0; i < settings.length; i++) {
		let setting = settings[i]
		switch (setting.type) {
			case "toggle":
				worldSettings.toggle(setting.name + ":", setting.value);
				break;
			case "dropdown":
				worldSettings.dropdown(setting.name + ":", setting.options, setting.value);
				break;
			case "slider":
				worldSettings.slider(setting.name, setting.min, setting.max, setting.step, setting.value);
				break;
		}
	}

	worldSettings.show(player).then(async (ModalFormResponse) => {
		const { formValues } = ModalFormResponse;
		if (!formValues) return player.sendMessage("§cYou exited the menu, so your selection was not saved!");

		let [bending, avatarSet, levelSpeed, chatRank, shopSys, homeSys, finalChoice, cooldowns] = formValues;

		let message = "";
		for (let i = 0; i < formValues.length; i++) {
			let setting = settings[i];
			if (formValues[i] != setting.value) {
				switch (setting.type) {
					case "toggle":
						message += `§hUpdated ${setting.name}: ${setting.value ? "§aTrue" : "§cFalse"}§7 => ${formValues[i] ? "§aTrue" : "§cFalse"}\n`;
						break;
					case "dropdown":
						message += `§hUpdated ${setting.name}: §b${setting.options[setting.value]}§7 => §b${setting.options[formValues[i]]}\n`;
						break;
					case "slider":
						message += `§hUpdated ${setting.name}: §b${setting.value}§7 => §b${formValues[i]}\n`;
						break;
				}
			}
		}
		if (message) player.sendMessage(`----------------\n${message}§r----------------`)
		let newSettings = `${Number(bending) + 1}${Number(avatarSet) + 1}${Number(levelSpeed) + 1}${Number(chatRank) + 1}${Number(shopSys) + 1}${Number(homeSys) + 1}${Number(finalChoice) + 1}${Number(cooldowns) + 1}`;
		await player.runCommandAsync(`scoreboard players set avatar:config settings ${newSettings}`);
		await player.runCommandAsync("scoreboard players operation @a settings = avatar:config settings");
	});
}

function runCode(player) {
	let runCodeMenu = new ModalFormData();
    runCodeMenu.title("Run JS Code:");
	runCodeMenu.textField("Code", "player.applyKnockback(1,1,1,1);");

	//applyBasicDamage(player, player, "super_heavy", 1);

	runCodeMenu.show(player).then((ModalFormResponse) => {
		const { formValues } = ModalFormResponse;
		if (!formValues) return player.sendMessage("§cYou exited the menu, so your selection was not saved!");
		let code = formValues[0];
		try {
			eval(code);
		} catch (err) {
			player.sendMessage("§cFailed to execute code!")
		}
	});
}

function devTools(source) {
	let devToolsMenu = new ActionFormData();
    devToolsMenu.title("Admin Menu: Main");
    devToolsMenu.body("Select a setting to edit");
	devToolsMenu.button("Protect Area", "textures/ui/avatar/home");
	devToolsMenu.button("Run JS Code", "textures/ui/avatar/runcode");
	devToolsMenu.button("Debug", "textures/ui/avatar/ping");

	let selectionList = ["ProtectArea", "RunJSCode", "Debug"];
	devToolsMenu.show(source).then((ActionFormResponse) => {
		const { selection } = ActionFormResponse;
		switch(selectionList[selection]) {
			case "ProtectArea":
				protectArea(source);
				break;
			case "RunJSCode":
				runCode(source);
				break;
			case "Debug":
				debug(source);
				break;
		}
	})
}


export function adminMenu(source) {
	let adminMain = new ActionFormData();
    adminMain.title("Admin Menu: Main");
    adminMain.body("Select a setting to edit");
	adminMain.button("Edit Player", "textures/ui/avatar/player_settings");
	adminMain.button("World Settings", "textures/ui/avatar/home");
	adminMain.button("Dev Tools", "textures/ui/avatar/runcode");

	let selectionList = ["EditPlayer", "WorldSettings", "DevTools"];
	adminMain.show(source).then((ActionFormResponse) => {
		const { selection } = ActionFormResponse;
		switch(selectionList[selection]) {
			case "EditPlayer":
				playerSettings(source);
				break;
			case "WorldSettings":
				worldSettings(source);
				break;
			case "DevTools":
				devTools(source);
				break;
		}
	})
}