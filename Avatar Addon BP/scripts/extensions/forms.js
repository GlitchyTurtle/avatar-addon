import { ActionFormData } from '@minecraft/server-ui';
import { typeIdToID } from "./typeIds.js";

const sizes = new Map([
	['single', [`§c§h§e§s§t§s§m§a§l§l§r`, 27]], ['double', [`§c§h§e§s§t§l§a§r§g§e§r`, 54]],
	['small', [`§c§h§e§s§t§s§m§a§l§l§r`, 27]], ['large', [`§c§h§e§s§t§l§a§r§g§e§r`, 54]]
]);

class ChestFormData {
	#titleText; #buttonArray;
	constructor(size = 'small') {
		const sizing = sizes.get(size) ?? [`§c§h§e§s§t§s§m§a§l§l§r`, 27];
		/** @internal */
		this.#titleText = sizing[0];
		/** @internal */
		this.#buttonArray = [];
		for (let i = 0; i < sizing[1]; i++)
			this.#buttonArray.push(['', undefined]);
	}
	title(text) {
		this.#titleText += text;
		return this;
	}
	button(slot, itemName, itemDesc, iconPath, stackSize = 1, enchanted = false) {
        this.#buttonArray.splice(slot, 1, [`stack#${Math.min(Math.max(stackSize, 1) || 1, 99).toString().padStart(2, '0')}§r${itemName ?? ''}§r${itemDesc?.length ? `\n§r${itemDesc.join('\n§r')}` : ''}`, ((typeIdToID.get(iconPath) * 65536) + (!!enchanted * 32768)) || iconPath]);
		return this;
    }
	show(player) {
		const form = new ActionFormData()
			.title(this.#titleText);
		this.#buttonArray.forEach(button => {
			form.button(button[0], `${button[1]}`);
		})
		return form.show(player)
	}
}


class ChessFormData {
	#titleText; #buttonArray; #bodyText;
	constructor() {
		/** @internal */
		this.#titleText = `§b§b§b`;
		/** @internal */
		this.#buttonArray = [];
		for (let i = 0; i < 64; i++)
			this.#buttonArray.push(['', undefined]);
	}
	title(text) {
		this.#titleText += text;
		return this;
	}
	body(text) {
		this.#bodyText = text;
		return this;
	}
	button(iconPath = undefined, slot) {
		this.#buttonArray.splice(slot, 1, [`btn`, iconPath]);
		return this;
	}
	show(player) {
		const form = new ActionFormData()
			.title(this.#titleText)
			.body(this.#bodyText);
		this.#buttonArray.forEach(button => {
			form.button(button[0], button[1]);
		})
		return form.show(player)
	}
}

class SkillTreeData {
	#titleText; #buttonArray; #bodyText;
	constructor() {
		/** @internal */
		this.#titleText = `§f§f§f`;
		/** @internal */
		this.#buttonArray = [];
		for (let i = 0; i < 63; i++)
			this.#buttonArray.push(['', undefined]);
	}
	title(text) {
		this.#titleText += text;
		return this;
	}
	body(text) {
		this.#bodyText = text;
		return this;
	}
	button(slot, itemName, itemDesc, iconPath, stackSize = 1, enchanted = false) {
        this.#buttonArray.splice(slot, 1, [`stack#${stackSize.toString().padStart(2, '0')}§r${itemName ?? ''}§r${itemDesc?.length ? `\n§r${itemDesc.join('\n§r')}` : ''}`, ((typeIdToID.get(iconPath) * 65536) + (!!enchanted * 32768)) || iconPath]);
		return this;
    }
	show(player) {
		const form = new ActionFormData()
			.title(this.#titleText)
		
		if (this.#bodyText) form.body(this.#bodyText);
		
		this.#buttonArray.forEach(button => {
			form.button(button[0], `${button[1]}`);
		})
		return form.show(player)
	}
}

export { SkillTreeData };
export { ChessFormData };
export { ChestFormData };