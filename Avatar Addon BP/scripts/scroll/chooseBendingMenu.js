import { ActionFormData } from "@minecraft/server-ui"
import { getScore } from "./../util.js";

export function chooseBendingMenu(source) {
	// Quick checks
	if (source.hasTag('bending_off')) {
		return source.runCommandAsync( `tellraw @s {"rawtext":[{"text":"§cYou need to enable bending to choose!§r"}]}`);
	}

	// Choose bending menu, which I called choose style
	let chooseStyle = new ActionFormData();
	chooseStyle.title("Bending Style Menu");
	chooseStyle.body("Choose your bending style here! Your level will be reset upon choosing though.");
	chooseStyle.button("Air", "textures/ui/air");
	chooseStyle.button("Water", "textures/ui/water");
	chooseStyle.button("Fire", "textures/ui/fire");
	chooseStyle.button("Earth", "textures/ui/earth");
	if (!getScore("avatarSet", source)) {
		chooseStyle.button("Avatar", "textures/ui/avatar");
	}
	chooseStyle.button("Human", "textures/ui/brewing_fuel_empty");

	// Show the menu and respond	
	chooseStyle.show(source).then((ActionFormResponse) => {
		if (source.hasTag('bending_off')) { return source.runCommandAsync( `tellraw @s {"rawtext":[{"text":"§cYou need to enable bending to choose!§r"}]}`); }
		const { selection } = ActionFormResponse;
		if (selection === undefined) { return }
		source.runCommandAsync( "scoreboard players set @s moveslot1 0");
		source.runCommandAsync( "scoreboard players set @s moveslot2 0");
		source.runCommandAsync( "scoreboard players set @s moveslot3 0");
		source.runCommandAsync( "scoreboard players set @s moveslot4 0");
		try { source.runCommandAsync( "tag @s remove air"); } catch (error) {}
		try { source.runCommandAsync( "tag @s remove earth"); } catch (error) {}
		try { source.runCommandAsync( "tag @s remove fire"); } catch (error) {}
		try { source.runCommandAsync( "tag @s remove water"); } catch (error) {}
		try { source.runCommandAsync( "tag @s remove avatar"); } catch (error) {}
		try { source.runCommandAsync( "tag @s remove sub_projectile"); } catch (error) {}
		try { source.runCommandAsync( "tag @s remove sub_spirit"); } catch (error) {}
		try { source.runCommandAsync( "tag @s remove sub_metal"); } catch (error) {}
		try { source.runCommandAsync( "tag @s remove sub_lava"); } catch (error) {}
		try { source.runCommandAsync( "tag @s remove sub_combustion"); } catch (error) {}
		try { source.runCommandAsync( "tag @s remove sub_lightning"); } catch (error) {}
		try { source.runCommandAsync( "tag @s remove sub_blood"); } catch (error) {}
		try { source.runCommandAsync( "tag @s remove sub_healing"); } catch (error) {}
		try { source.runCommandAsync( "tag @s remove mobile"); } catch (error) {}
		try { source.runCommandAsync( "tag @s remove avatar_state"); } catch (error) {}
		source.runCommandAsync( "scoreboard players set @s level 0");
		source.runCommandAsync( "scoreboard players set @s sub_level 0");
		let tags = source.getTags();
		for (let i = 0; i < tags.length; i++) {
			if (tags[i].startsWith("Moveset:")) {
				source.removeTag(tags[i]);
			}
		}
		switch(selection) {
			case 0:
				source.runCommandAsync( "event entity @s become_air");
				source.runCommandAsync( "tag @s add air");
				source.runCommandAsync( "particle a:choose_air");
				source.runCommandAsync( "title @s title a:air");
				break;
			case 1:
				source.runCommandAsync( "event entity @s become_water");
				source.runCommandAsync( "tag @s add water");
				source.runCommandAsync( "particle a:choose_water");
				source.runCommandAsync( "title @s title a:water");
				break;
			case 2:
				source.runCommandAsync( "event entity @s become_fire");
				source.runCommandAsync( "tag @s add fire");
				source.runCommandAsync( "particle a:choose_fire");
				source.runCommandAsync( "title @s title a:fire");
				break;
			case 3:
				source.runCommandAsync( "event entity @s become_earth");
				source.runCommandAsync( "tag @s add earth");
				source.runCommandAsync( "particle a:choose_earth");
				source.runCommandAsync( "title @s title a:earth");
				break;
			case 4:
				if (getScore("avatarSet", source)) {
					source.runCommandAsync( "scoreboard players set @s level 10")
					source.runCommandAsync( "event entity @s become_human");
					source.runCommandAsync( "title @s title a:reset");
					source.runCommandAsync( "tag @s remove mobileMode");
					for (let i = 1; i <= 4; i++) {
						try { source.runCommandAsync( `clear @s a:slot_${i}`) } catch (error) {}
					}
				} else {
					source.runCommandAsync( "event entity @s become_avatar");
					source.runCommandAsync( "tag @s add avatar");
					source.runCommandAsync( "particle a:choose_earth");
					source.runCommandAsync( "particle a:choose_fire");
					source.runCommandAsync( "particle a:choose_water");
					source.runCommandAsync( "particle a:choose_air");
					source.runCommandAsync( "title @s title a:avatar");
				}
				break;
			case 5:
				source.runCommandAsync( "scoreboard players set @s level 10")
				source.runCommandAsync( "event entity @s become_human");
				source.runCommandAsync( "title @s title a:reset");
				source.runCommandAsync( "tag @s remove mobileMode");
				for (let i = 1; i <= 4; i++) {
					try { source.runCommandAsync( `clear @s a:slot_${i}`) } catch (error) {}
				}
				break;
		}
	})
}