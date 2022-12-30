import { world } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
import { illegalitems, getScore, checkItemAmount } from "./../util.js";

export function shopMenu(source) {
	let movesetBuy = new ActionFormData();
    movesetBuy.title("Shop Menu: Buy");
    movesetBuy.body("Pick an option to purchase!");
	let count = 0
	let referenceList = [];
	for (let p of world.getPlayers()) {
		let tags = p.getTags();
		for (let i = 0; i < tags.length; i++) {
			if (tags[i].startsWith("Shop:")) {
				let args = tags[i].split(' ');
				count++;
				referenceList.push(`${args[1]} ${args[2]} ${args[3]} ${args[4]} ${args[5]}`);
				let name = args[1].replace("minecraft:", "");
				movesetBuy.button(`${name.replace(/^./, name[0].toUpperCase())} x${args[2]} \nPrice: ${args[4]}`, `textures/ui/load`);
			}
		}
	}

    let shopMain = new ActionFormData();
    shopMain.title("Shop Menu: Main");
    shopMain.body(`Your Balance: §b${getScore("money", source)}\n\nPay:§r Send another player money.\n\n§bDeposit:§r All copper pieces in your inventory will be added to your bank balance.\n\n§bWithdraw:§r Take out copper pieces from your bank, don't have a full inventory!\n\n§bSell:§r Put the item you want to sell in your first hotbar slot, and then click sell.\n\n§bBuy:§r Used to purchase an item.`);
	shopMain.button("Pay", "textures/ui/pay");
	shopMain.button("Deposit", "textures/ui/deposit")
	shopMain.button("Withdraw", "textures/ui/extract")
    shopMain.button("Sell", "textures/ui/sell");
	if (count > 0) {
		shopMain.button("Buy", "textures/ui/load");
	}
	
	let shopSell = new ModalFormData();
    shopSell.title("Shop Menu: Sell");
    shopSell.slider("Price", 0, 500, 5);
	
	let players = [];
    for (let player of world.getPlayers()) {
        players.push(player.nameTag);
    }

	let shopWithdraw = new ModalFormData();
    shopWithdraw.title("Shop Menu: Withdraw");
    shopWithdraw.slider("Amount", 0, getScore("money", source), 1);

    let payMenu = new ModalFormData();
    payMenu.title("Shop Menu: Pay");
    payMenu.dropdown("Player Name:", players, 0);
	payMenu.slider("Amount", 0, getScore("money", source), 50);

    shopMain.show(source).then((ActionFormResponse) => {
		const { selection } = ActionFormResponse;
		if (selection === 0) {
			if (getScore("money", source) < 1) return source.runCommandAsync( `tellraw @s {"rawtext":[{"text":"§cYou don't have anything to pay with!"}]}`);
			payMenu.show(source).then((ModalFormResponse) => {
				const { formValues } = ModalFormResponse;
				let [target, amount] = formValues;

				// This is required, so that we know if the player quits midway through being payed.
				let member;
				for (let pl of world.getPlayers()) {
					if (pl.nameTag.toString() === players[target].toString()) {
						member = pl;
						break;
					}
				}

				// Now we see why the search before was required
				if (!member) return source.runCommandAsync( `tellraw @s {"rawtext":[{"text":"§cThat player no longer exists!"}]}`);
				if (member == source) return source.runCommandAsync( `tellraw @s {"rawtext":[{"text":"§cYou can't pay yourself!"}]}`);

				source.runCommandAsync( `tellraw @s {"rawtext":[{"text":"§bYou sent §r${amount}§b to §r${member.nameTag}§b."}]}`);
				source.runCommandAsync( `scoreboard players remove @s money ${amount}`);
				source.runCommandAsync( `scoreboard players add ${member.nameTag} money ${amount}`);
			})
        } else if (selection === 1) {
			try {
				var amount = checkItemAmount(source, "a:copper_piece", true);
				source.runCommandAsync( `tellraw @s {"rawtext":[{"text":"§bDeposited §r${amount}§b copper pieces into your account."}]}`);
				source.runCommandAsync( `scoreboard players add @s money ${amount}`);
			} catch (error) {
				return source.runCommandAsync( `tellraw @s {"rawtext":[{"text":"§cYou don't have anything to deposit!"}]}`);
			}
		} else if (selection === 2) {
			if (getScore("money", source) < 1) return source.runCommandAsync( `tellraw @s {"rawtext":[{"text":"§cYou don't have anything to withdraw!"}]}`);
			shopWithdraw.show(source).then((ModalFormResponse) => {
				const { formValues } = ModalFormResponse;
				let [amount] = formValues;
				source.runCommandAsync( `scoreboard players remove @s money ${amount}`);
				source.runCommandAsync( `give @s a:copper_piece ${amount}`);
				source.runCommandAsync( `tellraw @s {"rawtext":[{"text":"§bYou have withdrawn §r${amount}§b copper pieces."}]}`);
			})
		} else if (selection === 3) {
            shopSell.show(source).then((ModalFormResponse) => {
				const { formValues } = ModalFormResponse;
				let [price] = formValues;

				const item = source.getComponent('inventory').container.getItem(0);
				let countCap = 0;
				let tags = source.getTags();
				for (let i = 0; i < tags.length; i++) {
					if (tags[i].startsWith("Shop:")) {
						countCap++;
					}
				}

				if (!item) return source.runCommandAsync( `tellraw @s {"rawtext":[{"text":"§cYour first slot is empty, please put an item to sell there."}]}`); 
				if (illegalitems.includes(item.typeId)) return source.runCommandAsync( `tellraw @s {"rawtext":[{"text":"§cYou can't sell that item (${item.typeId.replace("minecraft:", "")}). Put the item you want to sell in your first slot."}]}`); 
				if (countCap > 2) return source.runCommandAsync( `tellraw @s {"rawtext":[{"text":"§cYou can't list more than 3 items at one time."}]}`);

				source.runCommandAsync( `tellraw @s {"rawtext":[{"text":"§bSuccessfully listed §r${item.typeId.replace("minecraft:", "").replace(/^./, (item.typeId.replace("minecraft:", ""))[0].toUpperCase())} x${item.amount}§b for §r${price}§b!"}]}`);
				source.runCommandAsync( `replaceitem entity @s slot.hotbar 0 air 1`)
				source.runCommandAsync( `tag @s add "Shop: ${item.typeId} ${item.amount} ${item.data} ${price} ${source.nameTag}"`)
			})
		} else if (selection === 4) {
			movesetBuy.show(source).then((ActionFormResponse) => {
				const { selection } = ActionFormResponse;

				let args = referenceList[selection].split(" ");
				let price = parseInt(args[3])
				
				if (price > getScore("money", source)) return source.runCommandAsync( `tellraw @s {"rawtext":[{"text":"§cYou don't have enough money."}]}`);
				
				//source.runCommandAsync( `say block: ${args[0]} count: ${args[1]} data: ${args[2]} price: ${price} player: ${args[4]}`);
				source.runCommandAsync( `give @s ${args[0]} ${args[1]} ${args[2]}`);
				source.runCommandAsync( `scoreboard players remove @s money ${price}`)
				source.runCommandAsync( `scoreboard players add ${args[4]} money ${price}`)
				source.runCommandAsync( `tag ${args[4]} remove "Shop: ${args[0]} ${args[1]} ${args[2]} ${args[3]} ${args[4]}"`);
				source.runCommandAsync( `tellraw @s {"rawtext":[{"text":"§bYou have purchased §r${args[0].replace("minecraft:", "").replace("a:", "")}§b for §r${price}§b copper pieces."}]}`);
			})
		}
    })
}