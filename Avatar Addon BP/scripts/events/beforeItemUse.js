// Dependencies
import { system, Player, ItemStack, MolangVariableMap } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import {
	getScore,
	setScore,
	showWarning,
	getBendingStyle,
	getSubBendingStyle,
	parseSettings,
	creditsMessage,
	autoSmeltItems,
	addButtonIf
} from "../util.js";

// The actual menus
import { subBending } from "../scroll/subBendingMenu.js";
import { chooseBendingMenu } from "../scroll/chooseBendingMenu.js";
import { chooseSlotsMenu } from "../scroll/chooseSlotsMenu.js";
import { settingsMenu } from "../scroll/settingsMenu.js";
import { statsMenu } from "../scroll/statsMenu.js";
import { bendingInfoMenu } from "../scroll/bendingInfoMenu.js";
import { homeMenu } from "../scroll/homeMenu.js";
import { movesetMenu } from "../scroll/movesetMenu.js";
import { shopMenu } from "../scroll/shopMenu.js";
import { adminMenu } from "../scroll/adminMenu.js";
import { skillTreeMenu } from "../scroll/skillTreeMenu.js";

// Smelt passives and Slot items
function nonScrollOperations(source, itemName, itemAmount) {
	const map = new MolangVariableMap();
	setScore(source, "detect_right", 1);
	if (itemName == "minecraft:potion") setScore(source, "water_loaded", 8);
	if (getScore("utiTier", source) >= 2 && (source.hasTag('fire') || source.hasTag('avatar'))) {
		if (source.runCommand('enchant @s fire_aspect').successCount) {
			source.dimension.spawnParticle('a:fire_blast_pop', source.location, map);
			source.sendMessage("§7Weapon engulfed in flames!");
		}
	}
	if (autoSmeltItems[itemName] && (source.hasTag('earth') || source.hasTag('fire') || source.hasTag('avatar')) && getScore("utiTier", source) >= 5) {
		return source.getComponent('inventory').container.setItem(source.selectedSlot, new ItemStack(autoSmeltItems[itemName], itemAmount));
	}
	if (itemName == "a:empty_cup") {
        const blockInFront = source.getBlockFromViewDirection({ includeLiquidBlocks: true, maxDistance: 6 });
        const isLookingAtWater = (blockInFront && blockInFront.typeId == "minecraft:water");
        if (!isLookingAtWater) return;
        
        const waterCup = new ItemStack("a:water_cup");
        source.getComponent('inventory').container.setItem(source.selectedSlot, waterCup);
    }
}

export function beforeItemUse(eventData) {
    const { itemStack, source } = eventData;
	
	// Checks if the user of the item is a player, which apparently needs to be done lol
    if (!(source instanceof Player)) return;

	// Just checks for non-scroll stuff
	if (itemStack.typeId != "a:bending_scroll") return nonScrollOperations(source, itemStack.typeId, itemStack.amount);

	// If they haven't selected sub-bending yet, this will show
	const SETTINGS = parseSettings(getScore("settings", source));
	const BENDING_STYLE = getBendingStyle(source);
	if (getScore("level", source) >= 15 && getSubBendingStyle(source) == "none" && BENDING_STYLE != "Non-bender") return subBending(source);

	// Just in case, update the players settings!
	source.runCommand("scoreboard players operation @a settings = avatar:config settings");

	// Main menu, with some weird stuff so I could enable and disable options and still have the correct return id
	let selectionList = [];
	let mainMenu = new ActionFormData();                 
	mainMenu.title("Main Menu");
	mainMenu.body("Select an option.");
	addButtonIf(mainMenu, selectionList, "Choose Bending", true, "textures/ui/avatar/avatar_logo");
	addButtonIf(mainMenu, selectionList, "Choose Slots", BENDING_STYLE != "Non-bender", "textures/ui/avatar/avatar_logo");
	addButtonIf(mainMenu, selectionList, "Skill Tree", BENDING_STYLE != "Non-bender", "textures/ui/avatar/skill_tree");
	addButtonIf(mainMenu, selectionList, "Info Guide", BENDING_STYLE != "Non-bender", "textures/ui/avatar/info");
	addButtonIf(mainMenu, selectionList, "Stats", BENDING_STYLE != "Non-bender", "textures/ui/icon_recipe_item");
	addButtonIf(mainMenu, selectionList, "Homes", SETTINGS.HOME_SYS, "textures/ui/avatar/home");
	addButtonIf(mainMenu, selectionList, "Movesets", BENDING_STYLE != "Non-bender", "textures/ui/avatar/movesets");
	addButtonIf(mainMenu, selectionList, "Shop", SETTINGS.SHOP_SYS, "textures/ui/avatar/shop");
	addButtonIf(mainMenu, selectionList, "Settings", BENDING_STYLE != "Non-bender", "textures/ui/settings_glyph_color_2x");
	addButtonIf(mainMenu, selectionList, "Credits", true, "textures/ui/avatar/credits");
	addButtonIf(mainMenu, selectionList, "Admin Menu", source.isOp() || source.hasTag("staff") || source.hasTag("op"), "textures/ui/op");

	// Main navigation start
	system.run(() => {
		mainMenu.show(source).then((ActionFormResponse) => {
			const { selection } = ActionFormResponse;
			switch(selectionList[selection]) {
				case "ChooseBending":
					chooseBendingMenu(source);
					break;
				case "ChooseSlots":
					chooseSlotsMenu(source);
					break;
				case "Settings":
					settingsMenu(source);
					break;
				case "SkillTree":
					skillTreeMenu(source);
					break;	
				case "InfoGuide":
					bendingInfoMenu(source);
					break;
				case "Stats":
					statsMenu(source);
					break;		
				case "Homes":
					homeMenu(source);
					break;
				case "Movesets":
					movesetMenu(source);
					break;
				case "Shop":
					shopMenu(source);
					break;
				case "Credits":
					showWarning(source, "Credits:", creditsMessage)
					break;
				case "AdminMenu":
					adminMenu(source);
					break;
			};
		});
	});
}