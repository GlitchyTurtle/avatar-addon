import { ModalFormData } from "@minecraft/server-ui";

export function settingsMenu(source) {
	// Basic settings menu
	let settingMenu = new ModalFormData();
	settingMenu.title("Settings");
	if (source.hasTag("chatmsgoff")) { settingMenu.toggle("Show Move Messages", false); } else { settingMenu.toggle("Show Move Messages", true); }
	if (source.hasTag("bending_off")) { settingMenu.toggle("Enable Bending", false); } else { settingMenu.toggle("Enable Bending", true); }
	if (source.hasTag("hide_stats")) { settingMenu.toggle("Public Stats", false); } else { settingMenu.toggle("Public Stats", true); }
	if (source.hasTag("avatar")) {
		if (source.hasTag("avatar_particles")) { settingMenu.toggle("Avatar State Particles", false); } else { settingMenu.toggle("Avatar State Particles", true); }
	}

	// Show the menu
	settingMenu.show(source).then((ModalFormResponse) => {
		const { formValues } = ModalFormResponse;
		let [moveMessages, enableBending, publicStats, avatarState] = formValues;
		
		if (moveMessages) {
			source.removeTag('chatmsgoff');
		} else {
			source.addTag('chatmsgoff');
		}
		if (enableBending) {
			source.removeTag('bending_off');
		} else {
			source.addTag('bending_off');
		}
		if (publicStats) {
			source.removeTag('hide_stats');
		} else {
			source.addTag('hide_stats');
		}
		if (source.hasTag("avatar")) {
			if (avatarState) {
				source.removeTag('avatar_particles');
			} else {
				source.addTag('avatar_particles');
			}
		}
	})
}