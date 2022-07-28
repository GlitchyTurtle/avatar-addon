export function scroll(message) {
    message.cancel = true;
    message.sender.runCommand(`playsound random.levelup "${message.sender.nameTag}"`);
    message.sender.runCommand(`execute "${message.sender.nameTag}" ~~~ function scroll`);
    if (message.sender.hasTag("tutorial2")) {
      message.sender.removeTag("tutorial2");
      message.sender.runCommand(`tellraw @s {"rawtext":[{"text":"----\nYou got your scroll! Right click it to bring up a menu. The buttons are:\n§bChoose§r - will let you pick your bending style, human is not an option, and avatar can be disabled with /function settings.\n§bChoose Slots§r - pick what happens when you do a slot action (for instance, if slot 4 is set to air blast, when you sneak and punch, air blast will be used).\n§bInfo§r - want to know what slots are which or what moves do? This will give you info about each bending type.\n§bSettings§r - show move messages, toggle bending, or hide your stats with this menu\n§bStats§r - check out what level another player is, or see their build (what moves for each slot).\n----"}]}`);
    }
}