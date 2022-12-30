import { Player, world } from "@minecraft/server";
import { system } from "@minecraft/server";
import { itemUse } from "./events/itemUse.js";
import { hitEvent } from "./events/hitEvent.js";
import { beforeChat } from "./events/beforeChat.js";
import { blockBreak } from "./events/blockBreak.js";
import { tickEvent } from "./events/tickEvent.js";

const World = world;
system.events.beforeWatchdogTerminate.subscribe(data => { data.cancel = true; });
World.events.beforeItemUse.subscribe(eventData => itemUse(eventData));
World.events.entityHit.subscribe(eventData => hitEvent(eventData));
World.events.beforeChat.subscribe(msg => beforeChat(msg));
World.events.blockBreak.subscribe(eventData => blockBreak(eventData));
World.events.tick.subscribe(eventData => tickEvent(eventData));