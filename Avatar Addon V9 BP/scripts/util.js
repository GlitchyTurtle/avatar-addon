import { world, Player } from "mojang-minecraft";

const World = world;

export function getScore(objective, player, { minimum, maximum } = {}) {
    try {
        const data = player.runCommand(`scoreboard players test "${player.nameTag}" ${objective} ${minimum ? minimum : "*"} ${maximum ? maximum : "*"}`);
        return parseInt(data.statusMessage.match(/-?\d+/));
    } catch (error) {
        return;
    }
}

export function toCamelCase(str) {
    const regExp = /[^a-zA-Z0-9]+(.)/ig;
    return str.replace(regExp, (match) => {
        return match[1].toUpperCase();
    });
}

export let betaTesters = [
	"GlitchyTurtle32",
	"IBklolpop1",
	"Jal191209",
	"Bushy963"
];


export let groundBlocks = [
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

export function getBendingStyle(player) {
	let bendingstyle; let movelist;
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
		subBendingstyle = "ligntning";
	} else if (player.hasTag('sub_blood')) {
		subBendingstyle = "blood";
	} else if (player.hasTag('sub_healing')) {
		subBendingstyle = "healing";
	} else {
		subBendingstyle = "none";
	}
	return subBendingstyle;
}

export const illegalitems = [
	"a:bending_scroll",
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
