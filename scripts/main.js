import { world, Player } from "mojang-minecraft";
import { commandHandler } from "./commands/handler.js";
import { scrollMenu } from "./usage/menu.js";
import { ActionFormData, MessageFormData, ModalFormData } from "mojang-minecraft-ui"

const World = world;

const PrefixCommand = () => {
    World.events.beforeChat.subscribe(msg => prefixcommand(msg));
};

World.events.beforeItemUse.subscribe(eventData => scrollMenu(eventData));

function prefixcommand(msg) {
    const player = msg.sender;
    commandHandler(player, msg);
}

PrefixCommand();
