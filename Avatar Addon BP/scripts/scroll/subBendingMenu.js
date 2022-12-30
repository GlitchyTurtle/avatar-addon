import { ActionFormData } from "@minecraft/server-ui";

export function subBending(source) {
	let subBending = new ActionFormData();	
	subBending.title("Choose your sub-bending!");	
	if (source.hasTag("air")) {
		subBending.body("Pick one of the two options to start training! \n\nSpirit - lets you become a spirit (unlockable new move at level 25), which can fly through blocks and scout areas out. \n\nProjectile -  bends the air around your arrows so they never miss again (range increases with level).");
		subBending.button("Spirit", "textures/ui/avatar");
		subBending.button("Projectile", "textures/ui/avatar");
	} else if (source.hasTag("fire")) {
		subBending.body("Pick one of the two options to start training! \n\nLightning - get two new moves centered at lightning. \n\nCombustion - get one super far range blast move that explodes on impact.");
		subBending.button("Lightning", "textures/ui/avatar");
		subBending.button("Combustion", "textures/ui/avatar");
	} else if (source.hasTag("water")) {
		subBending.body("Pick one of the two options to start training! \n\nBlood - lets you freeze players in place on full moons with a new move. \n\nHealing -  heal yourself and other players with a few new moves.");
		subBending.button("Blood", "textures/ui/avatar");
		subBending.button("Healing", "textures/ui/avatar");
	} else if (source.hasTag("earth")) {
		subBending.body("Pick one of the two options to start training! \n\nMetal - get extra iron when mining and a strength effect after mining iron, as well as two new moves! (plus the ability to smelt raw iron instantly by right clicking). \n\nLava - Get two new moves!");
		subBending.button("Metal", "textures/ui/avatar");
		subBending.button("Lava", "textures/ui/avatar");
	} else if (source.hasTag("avatar")) {
		subBending.body("Pick one of the one option to start training! \n\nSpirit - lets you become a spirit (unlockable new move at level 50), which can fly through blocks and scout areas out. \n\nProjectile -  bends the air around your arrows so they never miss again (range increases with level). \n\nLightning - get two new moves centered at lightning. \n\nCombustion - get one super far range blast move that explodes on impact. \n\nBlood - unlocks a few new moves... \n\nHealing -  heal yourself and other players with a few new moves. \n\nMetal - get extra iron when mining and a strength effect after mining iron, as well as two new moves! \n\nLava - Get two new moves!");
		subBending.button("Spirit", "textures/ui/avatar");
		subBending.button("Projectile", "textures/ui/avatar");
		subBending.button("Lightning", "textures/ui/avatar");
		subBending.button("Combustion", "textures/ui/avatar");
		subBending.button("Blood", "textures/ui/avatar");
		subBending.button("Healing", "textures/ui/avatar");
		subBending.button("Metal", "textures/ui/avatar");
		subBending.button("Lava", "textures/ui/avatar");
	}
	subBending.show(source).then((ActionFormResponse) => {
		const { selection } = ActionFormResponse;
		if (selection !== undefined ) {
			if (source.hasTag("air")) { selection ? source.runCommandAsync( `tag @s add sub_projectile`) : source.runCommandAsync( `tag @s add sub_spirit`); }
			if (source.hasTag("fire")) { selection ? source.runCommandAsync( `tag @s add sub_combustion`) : source.runCommandAsync( `tag @s add sub_lightning`); }
			if (source.hasTag("water")) { selection ? source.runCommandAsync( `tag @s add sub_healing`) : source.runCommandAsync( `tag @s add sub_blood`); }
			if (source.hasTag("earth")) { selection ? source.runCommandAsync( `tag @s add sub_lava`) : source.runCommandAsync( `tag @s add sub_metal`); }
			if (source.hasTag("avatar")) {
				switch(selection) {
					case 0:
						source.runCommandAsync( `tag @s add sub_spirit`);
						break;
					case 1:
						source.runCommandAsync( `tag @s add sub_projectile`);
						break;
					case 2:
						source.runCommandAsync( `tag @s add sub_lightning`);
						break;
					case 3:
						source.runCommandAsync( `tag @s add sub_combustion`);
						break;
					case 4:
						source.runCommandAsync( `tag @s add sub_blood`);
						break;
					case 5:
						source.runCommandAsync( `tag @s add sub_healing`);
						break;
					case 6:
						source.runCommandAsync( `tag @s add sub_metal`);
						break;
					case 7:
						source.runCommandAsync( `tag @s add sub_lava`);
						break;
				}
			}
		}
	})
}