import { MolangVariableMap } from "@minecraft/server";
import { getScore } from "./../util.js";

const map = new MolangVariableMap();

export function airRuntime(player) {
	if (getScore("mobTier", player) >= 2) {
		player.addEffect("jump_boost", 400, { amplifier: 1, showParticles: false });
		player.addEffect("speed", 400, { amplifier: 1, showParticles: false });
	}
	if (player.hasTag("kb_up")) {
		player.dimension.spawnParticle("a:double_jump", player.location, map);
		player.applyKnockback(0, 0, 0, 0.8);
		player.removeTag("kb_up");
	}
	if (player.hasTag('sub_projectile')) {
		player.runCommandAsync("tag @e[r=10,type=arrow] add seeking");
		player.runCommandAsync(`execute as @e[r=${getScore("level", player)*4},type=arrow,tag=seeking] at @s if block ~~-1~ air run particle a:air_blast ~~~`);
		player.runCommandAsync(`execute as @e[r=${getScore("level", player)*4},type=arrow,tag=seeking] at @s run execute as @e[r=2,type=!arrow,tag=!seeking,tag=!sub_projectile] run damage @s[type=!item,name=!"${player.name}"] 2 projectile`);
		player.runCommandAsync(`execute as @e[r=${getScore("level", player)*4},type=arrow,tag=seeking] at @s run execute as @e[r=2,type=!arrow,tag=!seeking,tag=!sub_projectile] run kill @e[r=4,type=arrow]`);
		player.runCommandAsync(`execute as @e[r=${getScore("level", player)*4},c=5,type=arrow,tag=seeking] at @s run tp @s ^^^2 facing @e[tag=!sub_projectile,type=!arrow,type=!armor_stand,type=!item,c=1,type=!xp_orb]`);
	}
}