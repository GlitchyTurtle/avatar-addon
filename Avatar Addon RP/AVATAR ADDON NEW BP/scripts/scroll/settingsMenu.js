import { ModalFormData } from "@minecraft/server-ui";

export function settingsMenu(source) {
	const settingMenu = new ModalFormData().title("Settings");

	const toggleSettings = [
		{ key: 'chatmsgoff', label: 'Show Move Messages' },
		{ key: 'bending_off', label: 'Enable Bending' },
		{ key: 'hide_stats', label: 'Public Stats' },
		{ key: 'diaOff', label: 'Status Messages' },
		{ key: 'permHiddenWater', label: 'Water Particles', condition: source.hasTag('water') || source.hasTag('avatar') },
		{ key: 'avatar_particles', label: 'Avatar State Particles', condition: source.hasTag('avatar') },
	];

	toggleSettings.forEach(({ key, label, condition = true }) => {
		if (!condition) return;
		settingMenu.toggle(label, !source.hasTag(key));
	});

	settingMenu.show(source).then((modalFormResponse) => {
		const { formValues } = modalFormResponse;
		if (!formValues) return source.sendMessage("§cYou didn't select anything.");

		toggleSettings.forEach(({ key, label, condition = true }, index) => {
			if (!condition) return;
			const value = formValues[index];
			if (value) {
				source.removeTag(key);
			} else {
				source.addTag(key);
			}
		});
	});
}
