export function scroll(message) {
    message.cancel = true;
    try { 
		message.sender.runCommand(`tellraw @s[hasitem={item=a:bending_scroll,quantity=1..}] {"rawtext":[{"text":"§cYou don't need more than one scroll."}]}`); 
		return; 
	} catch (error) {}
    message.sender.runCommand(`playsound random.levelup @s`);
    message.sender.runCommand(`give @s a:bending_scroll 1 0 {"minecraft:keep_on_death":{},"minecraft:item_lock":{"mode":"lock_in_inventory"}}`);
}