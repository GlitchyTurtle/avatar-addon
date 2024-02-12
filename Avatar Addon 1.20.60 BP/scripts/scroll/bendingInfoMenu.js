import { ActionFormData } from "@minecraft/server-ui";
import { getScore, getBendingStyle, showWarning } from "./../util.js";
import { playerHasSkill } from './skillTreeMenu.js';
import commands from './../moves/import.js';

const commandslist = Object.values(commands)

export function bendingInfoMenu(source) {
	let infoMenu = new ActionFormData();
	infoMenu.title("Bending Info: Main");	
	infoMenu.body("Learn what your moves, slots, or passives can do!");
    infoMenu.button("Moves", "textures/ui/avatar/avatar_logo");
    infoMenu.button("Slot System", "textures/ui/avatar/inventory");

	infoMenu.show(source).then((ActionFormResponse) => {
		const { selection } = ActionFormResponse;
		if (selection === 0) {
			listMoves(source);
		} else if (selection === 1) {
			listTutorial(source);
		}
	})
}

function listMoves(source) {
	const BENDING_STYLE_LOWER = getBendingStyle(source).toLowerCase();
	const PLAYER_LEVEL = getScore("level", source);
    let moveDescList = [];
    let moveSelectMenu = new ActionFormData();
    moveSelectMenu.title("Move Info Menu");
    moveSelectMenu.body(`Select a move to find out more about it.`);

	for (let i = 0; i < commandslist.length; i++) {
		let currentMove = commandslist[i];
		if (
			// Error check
			(currentMove.name.length > 0) &&

			// Check for current type
			(currentMove.style === BENDING_STYLE_LOWER || source.hasTag("avatar")) &&

			// Basic unlocks
			((source.hasTag("avatar") && currentMove.unlockable_for_avatar <= PLAYER_LEVEL) || 
			(!source.hasTag("avatar") && currentMove.unlockable <= PLAYER_LEVEL)) &&

			// Skill Tree now!
			(currentMove.skill_required === undefined || playerHasSkill(source, currentMove.skill_required)) 
		) {
            // If statement body
            moveSelectMenu.button(commandslist[i].name);
            moveDescList.push(`----------------\n§b${commandslist[i].name}§r\n§r${commandslist[i].description}\n----------------`);
		}
	}

    moveSelectMenu.show(source).then((ActionFormResponse) => {
        const { selection } = ActionFormResponse;
        if (selection == undefined) return source.sendMessage("§cYou didn't select anything.");
        source.sendMessage(moveDescList[selection]);
    });
}

const message =
`§bHow to use slot binding system:§7
You have 9 slots to choose from. These slots are like special places where you can store a move. Each move slot corresponds to its relative position in your hotbar. 

When you select a slot, you'll see something on the left of your hotbar - a move associated with that slot. For instance, if Slot 1 is 'Air Blast', you can see it by selecting your first hotbar slot.

But how do you actually use that move? Well, it's super simple! You can activate the slot in one of 3 different ways: punching, right-clicking, or sneaking twice really fast (we call it double sneaking). So, if you want to use the move from Slot 1, make sure you have selected Slot 1, and then you can either punch, right-click, or double sneak, and voila! The move will be unleashed! 

The best part is, you have the power to customize each slot. You can choose how you want to activate it. For example, Slot 1 might require double sneaking, while Slot 2 could be activated by right-clicking. It's all up to you! You can pick moves and slots in a special menu on your scroll.

Remember, when you hover your cursor over a slot, it will show you the move or ability associated with it. And once you perform the correct action (punch, right-click, or double sneak, whatever you chose in your slot selection menu), that move will be used.

Let's walk through an example. When you first start, you will only have one move. For the sake of this example, say that you chose to learn airbending first. Your first move should be called, 'Air Blast'. If you want to use it, you have to assign it to a slot. First, open up your scroll.

See the option called slot choice? Click on that next!

Now, you should see a menu with all of your slots. Let's bind 'Air Blast' to Slot 1. To do this, select the drop-down titled 'Slot 1 Choice', and scroll until you see the move you want.

Select 'Air Blast'. Nice! Now you have to select how slot one is activated. Below, you should see a drop-down called 'Slot 1 Activation'. 

Same as before, select the item you want. In this case, I will select 'Sneak & Punch'. Perfect!

You're not done just yet. Now, scroll to the very bottom of the menu, and click the submit button. If everything goes well, you should see a chat message that shows your selection. Now, to actually use the move, select your first hotbar slot. Then sneak and punch at the same time.

Great! You just used your first move. If you want to unlock more of them, just keep using your first move! Eventually, more will unlock, and you can select and use them in the same way!`;

function listTutorial(source) {
    showWarning(source, "Slot Choice:", message)
}