import { system, Player, ItemStack, MolangVariableMap } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { playerHasSkill } from "../scroll/skillTreeMenu.js";
import {
	getScore,
	setScore,
	showWarning,
	getBendingStyle,
	parseSettings,
	creditsMessage,
	autoSmeltItems,
	addButtonIf,
	calcVectorOffset,
	canBend,
	patreon
} from "../util.js";

// The actual menus
import { chooseBendingMenu } from "../scroll/chooseBendingMenu.js";
import { chooseSlotsMenu } from "../scroll/chooseSlotsMenu.js";
import { settingsMenu } from "../scroll/settingsMenu.js";
import { homeMenu } from "../scroll/homeMenu.js";
import { movesetMenu } from "../scroll/movesetMenu.js";
import { paiShoMenu } from "../paisho/paisho.js";
import { bendingInfoMenu } from "../scroll/bendingInfoMenu.js";
import { shopMenu } from "../scroll/shopMenu.js";
import { adminMenu } from "../scroll/adminMenu.js";
import { skillTreeMenu } from "../scroll/skillTreeMenu.js";
import { claimMenu } from "../scroll/claimMenu.js";
import { statsMenu } from "../scroll/statsMenu.js";
import { patreonMenu } from "../scroll/patreonMenu.js";

function nonScrollOperations(source, itemName, itemAmount) {
	if (itemName == "minecraft:iron_nugget" && playerHasSkill(source, "Metal Bullets")) {
		if (itemAmount == 1) {
			source.getComponent('inventory').container.setItem(source.selectedSlot, null);
		} else {
			source.getComponent('inventory').container.setItem(source.selectedSlot, new ItemStack("minecraft:iron_nugget", itemAmount - 1));
		}
		return source.dimension.spawnEntity("a:metal_shot", calcVectorOffset(source, 0, 1, 1));
	}

	const map = new MolangVariableMap();
	setScore(source, "detect_right", 1);
	
	if (itemName == "minecraft:potion" || itemName == "a:water_cup") setScore(source, "water_loaded", 8);
	if (playerHasSkill(source, "Engulf")) {
		if (source.runCommand('enchant @s fire_aspect').successCount) {
			source.dimension.spawnParticle('a:fire_blast_pop', source.location, map);
			source.sendMessage("§7Weapon engulfed in flames!");
		}
	}
	if (autoSmeltItems[itemName] && playerHasSkill(source, "Hot-Handed")) {
		source.dimension.spawnParticle('a:fire_blast_pop', source.location, map);
		return source.getComponent('inventory').container.setItem(source.selectedSlot, new ItemStack(autoSmeltItems[itemName], itemAmount));
	}
	if (itemName == "a:empty_cup") {
        const blockInFront = source.getBlockFromViewDirection({ includeLiquidBlocks: true });
        const isLookingAtWater = (blockInFront && (blockInFront.block.typeId == "minecraft:water" || blockInFront.block.typeId == "minecraft:flowing_water"));
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

	// Just in case, update the players settings!
	source.runCommand("scoreboard players operation @a settings = avatar:config settings");
	const SETTINGS = parseSettings(getScore("settings", source));

	// We need these for the scroll checks
	const BENDING_STYLE = getBendingStyle(source);
	const CAN_BEND = canBend(source)


	// Main menu, with some weird stuff so I could enable and disable options and still have the correct return id
	let selectionList = [];
	let mainMenu = new ActionFormData();                 
	mainMenu.title("Main Menu");
	mainMenu.body("Select an option.");
	addButtonIf(mainMenu, selectionList, "Choose Bending", true, "textures/ui/avatar/avatar_logo");
	addButtonIf(mainMenu, selectionList, "Choose Slots", BENDING_STYLE != "Non-bender" && CAN_BEND, "textures/ui/avatar/avatar_logo");
	addButtonIf(mainMenu, selectionList, "Skill Tree", BENDING_STYLE != "Non-bender" && CAN_BEND, "textures/ui/avatar/skill_tree");
	addButtonIf(mainMenu, selectionList, "Movesets", BENDING_STYLE != "Non-bender" && CAN_BEND, "textures/ui/avatar/movesets");

	addButtonIf(mainMenu, selectionList, "Stats", BENDING_STYLE != "Non-bender", "textures/ui/icon_recipe_item");
	addButtonIf(mainMenu, selectionList, "Homes", SETTINGS.HOME_SYS, "textures/ui/avatar/home");
	addButtonIf(mainMenu, selectionList, "Claim", true, "textures/ui/avatar/passives");
	addButtonIf(mainMenu, selectionList, "Shop", SETTINGS.SHOP_SYS, "textures/ui/avatar/shop");

	addButtonIf(mainMenu, selectionList, "Info Guide", true, "textures/ui/avatar/info");
	addButtonIf(mainMenu, selectionList, "Pai Sho", true, "textures/ui/avatar/pai_sho/w/king");

	addButtonIf(mainMenu, selectionList, "Settings", BENDING_STYLE != "Non-bender", "textures/ui/settings_glyph_color_2x");
	addButtonIf(mainMenu, selectionList, "Credits", true, "textures/ui/avatar/credits");
	addButtonIf(mainMenu, selectionList, "Admin Menu", source.isOp() || source.hasTag("staff") || source.hasTag("op"), "textures/ui/op");
	addButtonIf(mainMenu, selectionList, "Patreon Capes", patreon.includes(source.name), "textures/ui/avatar/capes/gold");

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
				case "PaiSho":
					paiShoMenu(source);
					break;
				case "Claim":
					claimMenu(source);
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
				case "PatreonCapes":
					patreonMenu(source);
					break;
			};
		});
	});
}