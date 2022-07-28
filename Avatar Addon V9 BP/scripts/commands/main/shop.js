import { world, Player, ItemStack, MinecraftItemTypes } from "mojang-minecraft";
import { illegalitems, getScore } from "./../../util.js";

const World = world;

export function shop(message, args) {
    message.cancel = true;
	let player = message.sender;
	
    player.runCommand(`playsound random.levelup "${player.nameTag}"`);
	
	if (!args.length || !args.includes("sell") && !args.includes("buy") && !args.includes("list") && !args.includes("balance") && !args.includes("pay") && !args.includes("help")) {
        return player.runCommand(`tellraw @s {"rawtext":[{"text":"§cThe argument (${args}) is not valid. Please use: sell, buy, list, or help"}]}`);
    }

	if (args[0] === "sell") {
		if (Number.isFinite(parseInt(args[1])) && parseInt(args[1]) > 9 && parseInt(args[1]) < 10001) {
			const item = player.getComponent('inventory').container.getItem(player.selectedSlot);
			const price = args[1];
			if (!item) { return player.runCommand(`tellraw @s {"rawtext":[{"text":"§cYour mainhand is empty."}]}`); }
			if (!illegalitems.includes(item.id)) {
				let countCap = 0;
				let tags = player.getTags();
				for (let i = 0; i < tags.length; i++) {
					if (tags[i].startsWith("Shop:")) {
						countCap ++;
					}
				}
				if (countCap > 2) { return player.runCommand(`tellraw @s {"rawtext":[{"text":"§cYou can't list more than 3 items at one time."}]}`); }
				player.runCommand(`tellraw @s {"rawtext":[{"text":"Successfully listed §b${item.id.replace("minecraft:", "")} x${item.amount}§r for selling at the price: §b${price}"}]}`);
				player.getComponent('inventory').container.setItem(player.selectedSlot, new ItemStack(MinecraftItemTypes.air, 0));
				player.addTag(`Shop: ${item.id} ${item.amount} ${price} ${player.name}`);
			} else { return player.runCommand(`tellraw @s {"rawtext":[{"text":"§cYou can't sell that item."}]}`); }
		} else { return player.runCommand(`tellraw @s {"rawtext":[{"text":"§cThat isn't a price you can use. Use a number within 10 to 10,000."}]}`); }
	} else if (args[0] === "buy") {
		if (!args[1]) {
			return player.runCommand(`tellraw @s {"rawtext":[{"text":"§cYou need to specify what item you want with a selection value."}]}`);
		}
		if (Number.isFinite(parseInt(args[1]))) {
			let shopItems = [];
			let count = 0;
			for (let p of World.getPlayers()) {
				let tags = p.getTags();
				for (let i = 0; i < tags.length; i++) {
					if (tags[i].startsWith("Shop:")) {
						let args = tags[i].split(' ');
						shopItems.push(`${args[1]} ${args[2]} ${args[3]} ${args[4]}`);
					}
				}
			}
			if (shopItems[(parseInt(args[1]) - 1)]) {
				let buyTag = shopItems[(parseInt(args[1]) - 1)].split(' ');
				if (player.name === buyTag[3]) { return player.runCommand(`tellraw @s {"rawtext":[{"text":"§cYou can't buy from yourself."}]}`); }
				if (getScore("money", player) < buyTag[2]) { return player.runCommand(`tellraw @s {"rawtext":[{"text":"§cYou don't have enough money."}]}`); }
				player.runCommand(`give @s ${buyTag[0]} ${buyTag[1]}`);
				player.runCommand(`scoreboard players remove @s money ${buyTag[2]}`)
				player.runCommand(`scoreboard players add ${buyTag[3]} money ${buyTag[2]}`)
				player.runCommand(`tag ${buyTag[3]} remove "Shop: ${buyTag[0]} ${buyTag[1]} ${buyTag[2]} ${buyTag[3]}"`);
			} else { return player.runCommand(`tellraw @s {"rawtext":[{"text":"§cThere is no item in the shop with that selection value."}]}`); }
		}
	} else if (args[0] === "list") {
		let count = 0;
		player.runCommand('tellraw @s {"rawtext":[{"text":"-----------------------------------------§r"}]}');
		player.runCommand('tellraw @s {"rawtext":[{"text":"§bMarket:§r"}]}');
		for (let p of World.getPlayers()) {
			let tags = p.getTags();
			for (let i = 0; i < tags.length; i++) {
				if (tags[i].startsWith("Shop:")) {
					let args = tags[i].split(' ');
					count ++;
					player.runCommand(`tellraw @s {"rawtext":[{"text":"Item: §b${args[1].replace("minecraft:", "")} x${args[2]}§r Price: §b${args[3]}§r Listed by: §b${args[4]}§r Selection Value: §b${count}"}]}`);
				}
			}
		}
		player.runCommand('tellraw @s {"rawtext":[{"text":"-----------------------------------------§r"}]}');
	} else if (args[0] === "balance") {
		player.runCommand(`tellraw @s {"rawtext":[{"text":"Your Balance: §b${getScore("money", player)}§r"}]}`);
	} else if (args[0] === "pay") {
		let member;
		for (let pl of World.getPlayers()) {
			if (pl.nameTag.toLowerCase() === args[1].toLowerCase().replace(/"|\\|@/g, "")) {
				member = pl;
			}
		}
		if (!member) { return player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§cCouldn't find that player."}]}`); }
		if (member.name === player.name) { return player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§cYou can't pay yourself."}]}`); }
		if (!Number.isFinite(parseInt(args[2]))) { return player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§cThat's not a number."}]}`); }
		if (getScore("money", player) > parseInt(args[2])) {
			player.runCommand(`scoreboard players remove @s money ${parseInt(args[2])}`)
			player.runCommand(`scoreboard players add ${member.name} money ${parseInt(args[2])}`)
		} else { return player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§cYou don't have enough money for that."}]}`); }
	} else if (args[0] === "help") {
		player.runCommand('tellraw @s {"rawtext":[{"text":"-----------------------------------------§r"}]}');
		player.runCommand('tellraw @s {"rawtext":[{"text":"§bShop Subcommands:§r"}]}');
		player.runCommand('tellraw @s {"rawtext":[{"text":"§b!shop sell <price> -§r Sells whatever item you have in your mainhand, for whatever price you specify from 10 to 10,000."}]}');
		player.runCommand('tellraw @s {"rawtext":[{"text":"§b!shop list -§r List all the items in the shop currently, each with their selection value so you can buy them."}]}');
		player.runCommand('tellraw @s {"rawtext":[{"text":"§b!shop buy <selection value> -§r Buys the item with that selection value, automatically using your money to pay."}]}');
		player.runCommand('tellraw @s {"rawtext":[{"text":"§b!shop pay <player> <amount> -§r Pay another player money."}]}');
		player.runCommand('tellraw @s {"rawtext":[{"text":"§b!shop balance -§r Show your current balance of money!"}]}');
		player.runCommand('tellraw @s {"rawtext":[{"text":"§b!shop help -§r Show this help menu!"}]}');
		player.runCommand('tellraw @s {"rawtext":[{"text":"-----------------------------------------§r"}]}');
	}
}