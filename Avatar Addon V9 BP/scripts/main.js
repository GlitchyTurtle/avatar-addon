import { world } from "mojang-minecraft";
import { scrollMenu, betaTesters } from "./usage/itemUse.js";
import { hitEvent } from "./usage/hitEvent.js";
import { beforeChat } from "./usage/beforeChat.js";
import { blockBreak } from "./usage/blockBreak.js";

const World = world;

World.events.beforeItemUse.subscribe(eventData => scrollMenu(eventData));
World.events.entityHit.subscribe(eventData => hitEvent(eventData));
World.events.beforeChat.subscribe(msg => beforeChat(msg));
World.events.blockBreak.subscribe(eventData => blockBreak(eventData));