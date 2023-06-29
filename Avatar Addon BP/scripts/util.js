import { world, system, Player, GameMode, MinecraftItemTypes, MolangVariableMap } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui"
import commands from './moves/import.js';

/**
 * Gets a players score.
 * @param {string} objective Scoreboard objective.
 * @param {Player} target The player object.
 * @returns {number} The score for the player.
 */
export function getScore(objective, target) {
    try {
        const oB = world.scoreboard.getObjective(objective);
        return oB.getScore(target.scoreboardIdentity);
    } catch (error) {
        return undefined;
    }
};

/**
 * Set the score of a player or other entity
 * @param {Entity|string} target The entity or dummy player to change the score of.
 * @param {string} objective The objective to change the score on.
 * @param {number} amount The amount to change the score by.
 * @param {boolean} add If the score should stack on top of the previous value set.
 * @returns {number} The new score that was set, or NaN if no objective or initial entity score was found or set.
 */
export function setScore(target, objective, amount, add = false) {
    try {
        const scoreObj = world.scoreboard.getObjective(objective);
        const score = (add ? scoreObj.getScore(target.scoreboardIdentity) : 0) + amount;
        target.scoreboardIdentity.setScore(scoreObj, score);
        return score;
    } catch (error) { 
        return undefined; 
    };
};

/**
 * Delays a function a certain number of ticks.
 * @param {Player} player The player entity the function will run at.
 * @param {Function} func The function ran after the delay.
 * @param {number} tickDelay The number of ticks delayed for. Default 1.
 */
export function delayedFunc(player, func, tickDelay = 1) {
    const sched_ID = system.runInterval(()=>{
        system.clearRun(sched_ID);
        func(player);
    }, tickDelay);
};

/**
 * Plays a sound relative to an entity.
 * @param {Entity} entity
 * @param {string} sound The sound to play- like note.pling.
 * @param {number} pitch The pitch of the sound. 
 * @param {string} location Location to play the sound at.
 * @param {number} volume The volume of the sound.
 */
export function playSound(entity, sound, pitch = 1, location = { x: entity.location.x, y: entity.location.y, z: entity.location.z }, volume = 1) {
    entity.playSound(sound, {
        pitch: pitch,
        volume: volume,
        location: location
    });
};

/**
 * Normalizes the given vector and scales it by the factor `s`.
 * @param {Vector3} vector - The 3D vector to normalize.
 * @param {number} s - The scale factor to apply to the normalized vector.
 * @returns {Vector3} The normalized and scaled vector.
 */
export function normalizeVector (vector,s) {
    let l = Math.hypot(vector.x,vector.y,vector.z)
    return {
        x: s * (vector.x/l),
        y: s * (vector.y/l),
        z: s * (vector.z/l)
    }
}

/**
 * Finds a location based on their view direction and the scaling factors from the players current position, the same as ^^^ in commands.
 * @param {object} player - The player object to base the view direction and starting position on.
 * @param {number} xf - The scaling factor for the x direction.
 * @param {number} yf - The scaling factor for the y direction.
 * @param {number} zf - The scaling factor for the z direction.
 * @returns {{x: number, y: number, z: number}} The transformed location.
 */
export function calcVectorOffset (player, xf, yf, zf, d = player.getViewDirection(), l = player.location) {
    let m = Math.hypot(d.x, d.z);
    let xx = normalizeVector({
        x: d.z,
        y: 0,
        z: -d.x
    }, xf);
    let yy = normalizeVector({
        x: (d.x / m) * -d.y,
        y: m,
        z: (d.z / m) * -d.y
    }, yf);
    let zz = normalizeVector(d, zf);

    return {
        x: l.x + xx.x + yy.x + zz.x,
        y: l.y + xx.y + yy.y + zz.y,
        z: l.z + xx.z + yy.z + zz.z
    };
}

/**
 * Calculates the knockback vector based on an entity's position, a force source position, and the force magnitude.
 * @param {Vector3} entityPosition - The position of the entity as a Vector3.
 * @param {Vector3} forceSourcePosition - The position of the force source as a Vector3.
 * @param {Vector3} forceMagnitude - The magnitude of the force to be applied.
 * @returns {Vector3} The knockback vector as a Vector3.
 */
export function calculateKnockbackVector(entityPosition, pusherPosition, forceMagnitude) {
    let direction = {
        x: entityPosition.x - pusherPosition.x,
        y: entityPosition.y - pusherPosition.y,
        z: entityPosition.z - pusherPosition.z
    };
  
    let distance = magnitude(direction);
  
    // Normalize the direction vector so it has a magnitude of 1
    direction = {
        x: direction.x / distance,
        y: direction.y / distance,
        z: direction.z / distance
    };
  
    // Scale the direction vector by the force magnitude to get the final knockback vector
    let knockback = {
        x: direction.x * forceMagnitude,
        y: direction.y * forceMagnitude,
        z: direction.z * forceMagnitude
    };
  
    return knockback;
}

/**
 * Calculates the distance between an position and another position.
 * @param {Vector3} entityPosition - The position of the entity as a Vector3.
 * @param {Vector3} forceSourcePosition - The position of the force source as a Vector3.
 * @param {Vector3} forceMagnitude - The magnitude of the force to be applied.
 * @returns {Vector3} The knockback vector as a Vector3.
 */
export function calculateDistance(posA, posB) {
    let direction = {
        x: posA.x - posB.x,
        y: posA.y - posB.y,
        z: posA.z - posB.z
    };
    return magnitude(direction);
}

/**
 * Calculates the magnitude of a Vector3.
 * @param {Vector3} entityPosition - The Vector3 input.
 * @returns {number} The magnitude of the vector.
 */
export function magnitude(vector) {
    return Math.sqrt(vector.x * vector.x + vector.y * vector.y + vector.z * vector.z);
}

/**
 * Breaks up a number into two chunks. The slot activation and the slot number.
 * @param {number} n The number that will be broken up (the moveslot score).
 * @returns An array of the slot activation and the slot number, in that order.
 */
export function parseMoveslot(n) {
    if (n) return [parseInt(n.toString().charAt(0)) || 0, parseInt(n.toString().slice(1)) || 0];
    return [1, 0];
}

/**
 * Returns an object based on a number entered that indicates each setting for avatar addon
 * @param {number} n The number that will be broken up (the moveslot score).
 * @returns An object that contains 7 keys, 1 for each setting
 */
export function parseSettings(n) {
	let settings = n.toString();

	return {
		BENDING_OPT: Number(settings[0] - 1),
		AVATAR_OPT: Number(settings[1] - 1),
		LEVEL_SPD: Number(settings[2] - 1),
		CHAT_RANKS: Boolean(settings[3] - 1),
		SHOP_SYS: Boolean(settings[4] - 1),
		HOME_SYS: Boolean(settings[5] - 1),
        CHOICE_FINAL: Boolean(settings[6] - 1),
		COOLDOWNS: Boolean(settings[7] - 1)
	}
}

export function addButtonIf(menu, selectList, name, condition, texture) {
	if (condition) {
		menu.button(name, texture);
		selectList.push(toCamelCase(name));
	}
}

export function toCamelCase(str) {
    const regExp = /[^a-zA-Z0-9]+(.)/ig;
    return str.replace(regExp, (match) => {
        return match[1].toUpperCase();
    });
}

export function makeList(commandslist, player) {
    if (!commandslist) commandslist = Object.values(commands);
	let moveList = ["Leave Empty"]
	for (let i = 0; i < commandslist.length; i++) {
		if ((commandslist[i].style === getBendingStyle(player).toLowerCase() || player.hasTag("avatar")) && (commandslist[i].unlockable <= getScore("level", player) || (player.hasTag("avatar")) && commandslist[i].unlockable_for_avatar <= getScore("level", player)) && (!commandslist[i].sub_bending_required || commandslist[i].sub_bending_required == getSubBendingStyle(player))) {
			moveList.push(`${commandslist[i].name}`);
		}
	}
	return moveList;
}

export function toRomanNumeral(num) {
    if (num >= 10) return "MAX";
    if (num <= 0) return "NONE";
    var lookup = {M:1000, CM:900, D:500, CD:400, C:100, XC:90, L:50, XL:40, X:10, IX:9, V:5, IV:4, I:1}, roman = '', i;
    for ( i in lookup ) {
        while ( num >= lookup[i] ) {
            roman += i;
            num -= lookup[i];
        }
    }
    return roman;
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
		bendingstyle = "Non-bender";
	}
	return bendingstyle;
}

export function getSubBendingStyle(player) {
    const tags = player.getTags();
    for (const tag of tags) {
        if (tag.startsWith('sub_')) {
            return tag.slice(4);
        }
    }
    return 'none';
}

export function canBend(player) {
    const spawn = { x: -1456, y: 66, z: -138 };
    const disableBendingTags = new Set(["antimagic", "bending_off", "chi_blocked", "server_disabled", "admin_disabled"]);

    const entities = [...player.dimension.getEntities({ location: player.location, maxDistance: 100, families: ["protection_area"] })];
    if (entities[0]) return false;
    if (calculateDistance(player.location, spawn) < 60 && player.dimension.id == "minecraft:overworld") return false;

    return !player.getTags().some(val => disableBendingTags.has(val));
}

export function showWarning(source, title, message) {
	let warningMenu = new ActionFormData();
    warningMenu.title(title);
    warningMenu.body(message);
	warningMenu.button("Got it.");
	warningMenu.show(source);
}

export function levelUp(player) {
    const commandslist = Object.values(commands);
	const currentLocation = { x: player.location.x, y: player.location.y, z: player.location.z };
    setScore(player, "sub_level", 0);
    if (getScore("level", player) <= 99) setScore(player, "level", 1, true);
	playSound(player, 'random.levelup', 1, currentLocation, 1);
	if (getScore("level", player) > 14) player.runCommand(`give @s a:skill_point ${Math.floor(Math.random() * 4)}`);
    if (getScore("level", player) >= 100) return;

	// List all the moves for that level, because you can only level up once it looks like an interactive unlock
	let newMoves = "";
    const BENDING_STYLE = getBendingStyle(player);
	for (let i = 0; i < commandslist.length; i++) {
		let currentMove = commandslist[i];
		if (
			// Error check
			(currentMove.name.length > 0) &&

			// Check for current type
			(currentMove.style === BENDING_STYLE.toLowerCase() || player.hasTag("avatar")) &&

			// Basic unlocks
			((player.hasTag("avatar") && currentMove.unlockable_for_avatar == getScore("level", player)) || 
			(!player.hasTag("avatar") && currentMove.unlockable == getScore("level", player))) &&

			// Skill Tree moves
			(currentMove.off_tier_required === undefined || currentMove.off_tier_required <= getScore("offTier", player)) &&
			(currentMove.def_tier_required === undefined || currentMove.def_tier_required <= getScore("defTier", player)) &&
			(currentMove.uti_tier_required === undefined || currentMove.uti_tier_required <= getScore("utiTier", player)) &&
			(currentMove.mob_tier_required === undefined || currentMove.mob_tier_required <= getScore("mobTier", player)) &&

			// Sub bending unlocks
			(!currentMove.sub_bending_required || currentMove.sub_bending_required === getSubBendingStyle(player))) {
        
            newMoves = newMoves + `§b ${currentMove.name} \n`
        }
	}
	(newMoves) ? player.sendMessage("----------------\nLeveled up to: §b" + getScore("level", player) + "\n" + newMoves + "§r----------------") : player.sendMessage("----------------\nLeveled up to: §b" + getScore("level", player) + "\n§r----------------");
}

export function traceLine(startPoint, endPoint, numOfPoints, particle) {
    const map = new MolangVariableMap();
	class Point {
		constructor(x, y, z) {
			this.x = x;
			this.y = y;
			this.z = z;
		}
	}

	let pStart = new Point(startPoint.x, startPoint.y, startPoint.z);
	let pEnd = new Point(endPoint.x, endPoint.y, endPoint.z);

	for (let i = 1; i <= numOfPoints; i++) {
        const position = {x: ((pStart.x - pEnd.x) / numOfPoints) * i + pEnd.x, y: ((pStart.y - pEnd.y) / numOfPoints) * i + pEnd.y, z: ((pStart.z - pEnd.z) / numOfPoints) * i + pEnd.z};
		world.getDimension("overworld").spawnParticle(particle, position, map)
	}
}

export function calcBendingResistance(entity) {
    try {
        const armorSlots = ["head", "chest", "legs", "feet"]
        var bendingResistance = 0;
        for (const slotName of armorSlots) {
            const item = entity.getComponent('equipment_inventory').getEquipmentSlot(slotName).getItem();
            if (item) {
                const item_enchants = item.getComponent("enchantments").enchantments;
                if (!item_enchants) continue;
        
                if (item_enchants.hasEnchantment("projectile_protection")) {
                    armorLevel += item_enchants.getEnchantment("projectile_protection").level;
                }
            }
        }

        if (entity.hasTag("earth") && getScore("defTier", entity) >= 2) bendingResistance *= 1.2;

        return bendingResistance/2;
    } catch (error) {
        return 0;
    }
}

/**
 * Creates a shockwave that does damage to all entities near the location and applies knockback, both damage and knockback increase via distance to the origination point.
 * @param {Player} player The player object that the shockwave will originate from, and who is immune.
 * @param {object} spawnPos The position the shockwave will spawn from.
 * @param {number} strength The power of the shockwave, which is calculated as 1.5x the players offense skill multiplied by the damageFactor + kbIntensity, this determines kbIntensity via distance.
 * @param {number} range The range of the shockwave that entities can be affected by, as damage smooths at the outer rim.
 * @param {number | undefined} damageFactor The additional multiplier for the "move" that is using the shockwave, pass this.damage_factor
 */
export function createShockwave(player, spawnPos, strength, range, damageFactor = 1) {
    // Create the needed variables for kb and pos
    const dimension = player.dimension;
    const entities = [...dimension.getEntities({ location: spawnPos, maxDistance: range, excludeNames: [player.name], excludeFamilies: ["inanimate"], excludeTypes: ["item"], excludeTags: ["bending_dmg_off"] })];
    const items = [...dimension.getEntities({ location: spawnPos, maxDistance: range, type: "item" })];

    // Loop through all nearby entities (not items though)
    entities.forEach(entity => {
        // Calculate damage
        const map = new MolangVariableMap();
        const kbIntensity = strength / (1 + Math.exp(-5 * (Math.ceil(calculateDistance(entity.location, spawnPos)) - 0.5)));
        const kbVector = calculateKnockbackVector(entity.location, spawnPos, kbIntensity/2);

        // Apply damage and knockback
        const damageDealt = getScore('offTier', player) * 1.5 * damageFactor + Math.min(kbIntensity/2, 4);
        if (damageFactor) entity.applyDamage(Math.max(damageDealt - calcBendingResistance(entity), 1));
        
        if (entity.hasTag("permKbSafe") && (entity instanceof Player)) return entity.dimension.spawnParticle("a:air_leap", entity.location, map);
        try {
            entity.applyKnockback(kbVector.x, kbVector.z, kbIntensity/4, kbIntensity/20);
        } catch (error) {
            entity.applyImpulse(calculateKnockbackVector(entity.location, spawnPos, 2));
        }
    });
    items.forEach(item => { item.applyImpulse(calculateKnockbackVector(item.location, spawnPos, 3)); });
}

// These guys are very cool
export const betaTesters = [
	"IBklolpop1",
	"IBk101",
    "Pixalman2005",
	"Jal191209",
	"Bushy963",
	"yusufgamer0920",
    "Tfue Ruler",
    "TheMooseMan",
    "Inferno157118",
    "KitaroX9",
    "cyktlbs"
];


// YOOOOOO
export const patreon = [
	"Creature5870",
    "Bushy963",
    "Chakurow",
    "DracoRex1912",
    "Tfue Ruler",
    "Blockmaster4744",
    "hammerofreage",
    "hammerofrage",
    "PixelatedJon",
    "FrostySh4dow",
    "NatureCaller774",
    "Cageypeak2174"
];

export const groundBlocks = [
	"minecraft:dirt",
	"minecraft:grass",
    "minecraft:podzol",
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
    "minecraft:cobble",
    "minecraft:cobblestone",
	"minecraft:cobbled_deepslate",
    "minecraft:cobbled_deepslate_double_slab",
    "minecraft:mossy_cobblestone",
	"minecraft:farmland",
	"minecraft:clay",
    "minecraft:coal_ore",
    "minecraft:copper_ore",
    "minecraft:iron_ore",
    "minecraft:gold_ore",
    "minecraft:redstone_ore",
    "minecraft:diamond_ore",
    "minecraft:lapis_ore",
    "minecraft:emerald_ore",
    "minecraft:ancient_debris",
    "minecraft:nether_gold_ore",
    "minecraft:deepslate_coal_ore",
    "minecraft:deepslate_copper_ore",
    "minecraft:deepslate_iron_ore",
    "minecraft:deepslate_gold_ore",
    "minecraft:deepslate_redstone_ore",
    "minecraft:deepslate_diamond_ore",
    "minecraft:deepslate_lapis_ore",
    "minecraft:deepslate_emerald_ore",
	"minecraft:crimson_nylium",
	"minecraft:warped_nylium",
	"minecraft:crying_obsidian",
    "minecraft:hardened_clay",
    "minecraft:stained_hardened_clay",
    "minecraft:black_glazed_terracotta",
    "minecraft:blue_glazed_terracotta",
    "minecraft:brown_glazed_terracotta",
    "minecraft:cyan_glazed_terracotta",
    "minecraft:gray_glazed_terracotta",
    "minecraft:green_glazed_terracotta",
    "minecraft:light_blue_glazed_terracotta",
    "minecraft:lime_glazed_terracotta",
    "minecraft:magenta_glazed_terracotta",
    "minecraft:orange_glazed_terracotta",
    "minecraft:pink_glazed_terracotta",
    "minecraft:purple_glazed_terracotta",
    "minecraft:red_glazed_terracotta",
    "minecraft:silver_glazed_terracotta",
    "minecraft:white_glazed_terracotta",
    "minecraft:yellow_glazed_terracotta",
];

export const autoSmeltItems = {
    "minecraft:cod": MinecraftItemTypes.cookedCod,
    "minecraft:beef": MinecraftItemTypes.cookedBeef,
    "minecraft:chicken": MinecraftItemTypes.cookedChicken,
    "minecraft:porkchop": MinecraftItemTypes.cookedPorkchop,
    "minecraft:rabbit": MinecraftItemTypes.cookedRabbit,
    "minecraft:mutton": MinecraftItemTypes.cookedMutton,
    "minecraft:salmon": MinecraftItemTypes.cookedSalmon,
	"minecraft:raw_copper": MinecraftItemTypes.copperIngot,
	"minecraft:raw_iron": MinecraftItemTypes.ironIngot,
	"minecraft:raw_gold": MinecraftItemTypes.goldIngot,
	"minecraft:iron_ore": MinecraftItemTypes.rawIron,
    "minecraft:gold_ore": MinecraftItemTypes.rawGold,
    "minecraft:diamond_ore": MinecraftItemTypes.diamond,
    "minecraft:emerald_ore": MinecraftItemTypes.emerald,
	"minecraft:copper_ore": MinecraftItemTypes.rawCopper,
    "minecraft:quartz_ore": MinecraftItemTypes.quartz,
	"minecraft:nether_gold_ore": MinecraftItemTypes.goldNugget,
    "minecraft:coal_ore": MinecraftItemTypes.coal,
    "minecraft:lapis_ore": MinecraftItemTypes.lapisLazuli,
    "minecraft:redstone_ore": MinecraftItemTypes.redstone,
	"minecraft:deepslate_coal_ore": MinecraftItemTypes.coal,
    "minecraft:deepslate_iron_ore": MinecraftItemTypes.rawIron,
    "minecraft:deepslate_gold_ore": MinecraftItemTypes.rawGold,
    "minecraft:deepslate_diamond_ore": MinecraftItemTypes.diamond,
    "minecraft:deepslate_lapis_ore": MinecraftItemTypes.lapisLazuli,
    "minecraft:deepslate_redstone_ore": MinecraftItemTypes.redstone,
    "minecraft:deepslate_emerald_ore": MinecraftItemTypes.emerald,
	"minecraft:deepslate_copper_ore": MinecraftItemTypes.rawCopper,
    "minecraft:stick": MinecraftItemTypes.torch
}

export const illegalitems = [
    // Addon items
	"a:bending_scroll",
	"a:slot_1",
	"a:slot_2",
	"a:slot_3",
	"a:slot_4",
	"a:copper_piece",

    // All illegals
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
§bPatrons:§r
craigthecreature
zackeryruin
soma4811
chakuro
Stewie
Bushy
DracoRex1912
.avariss
rattenkönig
lfun 621
Syafiq Zamri
Jhonny Gray
Epic Gaming Warrior
Malachi
Kalvin Cronin-Green
Frosty
_Ash_#0643
effiaf#0
§8-------------------------§r
§bSUPER Special Mentions:§r
yusufgamer0920#1229
Bushy#4533
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
Jal902191#4775
§8-------------------------§r
§bBeta Testers:§r
CH40S_L4W#9213
Rio2709#9695
CroQuet#2643
fryingf1sh#0088
IBk#3377
Jal902191#4775
Jotaro Kujo#1515
Lordblue54#2282
mayne764#8903
MisledScarf45#3708
ninjajader67#9298
nuel.#1872
yusufgamer0920#1229
zackeryruin
cyktlbs
KitaroX9
Inferno157118
Pixalman2005
TheMooseMan
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
Bushy#4533
IBk#3377
shawmanSunandMoon#2403
Mankey#5992
awesomematt10#9716
Zspiralzac#5862
IcyGod999#8299
Ashstreem#3767
Lordblue54#2282
GreekSalad#6316
Cocogum#0042
§8-------------------------§r`;