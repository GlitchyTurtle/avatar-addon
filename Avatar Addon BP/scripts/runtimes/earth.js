import { MolangVariableMap } from "@minecraft/server";
import { getScore, setScore, groundBlocks } from "./../util.js";

const map = new MolangVariableMap();

export function earthRuntime(player) {
	let {x, y, z} = player.location;
	let verifyDirt = player.dimension.getBlock({x: x, y: y - 1, z: z});
	groundBlocks.includes(verifyDirt.type.id) ? setScore(player, "ground", 1) : setScore(player, "ground", 0);

	if (getScore("mobTier", player) >= 2) player.addEffect("haste", 400, { amplifier: 2, showParticles: false });
	if (getScore("mobTier", player) >= 10) player.addEffect("jump_boost", 400, { amplifier: 1, showParticles: false });
	if (getScore("detect_sprint", player) === 1 && getScore("ground", player) === 1 && getScore("earth_sprint", player) < 100 && getScore("mobTier", player) > 4) {
		setScore(player, "earth_sprint", 1, true);
	} else if (getScore("detect_sprint", player) === 1 && getScore("ground", player) === 1 && getScore("earth_sprint", player) === 100) {
		player.addEffect("speed", 100, { amplifier: 3, showParticles: false });
		if (getScore("ground", player) === 1) {
			player.runCommandAsync("camerashake add @s 0.1 0.1 positional");
			player.dimension.spawnParticle("a:earth_sprint", { x: player.location.x, y: player.location.y + 0.5, z: player.location.z }, map);
		}
	} else if (getScore("detect_sprint", player) === 0) {
		setScore(player, "earth_sprint", 0);
	}
}
