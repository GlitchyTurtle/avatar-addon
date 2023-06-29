import { Player, ItemStack, MolangVariableMap } from "@minecraft/server";
import { setScore } from "../util.js";

const map = new MolangVariableMap();

export function itemCompleteCharge(eventData) {
    const { itemStack, source } = eventData;
	
	// Checks if the user of the item is a player, which apparently needs to be done lol
    if (!(source instanceof Player)) return;

    const emptyCup = new ItemStack("a:empty_cup");
    if (itemStack.typeId.includes("tea")) source.getComponent('inventory').container.setItem(source.selectedSlot, emptyCup);
    switch (itemStack.typeId) {
        case "minecraft:potion":
            setScore(source, "water_loaded", 8);
            break;
        case "a:water_cup":
            source.getComponent('inventory').container.setItem(source.selectedSlot, emptyCup);
            break;
        case "a:jasmine_tea":
            source.addEffect("regeneration", 200, { amplifier: 1, showParticles: false });
            break;
        case "a:spirit_tea":
        case "a:nomad_tea":
            source.addEffect("slow_falling", 500, { amplifier: 1, showParticles: false });
            source.addEffect("jump_boost", 300, { amplifier: 3, showParticles: false });
            source.addEffect("speed", 300, { amplifier: 1, showParticles: false });
            break;
        case "a:ginger_tea":
        case "a:ginseng_tea":
        case "a:oolong_tea":
            source.addEffect("absorption", 5000, { amplifier: 1, showParticles: false });
            break;
        case "a:chi_tea":
            setScore(source, "cooldown", 100);
            source.removeTag('chi_blocked')
            source.removeEffect("slowness");
            source.removeEffect("weakness");
            break;
        case "a:red_blooded_nephew_tea":
            if (Math.random() > 0.5) {
                source.addEffect("strength", 220, { amplifier: 2, showParticles: false });
            } else {
                source.addEffect("weakness", 320, { amplifier: 5, showParticles: false });
            }
            break;
        case "a:white_jade_tea":
            source.addEffect("fatal_poison", 640, { amplifier: 1, showParticles: false });
            break;
        case "a:white_dragon_tea":
            setScore(source, "cooldown", 100);
            source.removeEffect("fatal_poison");
            source.addEffect("regeneration", 200, { amplifier: 1, showParticles: false });
            source.addEffect("absorption", 5000, { amplifier: 1, showParticles: false });
            break;
    }
}