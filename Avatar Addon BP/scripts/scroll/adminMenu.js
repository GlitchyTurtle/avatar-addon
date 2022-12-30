import { world } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
import { getScore, showWarning } from "./../util.js";

export function adminMenu(source) {
	let adminMain = new ActionFormData();
    adminMain.title("Admin Menu: Main");
    adminMain.body("Select a setting to edit");
	adminMain.button("Player Level", "textures/ui/player_settings");
	adminMain.button("Player Inventory", "textures/ui/inventory");
	adminMain.button("World Settings", "textures/ui/home");
	adminMain.button("Ping", "textures/ui/ping");
	
	let players = [];
    for (let player of world.getPlayers()) {
        players.push(player.nameTag);
    }
	
	let chatSettings = ["No Chat Ranks", "Logo Chat Ranks"];
	let avatarSettings = ["No Avatar", "Avatar For All"];
	let worldSettingMenu = new ModalFormData();
    worldSettingMenu.title("Edit World Settings");

	worldSettingMenu.dropdown("Chat ranks:", chatSettings, !getScore("chatRankSet", source));

	worldSettingMenu.dropdown("Avatar setting:", avatarSettings, !getScore("avatarSet", source));
	if (!getScore("shop", source)) {
		worldSettingMenu.toggle("Shop System", true);
	} else {
		worldSettingMenu.toggle("Shop System", false);
	}
	if (!getScore("home", source)) {
		worldSettingMenu.toggle("Sethome System", true);
	} else {
		worldSettingMenu.toggle("Sethome System", false);
	}
	if (!getScore("cdSet", source)) {
		worldSettingMenu.toggle("Cooldown Time (buggy)", true);
	} else {
		worldSettingMenu.toggle("Cooldown Time (buggy)", false);
	}
	
	let playerSettingMenuLevel = new ModalFormData();
    playerSettingMenuLevel.title("Edit Player Level");
	playerSettingMenuLevel.dropdown("Player Name:", players, 0);
	playerSettingMenuLevel.slider("Player Level", 0, 200, 1, 0);
	
	let playerInventoryMenu = new ModalFormData();
    playerInventoryMenu.title("See Player Inventory");
	playerInventoryMenu.dropdown("Player Name:", players, 0);
	
	adminMain.show(source).then((ActionFormResponse) => {
		const { selection } = ActionFormResponse;
        if (selection === 0) {
			playerSettingMenuLevel.show(source).then((ModalFormResponse) => {
				const { formValues } = ModalFormResponse;
				let [playerSelected, levelSelected] = formValues;
				source.runCommandAsync( `playsound random.levelup @s`);
				source.runCommandAsync( `scoreboard players set ${players[playerSelected]} sub_level 0`);
				source.runCommandAsync( `scoreboard players set ${players[playerSelected]} level ${levelSelected}`);
				source.runCommandAsync( `tellraw @s {"rawtext":[{"text":"§aSet ${players[playerSelected]}'s level to ${levelSelected}."}]}`);
			})

		} else if (selection === 1) {
			playerInventoryMenu.show(source).then((ModalFormResponse) => {
				const { formValues } = ModalFormResponse;
				let [playerSelected] = formValues;
				source.runCommandAsync( `playsound random.levelup @s`);
				let member;
				for (let pl of world.getPlayers()) {
					if (pl.nameTag.toString() === players[playerSelected].toString()) {
						member = pl;
						break;
					}
				}
				let container = member.getComponent('inventory').container;
				source.runCommandAsync( 'tellraw @s {"rawtext":[{"text":"-----------------------------------------§r"}]}');
				source.runCommandAsync( `tellraw @s {"rawtext":[{"text":"§b${member.nameTag}§r's inventory:\n"}]}`);
				for (let i = 0; i < container.size; i++) {
					if (container.getItem(i)) {
						let o = container.getItem(i);
						source.runCommandAsync( `tellraw @s {"rawtext":[{"text":"§bSlot ${i+1}:§r ${o.typeId.replace("minecraft:", "").replace("a:", "")} x${o.amount}§r"}]}`);
					}
				}
				source.runCommandAsync( 'tellraw @s {"rawtext":[{"text":"-----------------------------------------§r"}]}');
			})
		} else if (selection === 2) {
			worldSettingMenu.show(source).then((ModalFormResponse) => {
				source.runCommandAsync( `playsound random.levelup @s`);
				const { formValues } = ModalFormResponse;
				let [chatRank, avatarSet, shopSys, homeSys, cooldowns] = formValues;
				console.warn(`C${chatRank} A${avatarSet} S${shopSys} H${homeSys} C${cooldowns}`);
				//Remember, in this case, 1 is False, and 0 is True!
				if (chatRank) {
					source.runCommandAsync( 'scoreboard players set avatar:config chatRankSet 0');
					source.runCommandAsync( 'tellraw @s {"rawtext":[{"text":"§aChat Ranks are now enabled!"}]}');
				} else {
					source.runCommandAsync( 'scoreboard players set avatar:config chatRankSet 1');
					source.runCommandAsync( 'tellraw @s {"rawtext":[{"text":"§cChat Ranks are now disabled."}]}');
				}

				if (avatarSet) {
					source.runCommandAsync( 'scoreboard players set avatar:config avatarSet 0');
					source.runCommandAsync( 'tellraw @s {"rawtext":[{"text":"§aChoosing the Avatar is now enabled!"}]}');
				} else {
					source.runCommandAsync( 'scoreboard players set avatar:config avatarSet 1');
					source.runCommandAsync( 'tellraw @s {"rawtext":[{"text":"§cChoosing the Avatar is now disabled."}]}');
				}

				if (shopSys) {
					source.runCommandAsync( 'scoreboard players set avatar:config shop 0');
					source.runCommandAsync( 'tellraw @s {"rawtext":[{"text":"§aShops are now enabled!"}]}');
				} else {
					source.runCommandAsync( 'scoreboard players set avatar:config shop 1');
					source.runCommandAsync( 'tellraw @s {"rawtext":[{"text":"§cShops are now disabled."}]}');
				}
				if (homeSys) {
					source.runCommandAsync( 'scoreboard players set avatar:config home 0');
					source.runCommandAsync( 'tellraw @s {"rawtext":[{"text":"§aHomes are now enabled!"}]}');
				} else {
					source.runCommandAsync( 'scoreboard players set avatar:config home 1');
					source.runCommandAsync( 'tellraw @s {"rawtext":[{"text":"§cHomes are now disabled."}]}');
				}
				if (cooldowns) {
					source.runCommandAsync( 'scoreboard players set avatar:config cdSet 0');
					source.runCommandAsync( 'tellraw @s {"rawtext":[{"text":"§aCooldowns are now enabled!"}]}');
				} else {
					showWarning(source, "Cooldowns Disabled", "Warning! This is not an intended feature, so any bugs experienced here are not worth reporting. Enabling this feature may cause extra lag, crashes, and more.");
					source.runCommandAsync( 'scoreboard players set avatar:config cdSet 1');
					source.runCommandAsync( 'tellraw @s {"rawtext":[{"text":"§cCooldowns are now disabled."}]}');
				}
				source.runCommandAsync( 'scoreboard players operation @a chatRankSet = avatar:config chatRankSet');
				source.runCommandAsync( 'scoreboard players operation @a avatarSet = avatar:config avatarSet');
				source.runCommandAsync( 'scoreboard players operation @a shop = avatar:config shop');
				source.runCommandAsync( 'scoreboard players operation @a home = avatar:config home');
				source.runCommandAsync( 'scoreboard players operation @a cdSet = avatar:config cdSet');
			})
		} else if (selection === 3) {
			source.runCommandAsync( `playsound random.levelup @s`);
		    let pingTick = world.events.tick.subscribe(({ deltaTime }) => {
				let tps = 1/deltaTime
				if (tps > 10) {
					source.runCommandAsync( `tellraw @s {"rawtext":[{"text":"§aPong! Current TPS: ${tps}"}]}`);
				} else {
					source.runCommandAsync( `tellraw @s {"rawtext":[{"text":"§cPong! Current TPS: ${tps}"}]}`);
				}
				world.events.tick.unsubscribe(pingTick);
			})
		}
	})
}