// Dependencies
import { Player, ItemStack, MinecraftItemTypes } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { actionMoves } from "./tickEvent.js";
import { getScore, showWarning, creditsMessage } from "./../util.js";

// The actual menus
import { subBending } from "./../scroll/subBendingMenu.js";
import { chooseBendingMenu } from "./../scroll/chooseBendingMenu.js";
import { chooseSlotsMenu } from "./../scroll/chooseSlotsMenu.js";
import { settingsMenu } from "./../scroll/settingsMenu.js";
import { statsMenu } from "./../scroll/statsMenu.js";
import { bendingInfoMenu } from "./../scroll/bendingInfoMenu.js";
import { homeMenu } from "./../scroll/homeMenu.js";
import { movesetMenu } from "./../scroll/movesetMenu.js";
import { shopMenu } from "./../scroll/shopMenu.js";
import { mobileMenu } from "./../scroll/mobileMenu.js";
import { adminMenu } from "./../scroll/adminMenu.js";

export function itemUse(eventData) {
    let { item, source } = eventData;

	// Checks if the user of the item is a player, which apparently needs to be done lol
    if (!(source instanceof Player)) return;
	
	// Just checks for non-scroll stuff
    if (item.typeId != "a:bending_scroll") {
		if (!item.typeId.includes("slot")) {
			if (source.hasTag('earth') || source.hasTag('avatar')) {
				if (item.typeId === "minecraft:raw_iron") {
					source.getComponent('inventory').container.setItem(source.selectedSlot, new ItemStack(MinecraftItemTypes.ironIngot, item.amount));
					for (let i = 0; i < 3; i++) source.runCommandAsync("particle a:metal_powerup_signal ~~~");
				}
			}
			if (source.hasTag('fire') || source.hasTag('avatar')) {
				if (["minecraft:cod", "minecraft:beef", "minecraft:chicken", "minecraft:porkchop", "minecraft:rabbit", "minecraft:mutton", "minecraft:salmon"].includes(item.typeId)) source.runCommandAsync("particle a:fire_charge_quick ~~~");
				if (item.typeId === "minecraft:cod") source.getComponent('inventory').container.setItem(source.selectedSlot, new ItemStack(MinecraftItemTypes.cookedCod, item.amount));
				if (item.typeId === "minecraft:beef") source.getComponent('inventory').container.setItem(source.selectedSlot, new ItemStack(MinecraftItemTypes.cookedBeef, item.amount)); 
				if (item.typeId === "minecraft:chicken") source.getComponent('inventory').container.setItem(source.selectedSlot, new ItemStack(MinecraftItemTypes.cookedChicken, item.amount));
				if (item.typeId === "minecraft:porkchop") source.getComponent('inventory').container.setItem(source.selectedSlot, new ItemStack(MinecraftItemTypes.cookedPorkchop, item.amount));
				if (item.typeId === "minecraft:rabbit") source.getComponent('inventory').container.setItem(source.selectedSlot, new ItemStack(MinecraftItemTypes.cookedRabbit, item.amount));
				if (item.typeId === "minecraft:mutton") source.getComponent('inventory').container.setItem(source.selectedSlot, new ItemStack(MinecraftItemTypes.cookedMutton, item.amount));
				if (item.typeId === "minecraft:salmon") source.getComponent('inventory').container.setItem(source.selectedSlot, new ItemStack(MinecraftItemTypes.cookedSalmon, item.amount));
			}
		} else if ((source.hasTag("avatar") || source.hasTag("air") || source.hasTag("fire") || source.hasTag("water") || source.hasTag("earth")) && !source.hasTag("antimagic") && !source.hasTag("bending_off") && !source.hasTag("chi_blocked") && getScore("cooldown1", source) === 100) { 
			if (item.typeId === "a:slot_1") {
				actionMoves(source, 1);
			} else if (item.typeId === "a:slot_2") {
				actionMoves(source, 2); 
			} else if (item.typeId === "a:slot_3") {
				actionMoves(source, 3);
			} else if (item.typeId === "a:slot_4") {
				actionMoves(source, 4);
			}
		}
		return;
	}

	// If they haven't selected sub-bending yet, this will show
	if (getScore("level", source) >= 15 && (!source.hasTag("sub_spirit")) && (!source.hasTag("sub_projectile")) && (!source.hasTag("sub_lightning")) && (!source.hasTag("sub_combustion")) && (!source.hasTag("sub_blood")) && (!source.hasTag("sub_healing")) && (!source.hasTag("sub_metal")) && (!source.hasTag("sub_lava")) ) {
		return subBending(source);
	}

	// Main menu, with some weird stuff so I could enable and disable options and still have the correct return id
	let selectionList = ["choose_bending", "choose_slots", "settings", "stats", "info"]
	let mainMenu = new ActionFormData();
	mainMenu.title("Main Menu");
	mainMenu.body("Select an option.");
	mainMenu.button("Choose Bending", "textures/ui/avatar_logo");
	mainMenu.button("Choose Slots", "textures/ui/avatar_logo");
	mainMenu.button("Settings", "textures/ui/settings_glyph_color_2x");
	mainMenu.button("Stats", "textures/ui/icon_recipe_item");
	mainMenu.button("Bending Info", "textures/ui/info");
	if (!getScore("home", source)) {
		mainMenu.button("Homes", "textures/ui/home");
		selectionList.push("home");
	}
	mainMenu.button("Movesets", "textures/ui/movesets");
	selectionList.push("moveset");
	if (!getScore("shop", source)) {
		mainMenu.button("Shop", "textures/ui/shop");
		selectionList.push("shop");
	}
	mainMenu.button("Mobile Mode", "textures/ui/mobile");
	selectionList.push("mobile");

	if (source.isOp()) {
		mainMenu.button("Admin Menu", "textures/ui/op");
		selectionList.push("admin");
	}

	
	mainMenu.button("Credits", "textures/ui/credits");
	selectionList.push("credits");
	

	// Main navigation start \/
	mainMenu.show(source).then((ActionFormResponse) => {
		const { selection } = ActionFormResponse;
		switch(selectionList[selection]) {
			case "choose_bending":
				chooseBendingMenu(source);
				break;
			case "choose_slots":
				chooseSlotsMenu(source);
				break;
			case "settings":
				settingsMenu(source);
				break;
			case "stats":
				statsMenu(source);
				break;
			case "info":
				bendingInfoMenu(source);
				break;
			case "home":
				homeMenu(source);
				break;
			case "moveset":
				movesetMenu(source);
				break;
			case "shop":
				shopMenu(source);
				break;
			case "mobile":
				mobileMenu(source);
				break;
			case "admin":
				adminMenu(source);
				break;
			case "credits":
				showWarning(source, "Credits:", creditsMessage)
				break;
		}
	})
}