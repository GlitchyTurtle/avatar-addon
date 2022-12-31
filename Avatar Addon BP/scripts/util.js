import { world, GameMode } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui"

export function getScore(objective, target) {
    try {
        const oB = world.scoreboard.getObjective(objective);
        if (typeof target == 'string') return oB.getScore(oB.getParticipants().find(pT => pT.displayName == target));
        return parseInt(oB.getScore(target.scoreboard));
    } catch {
        return undefined;
    }
}

export function toCamelCase(str) {
    const regExp = /[^a-zA-Z0-9]+(.)/ig;
    return str.replace(regExp, (match) => {
        return match[1].toUpperCase();
    });
}

export function checkItemAmount(player, itemId, clearItems = false) {
    const inventory = player.getComponent("minecraft:inventory").container;
    let itemAmount = 0;
    for (let i = 0; i < 36; i++) {
        let item = inventory.getItem(i);
        if (item?.typeId != itemId) continue;
        itemAmount += item.amount;
    } if (clearItems) player.runCommandAsync(`clear @s ${itemId}`)
    return itemAmount;
};

// Thanks to Jayly#1397 for this function
export function getGamemode(player) {
    return Object.values(GameMode).find(
      (g) => [...world.getPlayers({ name: player.name, gameMode: g })].length
    );
}

export function getBendingStyle(player) {
	let bendingstyle;
	if (player.hasTag('air')) {
		bendingstyle = "Air";
	} else if (player.hasTag('earth')) {
		bendingstyle = "Earth";
	} else if (player.hasTag('water')) {
		bendingstyle = "Water";
	} else if (player.hasTag('fire')) {
		bendingstyle = "Fire";
	} else if (player.hasTag('avatar')) {
		bendingstyle = "Avatar";
	} else {
		bendingstyle = "Human";
	}
	return bendingstyle;
}

export function getSubBendingStyle(player) {
	let subBendingstyle;
	if (player.hasTag('sub_spirit')) {
		subBendingstyle = "spirit";
	} else if (player.hasTag('sub_projectile')) {
		subBendingstyle = "projectile";
	} else if (player.hasTag('sub_metal')) {
		subBendingstyle = "metal";
	} else if (player.hasTag('sub_lava')) {
		subBendingstyle = 'lava';
	} else if (player.hasTag('sub_combustion')) {
		subBendingstyle = "combustion";
	} else if (player.hasTag('sub_lightning')) {
		subBendingstyle = "lightning";
	} else if (player.hasTag('sub_blood')) {
		subBendingstyle = "blood";
	} else if (player.hasTag('sub_healing')) {
		subBendingstyle = "healing";
	} else {
		subBendingstyle = "none";
	}
	return subBendingstyle;
}

export function showWarning(source, title, message) {
	let warningMenu = new ActionFormData();
    warningMenu.title(title);
    warningMenu.body(message);
	warningMenu.button("Got it.",);
	warningMenu.show(source);
}

// This might be used soon for earth moves!
export function traceLine(x, y, z, x1, y1, z1, points) {
	class Point {
		constructor(x, y, z) {
			this.x = x;
			this.y = y;
			this.z = z;
		}
	}
	
	let pStart = new Point(x, y, z);
	let pEnd = new Point(x1, y1, z1);

	for (let i = 1; i <= points; i++) {
		world.getDimension("overworld").runCommandAsync(`particle a:life_force_tie ${((pStart.x - pEnd.x) / points) * i + pEnd.x} ${((pStart.y - pEnd.y) / points) * i + pEnd.y} ${((pStart.z - pEnd.z) / points) * i + pEnd.z}`)
	}
}

// happy short list
export const betaTesters = [
	"GlitchyTurtle32",
	"IBklolpop1",
	"IBk101",
	"Jal191209",
	"Bushy963",
	"yusufgamer0920"
];


// sad empty list... please support me on patreon
export const patreon = [
	// pls... I do cool commisson stuff there
];

export const groundBlocks = [
	"minecraft:dirt",
	"minecraft:grass",
	"minecraft:mycelium",
	"minecraft:grass_path",
	"minecraft:gravel",
	"minecraft:sandstone",
	"minecraft:stone",
	"minecraft:sand",
	"minecraft:obsidian",
	"minecraft:blackstone",
	"minecraft:mud",
	"minecraft:packed_mud",
	"minecraft:end_stone",
	"minecraft:netherrack",
	"minecraft:deepslate",
	"minecraft:cobbled_deepslate",
	"minecraft:farmland",
	"minecraft:clay",
	"minecraft:diamond_ore",
	"minecraft:iron_ore",
	"minecraft:gold_ore",
	"minecraft:deepslate_diamond_ore",
	"minecraft:deepslate_iron_ore",
	"minecraft:deepslate_gold_ore",
	"minecraft:crimson_nylium",
	"minecraft:warped_nylium",
	"minecraft:crying_obsidian",
	"minecraft:bedrock"
];

export const illegalitems = [
	"a:bending_scroll",
	"a:slot_1",
	"a:slot_2",
	"a:slot_3",
	"a:slot_4",
	"a:copper_piece",
    "minecraft:light_block",
    "minecraft:lit_smoker",
    "minecraft:daylight_detector_inverted",
    "minecraft:powered_comparator",
    "minecraft:lit_blast_furnace",
    "minecraft:lit_furnace",
    "minecraft:camera",
    "minecraft:end_gateway",
    "minecraft:fire",
    "minecraft:soul_fire",
    "minecraft:frosted_ice",
    "minecraft:flowing_lava",
    "minecraft:unknown",
    "minecraft:flowing_water",
    "minecraft:barrier",
    "minecraft:command_block",
    "minecraft:chemistry_table",
    "minecraft:debug_stick",
    "minecraft:command_block_minecart",
    "minecraft:repeating_command_block",
    "minecraft:spawn_egg",
    "minecraft:spawner",
    "minecraft:structure_block",
    "minecraft:structure_void",
    "minecraft:info_update",
    "minecraft:info_update2",
    "minecraft:reserved3",
    "minecraft:reserved4",
    "minecraft:reserved6",
    "minecraft:movingblock",
    "minecraft:moving_block",
    "minecraft:movingBlock",
    "minecraft:invisiblebedrock",
    "minecraft:invisible_bedrock",
    "minecraft:bedrock",
    "minecraft:glowingobsidian",
    "minecraft:compoundcreator",
    "minecraft:underwater_torch",
    "minecraft:chemical_heat",
    "minecraft:end_portal",
    "minecraft:end_portal_frame",
    "minecraft:colored_torch",
    "minecraft:hard_stained_glass_pane",
    "minecraft:hard_glass_pane",
    "minecraft:allow",
    "minecraft:chain_command_block",
    "minecraft:client_request_placeholder_block",
    "minecraft:deny",
    "minecraft:npc_spawn",
    "minecraft:stickyPistonArmCollision",
    "minecraft:sticky_piston_arm_collision",
    "minecraft:piston_arm_collision",
    "minecraft:netherreactor",
    "minecraft:mob_spawner",
    "minecraft:border_block",
    "minecraft:bubble_column",
    "minecraft:jigsaw",
    "minecraft:portal",
    "minecraft:chicken_spawn_egg",
    "minecraft:bee_spawn_egg",
    "minecraft:cow_spawn_egg",
    "minecraft:pig_spawn_egg",
    "minecraft:sheep_spawn_egg",
    "minecraft:wolf_spawn_egg",
    "minecraft:polar_bear_spawn_egg",
    "minecraft:ocelot_spawn_egg",
    "minecraft:cat_spawn_egg",
    "minecraft:mooshroom_spawn_egg",
    "minecraft:bat_spawn_egg",
    "minecraft:parrot_spawn_egg",
    "minecraft:rabbit_spawn_egg",
    "minecraft:llama_spawn_egg",
    "minecraft:horse_spawn_egg",
    "minecraft:donkey_spawn_egg",
    "minecraft:chicken_spawn_egg",
    "minecraft:mule_spawn_egg",
    "minecraft:skeleton_horse_spawn_egg",
    "minecraft:zombie_horse_spawn_egg",
    "minecraft:tropical_fish_spawn_egg",
    "minecraft:cod_spawn_egg",
    "minecraft:pufferfish_spawn_egg",
    "minecraft:salmon_spawn_egg",
    "minecraft:dolphin_spawn_egg",
    "minecraft:sea_turtle_spawn_egg",
    "minecraft:panda_spawn_egg",
    "minecraft:fox_spawn_egg",
    "minecraft:creeper_spawn_egg",
    "minecraft:enderman_spawn_egg",
    "minecraft:silverfish_spawn_egg",
    "minecraft:skeleton_spawn_egg",
    "minecraft:wither_spawn_egg",
    "minecraft:stray_spawn_egg",
    "minecraft:slime_spawn_egg",
    "minecraft:spider_spawn_egg",
    "minecraft:zombie_spawn_egg",
    "minecraft:zombified_piglin_spawn_egg",
    "minecraft:husk_spawn_egg",
    "minecraft:drowned_spawn_egg",
    "minecraft:squid_spawn_egg",
    "minecraft:glow_squid_spawn_egg",
    "minecraft:cave_spider_spawn_egg",
    "minecraft:witch_spawn_egg",
    "minecraft:guardian_spawn_egg",
    "minecraft:elder_guardian_spawn_egg",
    "minecraft:endermite_spawn_egg",
    "minecraft:magma_cube_spawn_egg",
    "minecraft:strider_spawn_egg",
    "minecraft:hoglin_spawn_egg",
    "minecraft:piglin_spawn_egg",
    "minecraft:zoglin_spawn_egg",
    "minecraft:piglin_brute_spawn_egg",
    "minecraft:goat_spawn_egg",
    "minecraft:axolotl_spawn_egg",
    "minecraft:ghast_spawn_egg",
    "minecraft:blaze_spawn_egg",
    "minecraft:shulker_spawn_egg",
    "minecraft:vindicator_spawn_egg",
    "minecraft:evoker_spawn_egg",
    "minecraft:vex_spawn_egg",
    "minecraft:villager_spawn_egg",
    "minecraft:wandering_trader_spawn_egg",
    "minecraft:zombie_villager_spawn_egg",
    "minecraft:phantom_spawn_egg",
    "minecraft:pillager_spawn_egg",
    "minecraft:ravager_spawn_egg",
    "minecraft:allay_spawn_egg",
    "minecraft:tadpole_spawn_egg",
    "minecraft:frog_spawn_egg",
    "minecraft:warden_spawn_egg",
    "minecraft:pumpkin_stem",
    "minecraft:melon_stem",
    "minecraft:lava",
    "minecraft:water",
    "minecraft:lit_redstonelamp",
    "minecraft:powered repeater",
    "minecraft:lit_redstone_ore",
    "minecraft:lit_deepslate_redstone_ore",
    "minecraft:standing_sign",
    "minecraft:wall_sign",
    "minecraft:pistonarmcollision",
    "minecraft:stickypistonarmcollision",
    "minecraft:chalkboard",
    "minecraft:lava_cauldron",
    "minecraft:border",
    "minecraft:glow_stick",
    "minecraft:reeds",
    "minecraft:double_stone_slab",
    "minecraft:double_wooden_slab",
    "minecraft:monster_egg",
    "minecraft:stone_monster_egg",
    "minecraft:farmland"
];

export const creditsMessage = 
`§8-------------------------§r
§bCreated and maintained by:§r
Glitch#8024
§8-------------------------§r
§bSUPER Special Mentions:§r
yusufgamer0920#1229
shawmanSunandMoon#2403
Jal902191#4775
IBk#3377
§8-------------------------§r
§bSMP OGs:§r
Mickeyfacey#1703
shawmanSunandMoon#2403
Rio2709#9695
Bushy#4533
IBk#3377
§8-------------------------§r
§bBeta Testers:§r
CH40S_L4W#9213
Rio2709#9695
CroQuet#2643
fryingf1sh#0088
IBk#3377
Jal902191#4775
Jotaro Kujo#1515
kitaro_X9#4490
Lordblue54#2282
mayne764#8903
MisledScarf45#3708
ninjajader67#9298
nuel.#1872
yusufgamer0920#1229
§8-------------------------§r
§bServer Starters:§r
Bushy#4533
Rio2709#9612
galaxygamer5799#7980
IBk#3377
huntinhic#2445
yusufgamer0920#1229
Its-me-alex#1819
Jal902191#4775
Lordblue54#2282
Matt4hias#5829
Zarcheus#7844
DinoNuggiesV2#4149
§8-------------------------§r
§bSuggestions:§r
Mankey#5992
awesomematt10#9716
Zspiralzac#5862
IcyGod999#8299
Ashstreem#3767
Lordblue54#2282
GreekSalad#6316
Cocogum#0042
§8-------------------------§r`