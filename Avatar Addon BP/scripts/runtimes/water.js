import { world, MolangVariableMap } from "@minecraft/server";
import { getScore, setScore } from "./../util.js";

const WATER_RING = {}
const map = new MolangVariableMap();

function getPointOnCircle(centerX, centerY, centerZ, radius, angle, time) {
	var x = centerX + radius * Math.cos(angle);
	var z = centerZ + radius * Math.sin(angle);
	var y = centerY + (0.5 * Math.sin(time * 50));

	return {x: x, y: y, z: z};
}

function lerp(start, end, t) {
	if (end - start > 180) {
	  end -= 360;
	} else if (start - end > 180) {
	  end += 360;
	}
	return start * (1 - t) + end * t;
}

function moveWaterBehind(player, speed) {
	const viewVector = player.getViewDirection();
	const angleRadians = Math.atan2(viewVector.z, viewVector.x);
	var angleDegrees = angleRadians * (180/Math.PI);
	if (angleDegrees < 0) {
		angleDegrees += 360;
	}
	angleDegrees += -180;
	return lerp(WATER_RING[player.id].angle, angleDegrees, speed);
}

world.afterEvents.playerLeave.subscribe(eventData => playerLeave(eventData));

function playerLeave(eventData) {
	if (WATER_RING[eventData.playerId]) delete WATER_RING[eventData.playerId];
}

export function waterRuntime(player) {
	// For waterbenders nether weakness
	if (player.dimension.id === "minecraft:nether") return player.addEffect("weakness", 200, { amplifier: 3, showParticles: false });
	
	const FULL_MOON = ((world.getAbsoluteTime() - world.getTime()) / 24000) % 8 == 0;
	const NIGHT_TIME = world.getTime() > 12000;

	if (getScore("detect_water", player) === 1) {
		setScore(player, "water_loaded", 8);
		if (getScore("offTier", player) > 0) player.addEffect("conduit_power", 5, { amplifier: 0, showParticles: false });
	}
	if (FULL_MOON && NIGHT_TIME && getScore("utiTier", player) > 9) {
		player.addEffect("strength", 200, { amplifier: 3, showParticles: false });
		player.addEffect("speed", 200, { amplifier: 2, showParticles: false });
		player.addEffect("conduit_power", 5, { amplifier: 0, showParticles: false });
	}

	if (getScore("utiTier", player) > 1) player.addEffect("saturation", 200, { amplifier: 4, showParticles: false });
	if (getScore("defTier", player) > 4) {
		const entities = [...player.dimension.getEntities({ location: player.location, maxDistance: 3, families: ["boat"] })];
		if (entities[0]) {
			player.addEffect("resistance", 200, { amplifier: 1, showParticles: false });
			player.addEffect("conduit_power", 5, { amplifier: 0, showParticles: false });
		}
	}

	if (player.hasTag("hiddenWater") || player.hasTag("permHiddenWater")) {
		if (WATER_RING[player.id]) delete WATER_RING[player.id];
		return;
	}

	if (!WATER_RING[player.id]) {
		WATER_RING[player.id] = {
			angle: 0,
			tick: 0,
			radius: 0
		}
	}

	const WATER_LOADED = getScore("water_loaded", player);
	if (WATER_LOADED < 1 || (getScore("detect_sneak", player) == 1 && WATER_RING[player.id].radius < 0.25) || (player.hasTag("hiddenWater") && WATER_RING[player.id].radius < 0.25) || (player.hasTag("permHiddenWater") && WATER_RING[player.id].radius < 0.25)) return delete WATER_RING[player.id];

	WATER_RING[player.id].tick++;
	if (WATER_RING[player.id].tick > 50) WATER_RING[player.id].tick = 0;
	if (WATER_RING[player.id].angle >= 360) WATER_RING[player.id].angle = 0;

	if (getScore("detect_sneak", player) == 1 || player.hasTag("hiddenWater") || (player.hasTag("permHiddenWater"))) {
		player.hasTag("hiddenWater") ? WATER_RING[player.id].angle = moveWaterBehind(player, 0.01) : WATER_RING[player.id].angle = moveWaterBehind(player, 0.2);
		if (WATER_RING[player.id].radius >= 0) player.hasTag("hiddenWater") ? WATER_RING[player.id].radius += -0.4 : WATER_RING[player.id].radius += -0.2;
	} else {
		WATER_LOADED > 3 ? WATER_RING[player.id].angle += 10 : WATER_RING[player.id].angle += 5;
		if (getScore("detect_sprint", player) == 1 && getScore("earth_sprint", player) < 100 && WATER_LOADED > 0 && getScore("mobTier", player) > 4) {
			setScore(player, "earth_sprint", 1, true);
			if (WATER_RING[player.id].radius < 2.5) WATER_RING[player.id].radius += 0.2;
		} else if (getScore("detect_sprint", player) == 1 && getScore("earth_sprint", player) == 100 && WATER_LOADED > 0) {
			WATER_RING[player.id].angle = moveWaterBehind(player, 0.2);
			if (WATER_RING[player.id].radius >= 0.4) WATER_RING[player.id].radius += -0.2;
			const viewVector = player.getViewDirection();
			player.applyKnockback(viewVector.x, viewVector.z, 1, 0);
			if (WATER_RING[player.id].tick % 50 == 0) {
				setScore(player, "water_loaded", -1, true);
			}		
		} else if (getScore("detect_sprint", player) === 0) {
			if (WATER_RING[player.id].radius < 2.5) WATER_RING[player.id].radius += 0.2;
			setScore(player, "earth_sprint", 0);
		} else {
			if (WATER_RING[player.id].radius < 2.5) WATER_RING[player.id].radius += 0.2;
		}
	}
	const circle = getPointOnCircle(player.location.x, player.location.y + 1, player.location.z, WATER_RING[player.id].radius, WATER_RING[player.id].angle * Math.PI / 180, WATER_RING[player.id].tick);
	player.dimension.spawnParticle(`a:water_preloaded_${Math.min(Math.ceil(WATER_LOADED/2), 8)}`, circle, map);
}