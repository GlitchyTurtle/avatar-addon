export function mobileMenu(source) {
	if (!source.hasTag("avatar") && !source.hasTag("air") && !source.hasTag("fire") && !source.hasTag("water") && !source.hasTag("earth")) return source.runCommandAsync( `tellraw @s {"rawtext":[{"text":"§cYou can't bend, what do you need mobile mode for?§r"}]}`);
	if (!source.hasTag('mobileMode')) {
		source.runCommandAsync( `tellraw @s {"rawtext":[{"text":"§aYou enabled mobile mode! Run this command again to disable.§r"}]}`);
		source.runCommandAsync( `tag @s add mobileMode`);
		for (let i = 1; i <= 4; i++) {
			source.runCommandAsync( `give @s a:slot_${i} 1 0 {"minecraft:keep_on_death":{},"minecraft:item_lock":{"mode":"lock_in_inventory"}}`)
		}
	} else {
		source.runCommandAsync( `tag @s remove mobileMode`);
		source.runCommandAsync( `tellraw @s {"rawtext":[{"text":"§cYou disabled mobile mode!§r"}]}`);
		for (let i = 1; i <= 4; i++) {
			try { source.runCommandAsync( `clear @s a:slot_${i}`) } catch (error) {}
		}
	}
}