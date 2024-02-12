import { system, world, ItemStack } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
import { illegalitems, getScore, setScore, toRomanNumeral, formatBlockName, findPlayerHome, checkItemAmount } from "./../util.js";
import { ChestFormData } from "./../extensions/forms.js"

export function shopMenu(source) {
	const mainMenu = new ActionFormData()
		.title("Buy or Sell")
		.body(`Pick to either sell one of your items or buy someone elses item.\n\nBalance: $${getScore("money", source)}\n `)
		.button("Pay", "textures/ui/avatar/pay")
		.button("Deposit", "textures/ui/avatar/deposit")
		.button("Withdraw", "textures/ui/avatar/extract")
        .button("Sell", "textures/ui/avatar/sell")
		.button("Buy", "textures/ui/avatar/load")

	const options = ["pay", "deposit", "withdraw", "sell", "buy"];

	mainMenu.show(source).then(response => {
		const { selection } = response;
		if (selection === undefined) return source.sendMessage("§cYou didn't select anything.");
	
		switch (options[selection]) {
			case "pay":
				system.run(() => pay(source));
				break;
			case "deposit":
				system.run(() => deposit(source));
				break;
			case "withdraw":
				system.run(() => withdraw(source));
				break;
			case "sell":
				system.run(() => sellItems(source));
				break;
			case "buy":
				system.run(() => buyItems(source));
				break;
		}
	});
}

function sellItems(player) {
	const home = findPlayerHome(player);
	if (!home) return player.sendMessage("§cYou don't have a claim, so you can't list an item!");

	const playerShopContainer = home.getComponent('inventory').container;
	const playerContainer = player.getComponent('inventory').container;

	if (playerShopContainer.emptySlotsCount < 96 - 16) return player.sendMessage("§cYou cannot list more than 16 items!");

	const priceMenu = new ModalFormData();
    priceMenu.title("Set Price");
	priceMenu.slider("Set Price", 10, 1000, 5, 40);

	const itemIndexes = [];
	const sellMenu = new ChestFormData('small').title("Sell Items")
	for (let i = 0; i < playerContainer.size; i++) {
		const item = playerContainer.getItem(i);
		itemIndexes.push(item);
		if (!item) continue;

		if (illegalitems.includes(item.typeId)) continue;

		const loreModifier = [];
		var enchanted = false;
		try {
			const enchantments = item.getComponent("enchantable").getEnchantments();
			if (enchantments.length > 0) {
				const enchantmentNames = enchantments.map((ench) => `§7${ench.type.id.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} ${toRomanNumeral(ench.level)}`);
				if (enchantmentNames.length) enchantmentNames.forEach(enchantName => loreModifier.push(enchantName))
				enchanted = true;
			}
		} catch (error) {}
		
		sellMenu.button(i, (item.nameTag) ? ("§o" + item.nameTag) : formatBlockName(item.typeId), loreModifier, item.typeId, item.amount, enchanted);
	}

	sellMenu.show(player).then(response => {
		if (response.canceled) return player.sendMessage("§cYou didn't select anything.");

		const itemIndex = response.selection;

		priceMenu.show(player).then((ModalFormResponse) => {
			const { formValues } = ModalFormResponse;
			if (!formValues) return player.sendMessage("§cYou didn't select anything.");
			const [price] = formValues;
	
			// Weird operation to remove ghost items :/
			const updatedItem = playerContainer.getItem(itemIndex)
			updatedItem.setLore([price.toString(), player.nameTag]);
			playerContainer.setItem(itemIndex, updatedItem)
			playerContainer.transferItem(itemIndex, playerShopContainer);
			playerContainer.setItem(itemIndex, new ItemStack("minecraft:dirt"));
			playerContainer.setItem(itemIndex, null);

			player.sendMessage(`§7Successfully listed your item, §o${formatBlockName(updatedItem.typeId)}§r§7 for $${price.toString()}!`);
		});
	});
}

function buyItems(player, pageNumber = 1, sortMethod = "Default") {
	// Finding the items and add them to the "allItems" array
	const allItems = [];
	const entities = [...player.dimension.getEntities({ families: ["land_claim"] })];
	for (const i in entities) {
        const thisEntity = entities[i];
		const entityContainer = thisEntity.getComponent('inventory').container;
		for (let i = 0; i < entityContainer.size; i++) {
			const item = entityContainer.getItem(i);
			if (!item) continue;

			const loreModifier = [];
			var enchanted = false;
			try {
				const enchantments = item.getComponent("enchantable").getEnchantments();
				if (enchantments.length > 0) {
					const enchantmentNames = enchantments.map((ench) => `§7${ench.type.id.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} ${toRomanNumeral(ench.level)}`);
					if (enchantmentNames.length) enchantmentNames.forEach(enchantName => loreModifier.push(enchantName))
					enchanted = true;
				}
			} catch (error) {}

			allItems.push({
				name: (item.nameTag) ? ("§o" + item.nameTag) : formatBlockName(item.typeId),
				typeId: item.typeId,
				amount: item.amount,
				enchanted: enchanted,
				enchantmentList: loreModifier,
				price: parseInt(item.getLore()[0]),
				sellerName: item.getLore()[1],
				hostContainer: entityContainer,
				itemIndex: i,
                claimEntity: thisEntity
			});
			
		}
	}

	const sortMethods = ["Default", "Ascending", "Descending"]
	switch (sortMethod) {
		case "Ascending":
			allItems.sort((a, b) => a.price - b.price);
			break;
		case "Descending":
			allItems.sort((a, b) => b.price - a.price);
			break;
	}

	// Create the ui and instantiate the buttons
	const numberOfPages = Math.max(Math.ceil(allItems.length/45), 1);
	const shop = new ChestFormData('large').title(`Shop ${pageNumber}/${numberOfPages}`)
	let indexRolling = 0;
	for (let i = (pageNumber - 1) * 45; i < Math.min(pageNumber * 45, allItems.length); i++) {
		const currentItem = allItems[i];
		const loreModifier = [`§r§6$${currentItem.price}`, `§r§8Listed by ${currentItem.sellerName}`];
		if (currentItem.enchanted) currentItem.enchantmentList.forEach(enchantName => loreModifier.push(enchantName))

		shop.button(indexRolling, currentItem.name, loreModifier, currentItem.typeId, currentItem.amount, currentItem.enchanted)
		indexRolling++;
	}

	//ss
	shop.button(47, "Back", [`§r§cGo back one page`], "minecraft:red_dye", 1, true)
	shop.button(49, "Sort", [`§r§sSorted: ${sortMethod}`], "minecraft:command_block_minecart", 1, true)
	shop.button(51, "Forward", [`§r§aGo forward one page`], "minecraft:green_dye", 1, true)

	// Show the ui and allow for purchases
	shop.show(player).then(response => {
		if (response.canceled) return;

		if (response.selection > 44) {
			switch (response.selection) {
				case 47:
					return buyItems(player, pageNumber == 1 ? pageNumber : pageNumber - 1, sortMethod);
				case 49:
					let index = (sortMethods.indexOf(sortMethod) + 1) % sortMethods.length;
					return buyItems(player, pageNumber, sortMethods[index]);
				case 51:
					return buyItems(player, pageNumber == numberOfPages ? pageNumber : pageNumber + 1, sortMethod);
			}
		}		

		const selector = response.selection + ((pageNumber - 1) * 45);
        const item = allItems[selector];

		const itemIndex = item.itemIndex;
        const itemPrice = item.price;

        if (getScore("money", player) < itemPrice) return player.sendMessage("§cYou don't have enough money for that!");

		const hostContainer = item.hostContainer;
		const playerContainer = player.getComponent('inventory').container;

		if (playerContainer.emptySlotsCount == 0) return player.sendMessage("§cYour inventory is full!");

		const updatedItem = hostContainer.getItem(itemIndex);
		if (!updatedItem || updatedItem.amount != item.amount) return player.sendMessage("§cThis item has already been purchased!");

        if (!item.claimEntity.isValid()) return player.sendMessage("§cThe seller of this item removed it from the shop!");

        const seller = world.getPlayers({ name: item.sellerName });
        if (seller.length == 0) {
            item.claimEntity.addTag(`Pay:${itemPrice},${player.name}`);
        } else {
            setScore(seller[0], "money", itemPrice, true);
            player.sendMessage(`§7${player.name} just bought one of your items on the shop, you have gained: $${itemPrice}`);
        }

		updatedItem.setLore([]);
		hostContainer.setItem(itemIndex, updatedItem);

		const purchasedItem = hostContainer.getItem(itemIndex);
		for (let i = 0; i < playerContainer.size; i++) {
			if (playerContainer.getItem(i)) continue;
			playerContainer.setItem(i, purchasedItem);
			break;
		}
        setScore(player, "money", -1 * itemPrice, true);

		// Weird operation to remove ghost items :/
		hostContainer.setItem(itemIndex, new ItemStack("minecraft:dirt"));
		hostContainer.setItem(itemIndex, null);

		player.sendMessage("§7Successfully purchased that item!");
	})
};

function pay(player) {
	if (getScore("money", player) < 10) return player.sendMessage("§cYou don't have enough money for that!");

	const playerNames = world.getPlayers().map(player => player.nameTag);
	const players = world.getPlayers();


    const payMenu = new ModalFormData()
		.title("Pay")
		.dropdown("Player Name:", playerNames, 0)
		.slider("Amount", 0, getScore("money", player), 10);

	payMenu.show(player).then((ModalFormResponse) => {
		const { formValues } = ModalFormResponse;
		if (!formValues) return player.sendMessage("§cYou exited the menu, so your selection was not saved!");

		const [targetIndex, amount] = formValues;
		const target = players[targetIndex];

		if (getScore("money", player) < amount) return player.sendMessage("§cYou don't have enough money for that!");
		if (!target) return player.sendMessage("§cThat player no longer exists!");
		if (target.name == player.name) return player.sendMessage("§cYou cannot pay yourself!");

		setScore(target, "money", amount, true);
		setScore(player, "money", -amount, true);

		target.sendMessage(`§7${player.name} has payed you $${amount}!`);
		player.sendMessage(`§7You have payed $${amount} to ${target.name}!`);
	});
}

function deposit(player) {
	const moneyInInventory = checkItemAmount(player, "a:copper_piece", false);
	if (moneyInInventory == 0) return player.sendMessage("§cYou don't have enough money for that!");


	const shopDeposit = new ModalFormData()
    	.title("Deposit")
    	.slider("Amount", 0, moneyInInventory, 1);

	
	shopDeposit.show(player).then((ModalFormResponse) => {
		const { formValues } = ModalFormResponse;
		if (!formValues) return player.sendMessage("§cYou exited the menu, so your selection was not saved!");

		const [amount] = formValues;

		const moneyInInventoryNow = checkItemAmount(player, "a:copper_piece", false);
		
		if (moneyInInventoryNow < amount) return player.sendMessage("§cYou can't deposit that amount, your inventory changed recently.");
		
		setScore(player, "money", amount, true);
		player.runCommand(`clear @s a:copper_piece -1 ${amount}`);
		
	});

}

function withdraw(player) {
	if (getScore("money", player) == 0) return player.sendMessage("§cYou don't have enough money for that!");

    const shopWithdraw = new ModalFormData()
		.title("Widthdraw")
		.slider("Amount", 0, getScore("money", player), 1);

	shopWithdraw.show(player).then((ModalFormResponse) => {
		const { formValues } = ModalFormResponse;
		if (!formValues) return player.sendMessage("§cYou exited the menu, so your selection was not saved!");

		const [amount] = formValues;

		const playerContainer = player.getComponent('inventory').container;
		if (playerContainer.emptySlotsCount < Math.ceil(amount/64)) return player.sendMessage("§cYou don't have enough inventory space for this!");

		setScore(player, "money", -amount, true);
		
		let given = amount;
		while (given <= amount) {
			if (given >= 64) {
				const itemStack = new ItemStack('a:copper_piece', 64);
				playerContainer.addItem(itemStack);
				given -= 64;
			} else {
				const itemStack = new ItemStack('a:copper_piece', given);
				playerContainer.addItem(itemStack);
				break;
			}
		}
	});
}