import { world, Player, ItemStack, MinecraftItemTypes } from "mojang-minecraft";
import { ActionFormData, ModalFormData } from "mojang-minecraft-ui"
import { betaTesters, getScore, getBendingStyle, getSubBendingStyle } from "./../util.js";
import commands from './../moves/import.js';
import { stats } from "./../commands/main/stats.js";

let moveList;
let args;

export function scrollMenu(eventData) {
    let { item, source } = eventData;

    if (!(source instanceof Player)) {
        return;
    }

    if (item.id === "a:bending_scroll") {
        let prevscore1 = getScore("moveslot1", source)
        let prevscore2 = getScore("moveslot2", source)
        let prevscore3 = getScore("moveslot3", source)
        let prevscore4 = getScore("moveslot4", source)
        let prevscore5 = getScore("moveslot5", source)
        let prevscore6 = getScore("moveslot6", source)
		let commandslist = Object.values(commands)
		moveList = ["Leave Empty"]
		for (let i = 0; i < commandslist.length; i++) {
			if (commandslist[i].style === getBendingStyle(source).toLowerCase() && commandslist[i].unlockable <= getScore("level", source) && (!commandslist[i].sub_bending_required || commandslist[i].sub_bending_required === getSubBendingStyle(source))) {
				moveList.push(`${commandslist[i].name}`);
			}
		}
		
        let chooseSlot = new ModalFormData();
        chooseSlot.title(`Slot Choice Menu: ${getBendingStyle(source)}`);
        chooseSlot.dropdown(`${getBendingStyle(source)} Move Slot #1`, moveList, prevscore1);
        chooseSlot.dropdown(`${getBendingStyle(source)} Move Slot #2`, moveList, prevscore2);
        chooseSlot.dropdown(`${getBendingStyle(source)} Move Slot #3`, moveList, prevscore3);
        chooseSlot.dropdown(`${getBendingStyle(source)} Move Slot #4`, moveList, prevscore4);
        if (getScore("level", source) >= 20) {
            chooseSlot.dropdown(`${getBendingStyle(source)} Move Slot #5`, moveList, prevscore5);
        }
        if (getScore("level", source) >= 30) {
            chooseSlot.dropdown(`${getBendingStyle(source)} Move Slot #6`, moveList, prevscore6);
        }

        let settingMenu = new ModalFormData();
        settingMenu.title("Settings");
		if (source.hasTag("chatmsgoff")) { settingMenu.toggle("Show Move Messages", false); } else { settingMenu.toggle("Show Move Messages", true); }
        settingMenu.toggle("Enable Bending", true);
        if (source.hasTag("hide_stats")) { settingMenu.toggle("Public Stats", false); } else { settingMenu.toggle("Public Stats", true); }

        let chooseStyle = new ActionFormData();
        chooseStyle.title("Bending Style Menu");
        chooseStyle.body("Choose your bending style here! Your level will be reset upon choosing though.");
        chooseStyle.button("Air", "textures/ui/air");
        chooseStyle.button("Water", "textures/ui/water");
        chooseStyle.button("Fire", "textures/ui/fire");
        chooseStyle.button("Earth", "textures/ui/earth");
        if (!getScore("aas", source)) {
            chooseStyle.button("Avatar", "textures/ui/avatar");
        }

        let mainMenu = new ActionFormData();
        let bendingdisabled;
        mainMenu.title("Main Menu");
        if (!source.hasTag('antimagic')) {
			bendingdisabled = false
            mainMenu.button("Choose Bending", "textures/ui/avatar");
            mainMenu.button("Choose Slots", "textures/ui/avatar");
            mainMenu.button("Settings", "textures/ui/settings");
            mainMenu.button("Stats", "textures/ui/stats");
        } else {
			bendingdisabled = true
            mainMenu.body("Please enable bending to use this menu. Type §b!bending§r in chat.")
			mainMenu.button("Enable Bending", "textures/ui/avatar");
        }

        let players = [];

        for (let player of world.getPlayers()) {
            players.push(player.nameTag);
        }

        let statsMenu = new ModalFormData();
        statsMenu.title("See Player Stats");
        statsMenu.dropdown("Player Name:", players, 0);

		if (getScore("level", source) >= 15 && (!source.hasTag("sub_spirit")) && (!source.hasTag("sub_projectile")) && (!source.hasTag("sub_lightning")) && (!source.hasTag("sub_combustion")) && (!source.hasTag("sub_blood")) && (!source.hasTag("sub_healing")) && (!source.hasTag("sub_metal")) && (!source.hasTag("sub_lava")) ) {
			let subBending = new ActionFormData();
			
			subBending.title("Choose your sub-bending!");
			
			if (source.hasTag("air")) {
				subBending.body("Pick one of the two options to start training! \n\nSpirit - lets you become a spirit (unlockable new move at level 50), which can fly through blocks and scout areas out. \n\nProjectile -  bends the air around your arrows so they never miss again (range increases with level).");
				subBending.button("Spirit", "textures/ui/avatar");
				subBending.button("Projectile", "textures/ui/avatar");
			} else if (source.hasTag("fire")) {
				subBending.body("Pick one of the two options to start training! \n\nLightning - certain moves get a buff of added lightning. \n\nCombustion - certain moves get a buff of added explosions, plus one extra move that replaces fireball.");
				subBending.button("Lightning", "textures/ui/avatar");
				subBending.button("Combustion", "textures/ui/avatar");
			} else if (source.hasTag("water")) {
				subBending.body("Pick one of the two options to start training! \n\nBlood - lets you freeze players in place on full moons by double sneaking. \n\nHealing -  heal yourself and other players. Buffs any healing moves greatly.");
				subBending.button("Blood", "textures/ui/avatar");
				subBending.button("Healing", "textures/ui/avatar");
			} else if (source.hasTag("earth")) {
				subBending.body("Pick one of the two options to start training! \n\Metal - get extra iron when mining and a strength effect after mining iron, as well as two new moves! \n\Lava - Get two new moves!");
				subBending.button("Metal", "textures/ui/avatar");
				subBending.button("Lava", "textures/ui/avatar");
			} else if (source.hasTag("avatar")) {
				subBending.body("Pick one of the one option to start training! \n\nSpirit - lets you become a spirit (unlockable new move at level 50), which can fly through blocks and scout areas out. \n\nProjectile -  bends the air around your arrows so they never miss again (range increases with level). \n\nLightning - certain moves get a buff of added lightning. \n\nCombustion - certain moves get a buff of added explosions, plus one extra move that replaces fireball. \n\nBlood - lets you freeze players in place on full moons by double sneaking. \n\nHealing -  heal yourself and other players. Buffs any healing moves greatly. \n\Metal - get extra iron when mining and a strength effect after mining iron. \n\Lava - Get certain moves buffed with fire.");
				subBending.button("Spirit", "textures/ui/avatar");
				subBending.button("Projectile", "textures/ui/avatar");
				subBending.button("Lightning", "textures/ui/avatar");
				subBending.button("Combustion", "textures/ui/avatar");
				subBending.button("Blood", "textures/ui/avatar");
				subBending.button("Healing", "textures/ui/avatar");
				subBending.button("Metal", "textures/ui/avatar");
				subBending.button("Lava", "textures/ui/avatar");
			}
			subBending.show(source).then((ActionFormResponse) => {
				const { selection } = ActionFormResponse;
				console.warn(`subBending : ${selection}`)
				if (selection === 0 || selection === 1) {
					if (source.hasTag("air")) { selection ? source.runCommand(`tag @s add sub_projectile`) : source.runCommand(`tag @s add sub_spirit`); }
					if (source.hasTag("fire")) { selection ? source.runCommand(`tag @s add sub_combustion`) : source.runCommand(`tag @s add sub_lightning`); }
					if (source.hasTag("water")) { selection ? source.runCommand(`tag @s add sub_healing`) : source.runCommand(`tag @s add sub_blood`); }
					if (source.hasTag("earth")) { selection ? source.runCommand(`tag @s add sub_lava`) : source.runCommand(`tag @s add sub_metal`); }
					if (source.hasTag("avatar")) {
						if (selection === 0) {
							source.runCommand(`tag @s add sub_spirit`)
						} else if (selection === 1) {
							source.runCommand(`tag @s add sub_projectile`)
						} else if (selection === 2) {
							source.runCommand(`tag @s add sub_lightning`)
						} else if (selection === 3) {
							source.runCommand(`tag @s add sub_combustion`)
						} else if (selection === 4) {
							source.runCommand(`tag @s add sub_blood`)
						} else if (selection === 5) {
							source.runCommand(`tag @s add sub_healing`)
						} else if (selection === 6) {
							source.runCommand(`tag @s add sub_metal`)
						} else {
							source.runCommand(`tag @s add sub_lava`)
						}
					}
				}
			})
		} else {
			mainMenu.show(source).then((ActionFormResponse) => {
				const { selection } = ActionFormResponse;
				console.warn(`mainMenu : ${selection}`)
				if (bendingdisabled && selection === 0) {
					source.runCommand(`tellraw @s {"rawtext":[{"text":"§aYou have your bending now!§r"}]}`);
					source.runCommand(`tag @s remove antimagic`);
					return;
				}
				if (selection === 0) {
					chooseStyle.show(source).then((ActionFormResponse) => {
						const { selection } = ActionFormResponse;
						console.warn(`chooseStyle : ${selection}`)
						if (selection === 0 && !source.hasTag('antimagic')) {
							source.runCommand(`say test`)
							resetSelf(source);
							source.runCommand(`say test2`)
							become(source, "air");
							source.runCommand(`say test3`)
						} else if (selection === 1 && !source.hasTag('antimagic')) {
							resetSelf(source);
							become(source, "water");
						} else if (selection === 2 && !source.hasTag('antimagic')) {
							resetSelf(source);
							become(source, "fire");
						} else if (selection === 3 && !source.hasTag('antimagic')) {
							resetSelf(source);
							become(source, "earth");
						} else if (selection === 4 && !source.hasTag('antimagic')) {
							resetSelf(source);
							become(source, "avatar");
						}
					})
				} else if (selection === 1) {
					if (!source.hasTag("avatar") && !source.hasTag("air") && !source.hasTag("water") && !source.hasTag("fire") && !source.hasTag("earth")) {
						source.runCommand(`tellraw ${source.nameTag} {"rawtext":[{"text":"§cChoose a bending type first!"}]}`);
						return;
					}
					chooseSlot.show(source).then((ModalFormResponse) => {
						const { formValues } = ModalFormResponse;
						let [slotchoice1, slotchoice2, slotchoice3, slotchoice4, slotchoice5, slotchoice6] = formValues;
						console.warn(`chooseSlot : ${slotchoice1} : ${slotchoice2} : ${slotchoice3} : ${slotchoice4} : ${slotchoice5} : ${slotchoice6}`);
						source.runCommand(`scoreboard players set @s moveslot1 ${slotchoice1}`);
						source.runCommand(`scoreboard players set @s moveslot2 ${slotchoice2}`);
						source.runCommand(`scoreboard players set @s moveslot3 ${slotchoice3}`);
						source.runCommand(`scoreboard players set @s moveslot4 ${slotchoice4}`);
						if (getScore("level", source) >= 20) {
							source.runCommand(`scoreboard players set @s moveslot5 ${slotchoice5}`);
						}
						if (getScore("level", source) >= 30) {
							source.runCommand(`scoreboard players set @s moveslot6 ${slotchoice6}`);
						}
					})
				} else if (selection === 2) {
					settingMenu.show(source).then((ModalFormResponse) => {
						const { formValues } = ModalFormResponse;
						let [moveMessages, enableBending, publicStats] = formValues;
						console.warn(`infoPage : ${moveMessages} : ${enableBending} : ${publicStats}`);
						if (moveMessages) {
							source.removeTag('chatmsgoff');
						} else {
							source.addTag('chatmsgoff');
						}
						if (enableBending) {
							source.removeTag('antimagic');
						} else {
							source.addTag('antimagic');
						}
						if (publicStats) {
							source.removeTag('hide_stats');
						} else {
							source.addTag('hide_stats');
						}
					})
				} else if (selection === 3) {
					statsMenu.show(source).then((ModalFormResponse) => {
						const { formValues } = ModalFormResponse;
						let [target] = formValues;
						console.warn(`statsPage : ${players[target].toString().toLowerCase()} -> ${source.nameTag}`);
						try {
							args = [`${players[target].toString().toLowerCase()}`]
							stats(source, args);
						} catch (e) {
							source.runCommand(`tellraw ${source.nameTag} {"rawtext":[{"text":"§c${players[target]} has their stats privated currently."}]}`);
						}
					})
				}
			})
		}
    } else if (source.hasTag('fire')) {
		if (item.id === "minecraft:cod") { source.getComponent('inventory').container.setItem(source.selectedSlot, new ItemStack(MinecraftItemTypes.cookedCod, item.amount)); }
		if (item.id === "minecraft:beef") { source.getComponent('inventory').container.setItem(source.selectedSlot, new ItemStack(MinecraftItemTypes.cookedBeef, item.amount)); }
		if (item.id === "minecraft:chicken") { source.getComponent('inventory').container.setItem(source.selectedSlot, new ItemStack(MinecraftItemTypes.cookedChicken, item.amount)); }
		if (item.id === "minecraft:porkchop") { source.getComponent('inventory').container.setItem(source.selectedSlot, new ItemStack(MinecraftItemTypes.cookedPorkchop, item.amount)); }
		if (item.id === "minecraft:rabbit") { source.getComponent('inventory').container.setItem(source.selectedSlot, new ItemStack(MinecraftItemTypes.cookedRabbit, item.amount)); }
		if (item.id === "minecraft:mutton") { source.getComponent('inventory').container.setItem(source.selectedSlot, new ItemStack(MinecraftItemTypes.cookedMutton, item.amount)); }
		if (item.id === "minecraft:salmon") { source.getComponent('inventory').container.setItem(source.selectedSlot, new ItemStack(MinecraftItemTypes.cookedSalmon, item.amount)); }
	}
}


function resetSelf(source) {
	source.runCommand("say test");
	source.runCommand("scoreboard players set @s moveslot1 0");
	source.runCommand("scoreboard players set @s moveslot2 0");
	source.runCommand("scoreboard players set @s moveslot3 0");
	source.runCommand("scoreboard players set @s moveslot4 0");
	source.runCommand("scoreboard players set @s moveslot5 0");
	source.runCommand("scoreboard players set @s moveslot6 0");
	try { source.runCommand("tag @s remove air"); } catch (error) {}
	try { source.runCommand("tag @s remove earth"); } catch (error) {}
	try { source.runCommand("tag @s remove fire"); } catch (error) {}
	try { source.runCommand("tag @s remove water"); } catch (error) {}
	try { source.runCommand("tag @s remove avatar"); } catch (error) {}
	source.runCommand("scoreboard players set @s level 0");
	source.runCommand("scoreboard players set @s sub_level 0");
}

function become(source, type) {
	if (type != 'avatar') {
		source.runCommand(`event entity @s become_${type}`);
		source.runCommand(`tag @s add ${type}`);
		source.runCommand(`particle a:choose_${type}`);
		source.runCommand(`title @s title a:${type}`);
	} else if (type === 'avatar') {
		source.runCommand(`event entity @s become_${type}`);
		source.runCommand(`tag @s add ${type}`);
		source.runCommand(`particle a:choose_air`);
		source.runCommand(`particle a:choose_fire`);
		source.runCommand(`particle a:choose_earth`);
		source.runCommand(`particle a:choose_water`);
		source.runCommand(`title @s title a:air`);
	}
}